import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const errors = useMemo(() => {
    const nextErrors = {};
    if (!email) nextErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = 'Enter a valid email';
    if (!password) nextErrors.password = 'Password is required';
    return nextErrors;
  }, [email, password]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (Object.keys(errors).length) {
      setError('Please correct the highlighted fields.');
      return;
    }

    try {
      await login(email, password, rememberMe);
      setSuccess('Signed in successfully.');
      setTimeout(() => navigate('/dashboard'), 250);
    } catch (err) {
      setError(err?.message || 'Unable to sign in. Please verify your credentials.');
    }
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Access your recovery dashboard, recommendations, and secure account settings.">
      <form className="form" onSubmit={handleSubmit}>
        <input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {errors.email ? <small className="field-error">{errors.email}</small> : null}
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {errors.password ? <small className="field-error">{errors.password}</small> : null}
        <label className="checkbox-row">
          <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
          <span>Remember me for 120 minutes</span>
        </label>
        {error ? <p className="form-message error">{error}</p> : null}
        {success ? <p className="form-message success">{success}</p> : null}
        <button className="btn" type="submit">Sign In</button>
      </form>
    </AuthLayout>
  );
}
