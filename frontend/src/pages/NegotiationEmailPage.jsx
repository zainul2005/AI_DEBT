import { useState } from 'react';
import axios from 'axios';

export default function NegotiationEmailPage() {
  const [form, setForm] = useState({
    borrower_name: 'Ava Martinez',
    bank: 'Northstar Bank',
    loan: 'Personal Loan',
    settlement_amount: 7500,
    reason: 'temporary income disruption after a medical event',
  });
  const [emailText, setEmailText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: name === 'settlement_amount' ? Number(value) : value }));
  };

  const handleGenerate = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8000/api/negotiation-email', form);
      setEmailText(response.data.body);
      await axios.post('http://localhost:8000/api/history', {
        record_type: 'email',
        title: 'Negotiation Email Generated',
        description: `Drafted an email for ${form.borrower_name} with ${form.bank}.`,
        status: 'completed',
      });
    } catch (err) {
      setError(err?.response?.data?.error?.message || err?.message || 'Unable to generate the email draft right now.');
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = (extension, mimeType) => {
    if (!emailText) return;
    const blob = new Blob([emailText], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `negotiation-email.${extension}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = async () => {
    if (!emailText) return;
    await navigator.clipboard.writeText(emailText);
  };

  return (
    <section className="container dashboard-shell">
      <div className="page-heading">
        <div>
          <p className="eyebrow">AI Negotiation Email</p>
          <h2>Create a professional hardship settlement email with one click.</h2>
        </div>
      </div>
      <div className="panel-card wide-card animated-card">
        <form className="form loan-form" onSubmit={handleGenerate}>
          <label>Borrower Name</label>
          <input name="borrower_name" value={form.borrower_name} onChange={handleChange} />
          <label>Bank</label>
          <input name="bank" value={form.bank} onChange={handleChange} />
          <label>Loan</label>
          <input name="loan" value={form.loan} onChange={handleChange} />
          <label>Settlement Amount</label>
          <input name="settlement_amount" type="number" value={form.settlement_amount} onChange={handleChange} />
          <label>Reason</label>
          <input name="reason" value={form.reason} onChange={handleChange} />
          <button className="btn" type="submit" disabled={loading}>{loading ? 'Generating…' : 'Generate'}</button>
        </form>
        {error ? <p className="form-message error">{error}</p> : null}
      </div>
      <div className="panel-card wide-card animated-card">
        <div className="panel-header">
          <h3>Draft Email</h3>
          <div className="action-row">
            <button className="btn secondary" onClick={copyToClipboard}>Copy</button>
            <button className="btn secondary" onClick={() => downloadFile('pdf', 'application/pdf')}>Download PDF</button>
            <button className="btn secondary" onClick={() => downloadFile('docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')}>Download DOCX</button>
          </div>
        </div>
        <textarea value={emailText} onChange={(e) => setEmailText(e.target.value)} rows={14} />
      </div>
    </section>
  );
}
