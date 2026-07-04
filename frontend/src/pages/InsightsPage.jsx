export default function InsightsPage() {
  return (
    <section className="container" style={{ padding: '2rem 0' }}>
      <div className="card">
        <h2>AI insights</h2>
        <p style={{ color: '#cbd5e1' }}>This module is prepared for future AI-powered recommendations, scenario modeling, and anomaly detection.</p>
        <div className="grid" style={{ marginTop: '1rem' }}>
          <div className="card">
            <h3>Recommended move</h3>
            <p>Prioritize the 12% APR loan balance to reduce interest exposure.</p>
          </div>
          <div className="card">
            <h3>Optimization signal</h3>
            <p>Increasing monthly surplus by $300 could reduce payoff time by 4 months.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
