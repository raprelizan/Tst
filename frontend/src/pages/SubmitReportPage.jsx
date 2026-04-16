import { useState } from 'react';
import { submitReport } from '../services/api';

const initialState = {
  type: 'anonymous',
  category: 'crime',
  title: '',
  description: '',
  location: '',
  fullName: '',
  phone: '',
  email: ''
};

export function SubmitReportPage({ copy }) {
  const [form, setForm] = useState(initialState);
  const [message, setMessage] = useState('');

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setMessage('Submitting...');

    const payload = new FormData();
    payload.append('type', form.type);
    payload.append('category', form.category);
    payload.append('title', form.title);
    payload.append('description', form.description);
    payload.append('location', form.location);
    payload.append('consentAccepted', 'true');

    if (form.type === 'confidential') {
      payload.append(
        'confidentialContact',
        JSON.stringify({
          fullName: form.fullName,
          phone: form.phone,
          email: form.email
        })
      );
    }

    try {
      const result = await submitReport(payload);
      setMessage(`Tracking code: ${result.trackingCode}`);
      setForm(initialState);
    } catch (error) {
      setMessage(error?.error || 'Submission failed.');
    }
  };

  return (
    <section className="card">
      <h2>{copy.navSubmit}</h2>
      <p className="danger-banner">{copy.submitWarning}</p>
      <form onSubmit={onSubmit} className="form-grid">
        <label>
          Report Type
          <select name="type" value={form.type} onChange={onChange}>
            <option value="anonymous">Anonymous</option>
            <option value="confidential">Confidential</option>
          </select>
        </label>
        <label>
          Category
          <select name="category" value={form.category} onChange={onChange}>
            <option value="crime">Crime</option>
            <option value="suspicious_activity">Suspicious Activity</option>
            <option value="corruption">Corruption</option>
            <option value="safety_hazard">Safety Hazard</option>
          </select>
        </label>
        <label>
          Title
          <input name="title" value={form.title} onChange={onChange} required minLength={5} />
        </label>
        <label>
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={onChange}
            required
            minLength={20}
          />
        </label>
        <label>
          Optional Location
          <input name="location" value={form.location} onChange={onChange} />
        </label>

        {form.type === 'confidential' && (
          <>
            <label>
              Full Name
              <input name="fullName" value={form.fullName} onChange={onChange} required />
            </label>
            <label>
              Phone
              <input name="phone" value={form.phone} onChange={onChange} required />
            </label>
            <label>
              Email (optional)
              <input name="email" value={form.email} onChange={onChange} />
            </label>
          </>
        )}

        <button type="submit">Submit Report</button>
      </form>
      {message && <p>{message}</p>}
    </section>
  );
}
