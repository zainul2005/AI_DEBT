import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

const emptyLoan = {
  bank: '',
  loan_type: '',
  outstanding: '',
  interest: '',
  emi: '',
  overdue: '',
  priority: 'High'
};

export default function LoanManagementPage() {
  const [loans, setLoans] = useState([]);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState(emptyLoan);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchLoans = async () => {
    const response = await axios.get('http://localhost:8000/api/loans');
    setLoans(response.data);
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const filteredLoans = useMemo(() => {
    const term = search.toLowerCase();
    return loans.filter((loan) => [loan.bank, loan.loan_type, loan.priority].join(' ').toLowerCase().includes(term));
  }, [loans, search]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const payload = {
        ...form,
        outstanding: Number(form.outstanding),
        interest: Number(form.interest),
        emi: Number(form.emi),
        overdue: Number(form.overdue)
      };

      if (editingId) {
        await axios.put(`http://localhost:8000/api/loans/${editingId}`, payload);
        setMessage('Loan updated successfully.');
      } else {
        await axios.post('http://localhost:8000/api/loans', payload);
        setMessage('Loan added successfully.');
      }
      setForm(emptyLoan);
      setEditingId(null);
      await fetchLoans();
    } catch (error) {
      setMessage(error?.response?.data?.detail || 'Unable to save loan.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (loan) => {
    setEditingId(loan.id);
    setForm({ ...loan });
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8000/api/loans/${id}`);
    await fetchLoans();
    setMessage('Loan removed.');
  };

  return (
    <section className="container dashboard-shell">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Loan Management</p>
          <h2>Track, update, and prioritize each loan with clarity.</h2>
        </div>
      </div>
      <div className="panel-card wide-card animated-card">
        <div className="panel-header">
          <h3>{editingId ? 'Edit Loan' : 'Add Loan'}</h3>
          <span>CRUD • Validation • Real-time</span>
        </div>
        <form className="loan-form" onSubmit={handleSubmit}>
          <input placeholder="Bank" value={form.bank} onChange={(e) => setForm({ ...form, bank: e.target.value })} required />
          <input placeholder="Loan Type" value={form.loan_type} onChange={(e) => setForm({ ...form, loan_type: e.target.value })} required />
          <input type="number" placeholder="Outstanding" value={form.outstanding} onChange={(e) => setForm({ ...form, outstanding: e.target.value })} required />
          <input type="number" placeholder="Interest (%)" value={form.interest} onChange={(e) => setForm({ ...form, interest: e.target.value })} required />
          <input type="number" placeholder="EMI" value={form.emi} onChange={(e) => setForm({ ...form, emi: e.target.value })} required />
          <input type="number" placeholder="Overdue" value={form.overdue} onChange={(e) => setForm({ ...form, overdue: e.target.value })} required />
          <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button className="btn" type="submit" disabled={loading}>{loading ? 'Saving...' : editingId ? 'Update Loan' : 'Add Loan'}</button>
        </form>
        {message ? <p className={`form-message ${message.includes('success') ? 'success' : 'error'}`}>{message}</p> : null}
      </div>
      <div className="panel-card wide-card animated-card">
        <div className="panel-header">
          <h3>Loan Overview</h3>
          <input placeholder="Search loans" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Bank</th>
              <th>Loan Type</th>
              <th>Outstanding</th>
              <th>Interest</th>
              <th>EMI</th>
              <th>Overdue</th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLoans.map((loan) => (
              <tr key={loan.id}>
                <td>{loan.bank}</td>
                <td>{loan.loan_type}</td>
                <td>${loan.outstanding}</td>
                <td>{loan.interest}%</td>
                <td>${loan.emi}</td>
                <td>${loan.overdue}</td>
                <td>{loan.priority}</td>
                <td>
                  <div className="action-row">
                    <button className="btn secondary" onClick={() => handleEdit(loan)}>Edit</button>
                    <button className="btn secondary danger" onClick={() => handleDelete(loan.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
