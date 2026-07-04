import { createContext, useContext, useMemo, useEffect, useState } from 'react';
import axios from 'axios';

const getErrorMessage = (error) => {
  const apiMessage = error?.response?.data?.error?.message || error?.response?.data?.detail;
  if (apiMessage) return apiMessage;
  if (error?.message) return error.message;
  return 'Something went wrong. Please try again.';
};

const AuthContext = createContext(null);
const SESSION_TIMEOUT_MINUTES = 120;
const TOKEN_STORAGE_KEY = 'finrelief-token';
const TOKEN_EXPIRY_KEY = 'finrelief-token-expiry';
const USER_STORAGE_KEY = 'finrelief-user';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  timeout: 8000,
  headers: { 'X-Requested-With': 'XMLHttpRequest' }
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      sessionStorage.removeItem(TOKEN_STORAGE_KEY);
      window.dispatchEvent(new CustomEvent('auth:expired'));
    }
    return Promise.reject(error);
  }
);

const clearStoredAuth = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(TOKEN_EXPIRY_KEY);
  localStorage.removeItem(USER_STORAGE_KEY);
  sessionStorage.removeItem(TOKEN_STORAGE_KEY);
  sessionStorage.removeItem(TOKEN_EXPIRY_KEY);
  sessionStorage.removeItem(USER_STORAGE_KEY);
};

const getExpiryTime = () => {
  const expiryValue = localStorage.getItem(TOKEN_EXPIRY_KEY) || sessionStorage.getItem(TOKEN_EXPIRY_KEY);
  return expiryValue ? Number(expiryValue) : null;
};

const isSessionExpired = () => {
  const expiry = getExpiryTime();
  if (!expiry) return false;
  return Date.now() > expiry;
};

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY) || sessionStorage.getItem(TOKEN_STORAGE_KEY);
    return storedToken && !isSessionExpired() ? storedToken : null;
  });
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY) || sessionStorage.getItem(USER_STORAGE_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (!token) {
      clearStoredAuth();
      return;
    }

    const expiry = getExpiryTime();
    if (!expiry || Date.now() > expiry) {
      clearStoredAuth();
      setToken(null);
      setUser(null);
      return;
    }

    api.defaults.headers.common.Authorization = `Bearer ${token}`;

    const timeout = window.setTimeout(() => {
      clearStoredAuth();
      setToken(null);
      setUser(null);
    }, Math.max(expiry - Date.now(), 0));

    return () => window.clearTimeout(timeout);
  }, [token]);

  const persistAuth = (accessToken, currentUser, rememberMe) => {
    const expiry = Date.now() + SESSION_TIMEOUT_MINUTES * 60 * 1000;
    const targetStore = rememberMe ? localStorage : sessionStorage;
    targetStore.setItem(TOKEN_STORAGE_KEY, accessToken);
    targetStore.setItem(TOKEN_EXPIRY_KEY, String(expiry));
    targetStore.setItem(USER_STORAGE_KEY, JSON.stringify(currentUser));
    setToken(accessToken);
    setUser(currentUser);
    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  };

  const login = async (email, password, rememberMe = false) => {
    try {
      const response = await api.post('/auth/login', { email, password, remember_me: rememberMe });
      const { access_token, user: currentUser } = response.data;
      persistAuth(access_token, currentUser, rememberMe);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  };

  const register = async (fullName, email, password) => {
    try {
      const response = await api.post('/auth/register', { full_name: fullName, email, password });
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  };

  const forgotPassword = async (email) => {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  };

  const resetPassword = async (token, password) => {
    try {
      const response = await api.post('/auth/reset-password', { token, new_password: password });
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  };

  const logout = () => {
    clearStoredAuth();
    setToken(null);
    setUser(null);
    delete api.defaults.headers.common.Authorization;
  };

  const value = useMemo(() => ({ token, user, login, register, forgotPassword, resetPassword, logout }), [token, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
