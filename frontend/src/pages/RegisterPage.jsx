import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth();

  const errors = useMemo(() => {
    const nextErrors = {};
    if (!fullName.trim()) nextErrors.fullName = 'Full name is required';
    if (!email) nextErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = 'Enter a valid email';
    if (!password || password.length < 8) nextErrors.password = 'Password must be at least 8 characters';
    return nextErrors;
  }, [fullName, email, password]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');

    if (Object.keys(errors).length) {
      setMessage('Please correct the highlighted fields.');
      return;
    }

    try {
      await register(fullName, email, password);
      setMessage('Account created successfully. You can sign in now.');
      setTimeout(() => navigate('/login'), 500);
    } catch (err) {
      setMessage(err?.message || 'We could not create your account. Please try again.');
    }
  };

  return (
    <AuthLayout title="Create your account" subtitle="Join FinRelief AI to design a structured recovery roadmap with secure access.">
      <form className="form" onSubmit={handleSubmit}>
        <input placeholder="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        {errors.fullName ? <small className="field-error">{errors.fullName}</small> : null}
        <input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {errors.email ? <small className="field-error">{errors.email}</small> : null}
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {errors.password ? <small className="field-error">{errors.password}</small> : null}
        {message ? <p className={`form-message ${message.includes('success') ? 'success' : 'error'}`}>{message}</p> : null}
        <button className="btn" type="submit">Create Account</button>
      </form>
    </AuthLayout>
  );
}
