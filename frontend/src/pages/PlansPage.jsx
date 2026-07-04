export default function PlansPage() {
  return (
    <section className="container" style={{ padding: '2rem 0' }}>
      <div className="card">
        <h2>Recovery plans</h2>
        <p style={{ color: '#cbd5e1' }}>Create structured debt relief strategies based on income, obligations, and recovery goals.</p>
        <div className="grid grid-2" style={{ marginTop: '1rem' }}>
          <div className="card">
            <h3>Accelerated plan</h3>
            <p>Focus on high-interest debt while preserving essential expenses.</p>
          </div>
          <div className="card">
            <h3>Stability plan</h3>
            <p>Prioritize lower-risk payments and cash flow resilience.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
