import { useEffect, useState } from 'react';
import { fetchAdminReports, updateAdminReportStatus } from '../services/api';

export function AdminDashboardPage() {
  const [reports, setReports] = useState([]);

  const loadReports = async () => {
    const data = await fetchAdminReports();
    setReports(data.reports || []);
  };

  useEffect(() => {
    loadReports().catch(() => setReports([]));
  }, []);

  const onUpdate = async (id, status) => {
    await updateAdminReportStatus(id, status);
    await loadReports();
  };

  return (
    <section className="card">
      <h2>Admin Dashboard</h2>
      <p>Review reports and forward approved ones to authorities.</p>
      <table>
        <thead>
          <tr>
            <th>Tracking</th>
            <th>Category</th>
            <th>Status</th>
            <th>Filter</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id}>
              <td>{report.tracking_code}</td>
              <td>{report.category}</td>
              <td>{report.status}</td>
              <td>{report.filter_status}</td>
              <td>
                <button onClick={() => onUpdate(report.id, 'under_review')}>Under Review</button>
                <button onClick={() => onUpdate(report.id, 'forwarded')}>Forwarded</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
