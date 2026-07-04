import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { useAuth } from '../context/AuthContext';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { resetPassword } = useAuth();
  const token = searchParams.get('token') || '';

  const errors = useMemo(() => {
    if (!password || password.length < 8) return { password: 'Password must be at least 8 characters' };
    return {};
  }, [password]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');

    if (Object.keys(errors).length) {
      setMessage('Please choose a stronger password.');
      return;
    }

    try {
      await resetPassword(token, password);
      setMessage('Password updated successfully.');
      setTimeout(() => navigate('/login'), 700);
    } catch (err) {
      setMessage(err?.message || 'Unable to reset password.');
    }
  };

  return (
    <AuthLayout title="Reset password" subtitle="Set a new password to secure your account.">
      <form className="form" onSubmit={handleSubmit}>
        <input placeholder="New password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {errors.password ? <small className="field-error">{errors.password}</small> : null}
        {message ? <p className={`form-message ${message.includes('successfully') ? 'success' : 'error'}`}>{message}</p> : null}
        <button className="btn" type="submit">Update Password</button>
      </form>
    </AuthLayout>
  );
}
