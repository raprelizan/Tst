import { useState } from 'react';
import { fetchReportStatus } from '../services/api';

export function ReportStatusPage() {
  const [trackingCode, setTrackingCode] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const data = await fetchReportStatus(trackingCode);
      setResult(data);
    } catch (err) {
      setResult(null);
      setError(err?.error || 'Could not find tracking code.');
    }
  };

  return (
    <section className="card">
      <h2>Report Status</h2>
      <form onSubmit={onSubmit}>
        <input
          placeholder="AS-XXXXXX-123"
          value={trackingCode}
          onChange={(event) => setTrackingCode(event.target.value)}
          required
        />
        <button type="submit">Check</button>
      </form>
      {error && <p>{error}</p>}
      {result && (
        <ul>
          <li>Status: {result.status}</li>
          <li>Category: {result.category}</li>
          <li>Filter: {result.filter_status}</li>
        </ul>
      )}
    </section>
  );
}
