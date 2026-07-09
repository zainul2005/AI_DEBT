import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = "https://ai-debt.onrender.com";

export default function FinancialHealthPage() {
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/financial-health`)
      .then((response) => setAnalysis(response.data));
  }, []);

  const score = analysis?.health_score ?? 0;
  const surplus = analysis?.monthly_surplus ?? 0;
  const debtRatio = analysis?.debt_ratio ?? 0;

  return (
    <section className="container dashboard-shell">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Financial Health Analysis</p>
          <h2>Monitor balance, stability, and stress with automated analysis.</h2>
        </div>
      </div>

      <div className="stats-grid">
        <div className="panel-card animated-card">
          <p className="panel-label">Monthly Surplus</p>
          <h3>${surplus}</h3>
        </div>

        <div className="panel-card animated-card">
          <p className="panel-label">Debt Ratio</p>
          <h3>{debtRatio}%</h3>
        </div>

        <div className="panel-card animated-card">
          <p className="panel-label">Health Score</p>
          <h3>{score}/100</h3>
        </div>

        <div className="panel-card animated-card">
          <p className="panel-label">Stress Level</p>
          <h3>{analysis?.stress_level ?? '--'}</h3>
        </div>
      </div>

      <div className="panel-card wide-card animated-card">
        <div className="panel-header">
          <h3>Progress Overview</h3>
          <span>Auto-calculated</span>
        </div>

        <div className="meter-block">
          <label>Financial Health Score</label>
          <div className="meter">
            <div style={{ width: `${score}%` }} />
          </div>
        </div>

        <div className="meter-block">
          <label>Debt Stability</label>
          <div className="meter">
            <div style={{ width: `${Math.max(0, 100 - debtRatio)}%` }} />
          </div>
        </div>

        <div className="meter-block">
          <label>Recovery Momentum</label>
          <div className="meter">
            <div style={{ width: `${Math.min(100, Math.max(0, score + 10))}%` }} />
          </div>
        </div>
      </div>

      <div className="panel-card wide-card animated-card">
        <div className="panel-header">
          <h3>Suggestions</h3>
          <span>AI-informed guidance</span>
        </div>

        <ul className="rights-list">
          {analysis?.suggestions?.map((suggestion) => (
            <li key={suggestion}>{suggestion}</li>
          ))}
        </ul>
      </div>

      <div className="panel-card wide-card animated-card">
        <div className="panel-header">
          <h3>Trend Snapshot</h3>
          <span>Chart-ready view</span>
        </div>

        <div className="chart-row">
          {analysis?.chart_series?.map((value, index) => (
            <div key={`${value}-${index}`} className="chart-bar">
              <div className="bar-fill" style={{ height: `${value}%` }} />
              <span>{['Q1', 'Q2', 'Q3'][index]}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
