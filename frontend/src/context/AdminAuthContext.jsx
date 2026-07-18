import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useLanguage } from "../i18n";

const API_BASE = process.env.REACT_APP_BACKEND_URL ? `${process.env.REACT_APP_BACKEND_URL}/api` : "/api";
const TOKEN_KEY = "efasol-admin-token";
const TOKEN_EXP_KEY = "efasol-admin-token-exp";

const AdminAuthContext = createContext(undefined);

export function AdminAuthProvider({ children }) {
  const { t } = useLanguage();
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || "");
  const [tokenExpiresAt, setTokenExpiresAt] = useState(() => Number(localStorage.getItem(TOKEN_EXP_KEY) || "0"));
  const [loading, setLoading] = useState(false);

  const isAuthenticated = Boolean(token) && (tokenExpiresAt <= 0 || Date.now() < tokenExpiresAt);

  const setSession = useCallback((nextToken, expiresInSec) => {
    const expiresAt = Date.now() + (Number(expiresInSec || 0) * 1000);
    setToken(nextToken);
    setTokenExpiresAt(expiresAt);
    localStorage.setItem(TOKEN_KEY, nextToken);
    localStorage.setItem(TOKEN_EXP_KEY, String(expiresAt));
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${API_BASE}/admin/login`, { email, password });
      setSession(data.access_token, data.expires_in);
      return { ok: true };
    } catch (error) {
      const message = error?.response?.data?.detail || t("admin.auth.loginFailed");
      return { ok: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = useCallback(async () => {
    if (!token) return { ok: false };
    try {
      const { data } = await axios.post(
        `${API_BASE}/admin/token/refresh`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setSession(data.access_token, data.expires_in);
      return { ok: true };
    } catch {
      return { ok: false };
    }
  }, [token, setSession]);

  const logout = useCallback(() => {
    setToken("");
    setTokenExpiresAt(0);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_EXP_KEY);
  }, []);

  useEffect(() => {
    if (!token) return undefined;
    const intervalId = window.setInterval(async () => {
      const msRemaining = tokenExpiresAt - Date.now();
      if (msRemaining <= 0) {
        logout();
        return;
      }
      if (msRemaining <= 60_000) {
        const result = await refreshToken();
        if (!result.ok) logout();
      }
    }, 15_000);

    return () => window.clearInterval(intervalId);
  }, [logout, refreshToken, token, tokenExpiresAt]);

  const authHeaders = useMemo(() => (token ? { Authorization: `Bearer ${token}` } : {}), [token]);

  return (
    <AdminAuthContext.Provider value={{ token, isAuthenticated, loading, login, logout, authHeaders }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}
