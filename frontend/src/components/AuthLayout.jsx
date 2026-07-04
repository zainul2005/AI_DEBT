import { Link } from 'react-router-dom';

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <section className="container auth-shell">
      <div className="auth-card card">
        <div className="auth-brand">
          <div className="brand-mark">FR</div>
          <div>
            <h1>FinRelief AI</h1>
            <p>Secure financial recovery access</p>
          </div>
        </div>
        <h2>{title}</h2>
        <p className="auth-subtitle">{subtitle}</p>
        {children}
        <div className="auth-links">
          <Link to="/login">Sign in</Link>
          <Link to="/register">Create account</Link>
          <Link to="/forgot-password">Forgot password</Link>
        </div>
      </div>
    </section>
  );
}
