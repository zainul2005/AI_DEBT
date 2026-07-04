import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { useAuth } from '../context/AuthContext';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { forgotPassword } = useAuth();

  const errors = useMemo(() => {
    if (!email) return { email: 'Email is required' };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { email: 'Enter a valid email' };
    return {};
  }, [email]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');

    if (Object.keys(errors).length) {
      setMessage('Please provide a valid email address.');
      return;
    }

    try {
      await forgotPassword(email);
      setMessage('Reset instructions sent. Please check your email.');
      setTimeout(() => navigate('/login'), 700);
    } catch (err) {
      setMessage(err?.message || 'Unable to process your request.');
    }
  };

  return (
    <AuthLayout title="Forgot password" subtitle="Recover access to your account with a secure reset link.">
      <form className="form" onSubmit={handleSubmit}>
        <input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {errors.email ? <small className="field-error">{errors.email}</small> : null}
        {message ? <p className={`form-message ${message.includes('sent') ? 'success' : 'error'}`}>{message}</p> : null}
        <button className="btn" type="submit">Send Reset Link</button>
      </form>
    </AuthLayout>
  );
}
