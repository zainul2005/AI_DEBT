import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const items = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Financial Health', path: '/financial-health' },
  { label: 'Settlement Predictor', path: '/settlement-predictor' },
  { label: 'Negotiation Email', path: '/negotiation-email' },
  { label: 'Know Your Rights', path: '/know-your-rights' },
  { label: 'History', path: '/history' },
  { label: 'Loan Management', path: '/loan-management' }
];

export default function DashboardPage() {
  const [snapshot, setSnapshot] = useState(null);

  useEffect(() => {
    axios.get('https://ai-debt.onrender.com/insights/snapshot').then((response) => setSnapshot(response.data));
  }, []);

  return (
    <section className="dashboard-layout">
      <aside className="sidebar">
        <div className="brand-block">
          <div className="brand-mark">FR</div>
          <div>
            <h3>FinRelief AI</h3>
            <p>Recovery Suite</p>
          </div>
        </div>
        <nav className="sidebar-nav">
          {items.map((item) => (
            <Link key={item.path} to={item.path} className="sidebar-link">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link to="/login" className="sidebar-link logout-link">Logout</Link>
      </aside>
      <main className="dashboard-content">
        <div className="page-heading">
          <div>
            <p className="eyebrow">Dashboard</p>
            <h2>Financial recovery command center</h2>
          </div>
        </div>
        <div className="stats-grid">
          <div className="panel-card">
            <p className="panel-label">Monthly Income</p>
            <h3>$5,200</h3>
          </div>
          <div className="panel-card">
            <p className="panel-label">Monthly Expenses</p>
            <h3>$3,100</h3>
          </div>
          <div className="panel-card">
            <p className="panel-label">Monthly Surplus</p>
            <h3>$2,100</h3>
          </div>
          <div className="panel-card">
            <p className="panel-label">Outstanding Loan</p>
            <h3>$18,400</h3>
          </div>
          <div className="panel-card">
            <p className="panel-label">Debt Ratio</p>
            <h3>42%</h3>
          </div>
          <div className="panel-card">
            <p className="panel-label">Stress Level</p>
            <h3>Moderate</h3>
          </div>
          <div className="panel-card">
            <p className="panel-label">Settlement %</p>
            <h3>{snapshot?.recovery_score ? `${snapshot.recovery_score}%` : '--'}</h3>
          </div>
        </div>
        <div className="panel-card wide-card">
          <div className="panel-header">
            <h3>Financial Profile</h3>
            <span>AI Insights Ready</span>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Lender</th>
                <th>Balance</th>
                <th>Rate</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>North Star Credit</td>
                <td>$7,900</td>
                <td>18.2%</td>
                <td>Active</td>
              </tr>
              <tr>
                <td>Summit Medical</td>
                <td>$4,400</td>
                <td>12.4%</td>
                <td>Review</td>
              </tr>
              <tr>
                <td>Harbor Utilities</td>
                <td>$6,100</td>
                <td>0%</td>
                <td>Priority</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </section>
  );
}
