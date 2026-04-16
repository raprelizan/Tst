import { randomUUID } from 'crypto';
import { pool } from '../config/db.js';

export async function createReport({
  payload,
  filterResult,
  encryptedContact,
  fileReferences,
  sourceHash
}) {
  const trackingCode = `AS-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 900 + 100)}`;

  const query = `
    INSERT INTO reports (
      report_uuid,
      tracking_code,
      report_type,
      category,
      title,
      description,
      location_label,
      status,
      filter_status,
      filter_reason,
      encrypted_contact,
      attachment_urls,
      source_fingerprint
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
    RETURNING id, tracking_code, status, created_at
  `;

  const values = [
    randomUUID(),
    trackingCode,
    payload.type,
    payload.category,
    payload.title,
    payload.description,
    payload.location || null,
    'received',
    filterResult.status,
    filterResult.reason,
    encryptedContact ? JSON.stringify(encryptedContact) : null,
    JSON.stringify(fileReferences || []),
    sourceHash
  ];

  const { rows } = await pool.query(query, values);
  return rows[0];
}

export async function getReportByTrackingCode(trackingCode) {
  const query = `
    SELECT tracking_code, status, category, created_at, updated_at, filter_status
    FROM reports
    WHERE tracking_code = $1
  `;

  const { rows } = await pool.query(query, [trackingCode]);
  return rows[0];
}

export async function listAdminReports() {
  const query = `
    SELECT id, tracking_code, category, status, filter_status, filter_reason, created_at
    FROM reports
    ORDER BY created_at DESC
    LIMIT 100
  `;

  const { rows } = await pool.query(query);
  return rows;
}

export async function updateReportStatus({ id, status }) {
  const query = `
    UPDATE reports
    SET status = $2, updated_at = NOW()
    WHERE id = $1
    RETURNING id, tracking_code, status, updated_at
  `;

  const { rows } = await pool.query(query, [id, status]);
  return rows[0];
}
