import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import { useLanguage } from "../i18n";

const API_BASE = process.env.REACT_APP_BACKEND_URL ? `${process.env.REACT_APP_BACKEND_URL}/api` : "/api";
const STATUSES = ["pending", "processing", "shipped", "delivered", "cancelled"];

export default function AdminOrdersPage() {
  const { t } = useLanguage();
  const { authHeaders, logout } = useAdminAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.get(`${API_BASE}/admin/orders`, {
        headers: authHeaders,
        params: { q: q || undefined, status: status || undefined, page: 1, page_size: 200 },
      });
      setOrders(data);
    } catch (e) {
      setError(e?.response?.data?.detail || t("admin.orders.failedLoad"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateStatus = async (orderId, nextStatus) => {
    setError("");
    try {
      await axios.patch(`${API_BASE}/admin/orders/${orderId}/status`, { status: nextStatus }, { headers: authHeaders });
      fetchOrders();
    } catch (e) {
      setError(e?.response?.data?.detail || t("admin.orders.failedUpdate"));
    }
  };

  const exportCsv = async () => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (status) params.set("status", status);
    const url = `${API_BASE}/admin/orders/export.csv?${params.toString()}`;
    const { data } = await axios.get(url, { headers: authHeaders, responseType: "blob" });
    const blobUrl = window.URL.createObjectURL(new Blob([data], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = "orders.csv";
    a.click();
    window.URL.revokeObjectURL(blobUrl);
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(255,193,7,0.15),_transparent_34%),_rgb(247,245,238)] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-[1.6rem] border border-slate-200 bg-white p-5">
          <div>
            <h1 className="text-3xl font-bold text-slate-950">{t("admin.orders.title")}</h1>
            <p className="text-sm text-slate-600">{t("admin.orders.subtitle")}</p>
          </div>
          <div className="flex gap-2">
            <Link to="/admin/products" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">{t("admin.common.products")}</Link>
            <button onClick={logout} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">{t("admin.common.logout")}</button>
          </div>
        </div>

        <section className="rounded-[1.6rem] border border-slate-200 bg-white p-5">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("admin.orders.search")} className="w-full max-w-md rounded-full border border-slate-200 bg-[#F7FAF0] px-4 py-2.5" />
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-full border border-slate-200 bg-[#F7FAF0] px-4 py-2.5">
              <option value="">{t("admin.orders.allStatuses")}</option>
              {STATUSES.map((s) => <option key={s} value={s}>{t(`admin.status.${s}`)}</option>)}
            </select>
            <button onClick={fetchOrders} className="rounded-full border border-slate-200 px-4 py-2 text-sm">{t("admin.common.apply")}</button>
            <button onClick={exportCsv} className="rounded-full bg-[#FFC107] px-4 py-2 text-sm font-semibold text-[#0F172A]">{t("admin.common.exportCsv")}</button>
          </div>

          {error ? <p className="mb-3 text-sm font-medium text-red-600">{error}</p> : null}
          {loading ? <p className="text-sm text-slate-600">{t("admin.common.loading")}</p> : null}

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-600">
                  <th className="py-2">{t("admin.orders.columns.order")}</th><th className="py-2">{t("admin.orders.columns.customer")}</th><th className="py-2">{t("admin.orders.columns.phone")}</th><th className="py-2">{t("admin.orders.columns.items")}</th><th className="py-2">{t("admin.orders.columns.subtotal")}</th><th className="py-2">{t("admin.orders.columns.total")}</th><th className="py-2">{t("admin.orders.columns.status")}</th><th className="py-2">{t("admin.orders.columns.created")}</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-b border-slate-100 align-top">
                    <td className="py-2 pr-2 font-semibold">{o.order_number}</td>
                    <td className="py-2 pr-2">{o.customer?.name}</td>
                    <td className="py-2 pr-2">{o.customer?.phone}</td>
                    <td className="py-2 pr-2">{(o.items || []).reduce((sum, it) => sum + (it.quantity || 0), 0)}</td>
                    <td className="py-2 pr-2">{o.subtotal}</td>
                    <td className="py-2 pr-2">{o.total}</td>
                    <td className="py-2 pr-2">
                      <select value={o.status} onChange={(e) => updateStatus(o.id, e.target.value)} className="rounded-full border border-slate-200 bg-[#F7FAF0] px-3 py-1">
                        {STATUSES.map((s) => <option key={s} value={s}>{t(`admin.status.${s}`)}</option>)}
                      </select>
                    </td>
                    <td className="py-2 pr-2">{String(o.created_at || "").slice(0, 19).replace("T", " ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
