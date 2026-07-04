import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
  const { token, logout } = useAuth();

  return (
    <div>
      <header className="container navbar">
        <NavLink to="/" style={{ fontSize: '1.2rem', fontWeight: 700 }}>
          FinRelief AI
        </NavLink>
        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
          {token ? (
            <>
              <NavLink to="/dashboard">Dashboard</NavLink>
              <NavLink to="/insights">Insights</NavLink>
              <NavLink to="/plans">Plans</NavLink>
              <button className="btn secondary" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
              <NavLink to="/forgot-password">Forgot Password</NavLink>
            </>
          )}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
