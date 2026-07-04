import { useEffect, useState } from 'react';
import axios from 'axios';

export default function HistoryPage() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [recordType, setRecordType] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const loadHistory = async () => {
    const response = await axios.get('http://localhost:8000/api/history', {
      params: { page, page_size: pageSize, search, record_type: recordType },
    });
    setItems(response.data.items);
    setTotalPages(response.data.pages);
  };

  useEffect(() => {
    loadHistory();
  }, [page, pageSize, search, recordType]);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8000/api/history/${id}`);
    loadHistory();
  };

  return (
    <section className="container dashboard-shell">
      <div className="page-heading">
        <div>
          <p className="eyebrow">History Management</p>
          <h2>Track settlements, emails, and reports in one secure place.</h2>
        </div>
      </div>
      <div className="panel-card wide-card animated-card">
        <div className="search-row">
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search history" />
          <select value={recordType} onChange={(event) => setRecordType(event.target.value)}>
            <option value="">All records</option>
            <option value="settlement">Settlement</option>
            <option value="email">Email</option>
            <option value="report">Report</option>
          </select>
        </div>
        <table className="data-table" style={{ marginTop: '1rem' }}>
          <thead>
            <tr>
              <th>Created</th>
              <th>Type</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{new Date(item.created_at).toLocaleDateString()}</td>
                <td>{item.record_type}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>{item.status}</td>
                <td><button className="btn secondary danger" onClick={() => handleDelete(item.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination-row">
          <button className="btn secondary" disabled={page === 1} onClick={() => setPage((current) => current - 1)}>Previous</button>
          <span>Page {page} of {totalPages}</span>
          <button className="btn secondary" disabled={page === totalPages} onClick={() => setPage((current) => current + 1)}>Next</button>
        </div>
      </div>
    </section>
  );
}
