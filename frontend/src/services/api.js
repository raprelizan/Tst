const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export async function submitReport(formData) {
  const response = await fetch(`${API_URL}/reports/submit`, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    throw await response.json();
  }

  return response.json();
}

export async function fetchReportStatus(trackingCode) {
  const response = await fetch(`${API_URL}/reports/status/${trackingCode}`);
  if (!response.ok) {
    throw await response.json();
  }

  return response.json();
}

export async function fetchAdminReports() {
  const response = await fetch(`${API_URL}/reports/admin/reports`);
  if (!response.ok) {
    throw await response.json();
  }

  return response.json();
}

export async function updateAdminReportStatus(id, status) {
  const response = await fetch(`${API_URL}/reports/admin/reports/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });

  if (!response.ok) {
    throw await response.json();
  }

  return response.json();
}
