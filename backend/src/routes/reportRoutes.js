import crypto from 'crypto';
import { Router } from 'express';
import multer from 'multer';
import { reportLimiter } from '../middleware/rateLimiter.js';
import { validateReport } from '../middleware/validation.js';
import { evaluateReportQuality } from '../services/aiFilter.js';
import {
  createReport,
  getReportByTrackingCode,
  listAdminReports,
  updateReportStatus
} from '../services/reportService.js';
import { encryptSensitivePayload } from '../utils/encryption.js';

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

export const reportRouter = Router();

function normalizeSubmission(req, _res, next) {
  try {
    if (typeof req.body.confidentialContact === 'string') {
      req.body.confidentialContact = JSON.parse(req.body.confidentialContact);
    }

    if (typeof req.body.consentAccepted === 'string') {
      req.body.consentAccepted = req.body.consentAccepted === 'true';
    }
  } catch (_error) {
    return next(new Error('Invalid JSON for confidentialContact'));
  }

  return next();
}

reportRouter.post(
  '/submit',
  reportLimiter,
  upload.array('attachments', 3),
  normalizeSubmission,
  validateReport,
  async (req, res) => {
    try {

    const filterResult = evaluateReportQuality(req.body);
    const encryptedContact =
      req.body.type === 'confidential'
        ? encryptSensitivePayload(req.body.confidentialContact)
        : null;

    const fileReferences = (req.files || []).map((file) => ({
      filename: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      note: 'Store in secure cloud bucket in production.'
    }));

    const sourceHash = crypto
      .createHash('sha256')
      .update(req.ip + req.headers['user-agent'])
      .digest('hex');

    const report = await createReport({
      payload: req.body,
      filterResult,
      encryptedContact,
      fileReferences,
      sourceHash
    });

    return res.status(201).json({
      message: 'Report submitted successfully.',
      trackingCode: report.tracking_code,
      status: report.status,
      reviewHint:
        filterResult.status === 'flagged'
          ? 'Your report has been flagged for manual review due to safety filters.'
          : 'Your report is queued for moderation.'
    });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Unexpected server error.' });
    }
  }
);

reportRouter.get('/status/:trackingCode', async (req, res) => {
  try {
    const report = await getReportByTrackingCode(req.params.trackingCode);

    if (!report) {
      return res.status(404).json({ error: 'Tracking code not found.' });
    }

    return res.json(report);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Unexpected server error.' });
  }
});

reportRouter.get('/admin/reports', async (_req, res) => {
  try {
    const reports = await listAdminReports();
    return res.json({ reports });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Unexpected server error.' });
  }
});

reportRouter.patch('/admin/reports/:id/status', async (req, res) => {
  try {
    const allowed = ['received', 'under_review', 'forwarded', 'closed'];

    if (!allowed.includes(req.body.status)) {
      return res.status(400).json({ error: 'Invalid status.' });
    }

    const updated = await updateReportStatus({
      id: Number(req.params.id),
      status: req.body.status
    });

    if (!updated) {
      return res.status(404).json({ error: 'Report not found.' });
    }

    return res.json(updated);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Unexpected server error.' });
  }
});
