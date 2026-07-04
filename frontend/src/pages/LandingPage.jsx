import { Link } from 'react-router-dom';
import HeroCard from '../components/HeroCard';

export default function LandingPage() {
  return (
    <section className="container hero">
      <div>
        <p className="eyebrow">AI Powered Debt Relief</p>
        <h1>Financial recovery with clarity, structure, and intelligent guidance.</h1>
        <p className="hero-copy">
          FinRelief AI helps households and businesses build recovery plans, monitor progress, and prepare for a more stable financial future.
        </p>
        <div className="hero-actions">
          <Link className="btn" to="/register">Start Recovery</Link>
          <Link className="btn secondary" to="/login">Access Platform</Link>
        </div>
      </div>
      <div className="grid grid-2">
        <HeroCard title="Debt Strategy" description="Map your obligations and generate recovery scenarios." action={<Link className="btn secondary" to="/plans">Explore Plans</Link>} />
        <HeroCard title="AI Insights" description="Use real-time analytics to understand what is working and what needs change." action={<Link className="btn secondary" to="/insights">View Insights</Link>} />
      </div>
    </section>
  );
}
