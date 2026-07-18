import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import { useLanguage } from "../i18n";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { isAuthenticated, login, loading } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (isAuthenticated) return <Navigate to="/admin/products" replace />;

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const result = await login(email, password);
    if (!result.ok) {
      setError(result.error || t("admin.auth.loginFailed"));
      return;
    }
    navigate("/admin/products");
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(255,193,7,0.15),_transparent_34%),_rgb(247,245,238)] px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_25px_70px_rgba(148,163,184,0.16)]">
        <h1 className="text-3xl font-bold text-slate-950">{t("admin.login.title")}</h1>
        <p className="mt-2 text-sm text-slate-600">{t("admin.login.subtitle")}</p>
        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder={t("admin.login.email")} className="w-full rounded-full border border-slate-200 bg-[#F7FAF0] px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required placeholder={t("admin.login.password")} className="w-full rounded-full border border-slate-200 bg-[#F7FAF0] px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400" />
          {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}
          <button disabled={loading} type="submit" className="w-full rounded-full bg-[#FFC107] px-5 py-3 text-sm font-semibold text-[#0F172A] transition-opacity disabled:opacity-60">
            {loading ? t("admin.login.signingIn") : t("admin.login.signIn")}
          </button>
        </form>
      </div>
    </main>
  );
}
