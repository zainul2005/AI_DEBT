import { createContext, useContext, useMemo, useEffect, useState } from "react";
import axios from "axios";

const getErrorMessage = (error) => {
  if (error.code === "ECONNABORTED") {
    return "Server took too long to respond. Please try again.";
  }

  if (!error.response) {
    return "Unable to connect to the server.";
  }

  const apiMessage =
    error.response?.data?.error?.message ||
    error.response?.data?.detail;

  return apiMessage || "Something went wrong. Please try again.";
};

const AuthContext = createContext(null);

const SESSION_TIMEOUT_MINUTES = 120;
const TOKEN_STORAGE_KEY = "finrelief-token";
const TOKEN_EXPIRY_KEY = "finrelief-token-expiry";
const USER_STORAGE_KEY = "finrelief-user";

const api = axios.create({
  baseURL: "https://ai-debt.onrender.com",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      sessionStorage.removeItem(TOKEN_STORAGE_KEY);
      window.dispatchEvent(new CustomEvent("auth:expired"));
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
  const expiry =
    localStorage.getItem(TOKEN_EXPIRY_KEY) ||
    sessionStorage.getItem(TOKEN_EXPIRY_KEY);

  return expiry ? Number(expiry) : null;
};

const isSessionExpired = () => {
  const expiry = getExpiryTime();
  return expiry ? Date.now() > expiry : false;
};

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    const stored =
      localStorage.getItem(TOKEN_STORAGE_KEY) ||
      sessionStorage.getItem(TOKEN_STORAGE_KEY);

    return stored && !isSessionExpired() ? stored : null;
  });

  const [user, setUser] = useState(() => {
    const stored =
      localStorage.getItem(USER_STORAGE_KEY) ||
      sessionStorage.getItem(USER_STORAGE_KEY);

    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (!token) {
      clearStoredAuth();
      return;
    }

    api.defaults.headers.common.Authorization = `Bearer ${token}`;

    const expiry = getExpiryTime();

    if (!expiry || Date.now() > expiry) {
      clearStoredAuth();
      setToken(null);
      setUser(null);
      return;
    }

    const timer = setTimeout(() => {
      clearStoredAuth();
      setToken(null);
      setUser(null);
    }, expiry - Date.now());

    return () => clearTimeout(timer);
  }, [token]);

  const persistAuth = (accessToken, currentUser, rememberMe) => {
    const expiry = Date.now() + SESSION_TIMEOUT_MINUTES * 60 * 1000;

    const storage = rememberMe ? localStorage : sessionStorage;

    storage.setItem(TOKEN_STORAGE_KEY, accessToken);
    storage.setItem(TOKEN_EXPIRY_KEY, String(expiry));
    storage.setItem(USER_STORAGE_KEY, JSON.stringify(currentUser));

    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    setToken(accessToken);
    setUser(currentUser);
  };

  const login = async (email, password, rememberMe = false) => {
    try {
      const { data } = await api.post("/auth/login", {
        email,
        password,
        remember_me: rememberMe,
      });

      persistAuth(data.access_token, data.user, rememberMe);

      return data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  };

  const register = async (fullName, email, password) => {
    try {
      const { data } = await api.post("/auth/register", {
        full_name: fullName,
        email,
        password,
      });

      return data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  };

  const forgotPassword = async (email) => {
    try {
      const { data } = await api.post("/auth/forgot-password", { email });
      return data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  };

  const resetPassword = async (token, password) => {
    try {
      const { data } = await api.post("/auth/reset-password", {
        token,
        new_password: password,
      });

      return data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  };

  const logout = () => {
    clearStoredAuth();
    delete api.defaults.headers.common.Authorization;
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      token,
      user,
      login,
      register,
      forgotPassword,
      resetPassword,
      logout,
    }),
    [token, user]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
