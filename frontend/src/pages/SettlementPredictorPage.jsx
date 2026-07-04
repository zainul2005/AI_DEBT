import { useState } from 'react';
import axios from 'axios';

export default function SettlementPredictorPage() {
  const [form, setForm] = useState({
    outstanding_loan: 18000,
    monthly_income: 4200,
    monthly_expenses: 2200,
    emi: 1200,
    lump_sum: 3000,
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: Number(value) }));
  };

  const handleCalculate = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8000/api/settlement-predict', form);
      setResult(response.data);
      await axios.post('http://localhost:8000/api/history', {
        record_type: 'settlement',
        title: 'Settlement Prediction Generated',
        description: `Estimated settlement of ${response.data.settlement_percentage}% with ${response.data.savings} savings.`,
        status: 'completed',
      });
    } catch (err) {
      setError(err?.response?.data?.error?.message || err?.message || 'Unable to generate settlement guidance right now.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container dashboard-shell">
      <div className="page-heading">
        <div>
          <p className="eyebrow">AI Settlement Prediction</p>
          <h2>Model likely settlement ranges and craft a negotiation strategy.</h2>
        </div>
      </div>
      <div className="panel-card wide-card animated-card">
        <form className="form loan-form" onSubmit={handleCalculate}>
          <label>Outstanding Loan</label>
          <input type="number" name="outstanding_loan" value={form.outstanding_loan} onChange={handleChange} />
          <label>Monthly Income</label>
          <input type="number" name="monthly_income" value={form.monthly_income} onChange={handleChange} />
          <label>Monthly Expenses</label>
          <input type="number" name="monthly_expenses" value={form.monthly_expenses} onChange={handleChange} />
          <label>EMI</label>
          <input type="number" name="emi" value={form.emi} onChange={handleChange} />
          <label>Lump Sum</label>
          <input type="number" name="lump_sum" value={form.lump_sum} onChange={handleChange} />
          <button className="btn" type="submit" disabled={loading}>{loading ? 'Analyzing…' : 'Predict Settlement'}</button>
        </form>
        {error ? <p className="form-message error">{error}</p> : null}
        {result ? (
          <div className="stats-grid" style={{ marginTop: '1rem' }}>
            <div className="panel-card">
              <p className="panel-label">Settlement %</p>
              <h3>{result.settlement_percentage}%</h3>
            </div>
            <div className="panel-card">
              <p className="panel-label">Estimated Savings</p>
              <h3>${result.savings}</h3>
            </div>
            <div className="panel-card">
              <p className="panel-label">Monthly Capacity</p>
              <h3>${result.monthly_capacity}</h3>
            </div>
            <div className="panel-card">
              <p className="panel-label">Source</p>
              <h3>{result.source}</h3>
            </div>
            <div className="panel-card wide-card">
              <p className="panel-label">Negotiation Advice</p>
              <h3>{result.negotiation_advice}</h3>
            </div>
            <div className="panel-card wide-card">
              <p className="panel-label">Recommendation</p>
              <h3>{result.recommendation}</h3>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
