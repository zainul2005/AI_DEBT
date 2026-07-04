import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const FinancialHealthPage = lazy(() => import('./pages/FinancialHealthPage'));
const SettlementPredictorPage = lazy(() => import('./pages/SettlementPredictorPage'));
const NegotiationEmailPage = lazy(() => import('./pages/NegotiationEmailPage'));
const RightsPage = lazy(() => import('./pages/RightsPage'));
const HistoryPage = lazy(() => import('./pages/HistoryPage'));
const LoanManagementPage = lazy(() => import('./pages/LoanManagementPage'));
const InsightsPage = lazy(() => import('./pages/InsightsPage'));
const PlansPage = lazy(() => import('./pages/PlansPage'));

function ProtectedRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: '2rem 0' }}>Loading...</div>}>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="financial-health"
          element={
            <ProtectedRoute>
              <FinancialHealthPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="settlement-predictor"
          element={
            <ProtectedRoute>
              <SettlementPredictorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="negotiation-email"
          element={
            <ProtectedRoute>
              <NegotiationEmailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="know-your-rights"
          element={
            <ProtectedRoute>
              <RightsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="history"
          element={
            <ProtectedRoute>
              <HistoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="loan-management"
          element={
            <ProtectedRoute>
              <LoanManagementPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="insights"
          element={
            <ProtectedRoute>
              <InsightsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="plans"
          element={
            <ProtectedRoute>
              <PlansPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
    </Suspense>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
