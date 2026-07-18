import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import { useLanguage } from "../i18n";

const API_BASE = process.env.REACT_APP_BACKEND_URL ? `${process.env.REACT_APP_BACKEND_URL}/api` : "/api";

const EMPTY_FORM = {
  id: "",
  name: "",
  category: "whole",
  price: 0,
  weight: "",
  stock: 0,
  promo: false,
  featured: false,
  image: "",
};

export default function AdminProductsPage() {
  const { t } = useLanguage();
  const { authHeaders, logout } = useAdminAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState("");
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_BASE}/admin/products`, { headers: authHeaders });
      setProducts(data);
      setError("");
    } catch (e) {
      setError(e?.response?.data?.detail || t("admin.products.failedLoad"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return products;
    return products.filter((p) => `${p.id} ${p.name} ${p.category}`.toLowerCase().includes(q));
  }, [products, query]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (editingId) {
        const payload = { ...form };
        delete payload.id;
        await axios.put(`${API_BASE}/admin/products/${editingId}`, payload, { headers: authHeaders });
      } else {
        await axios.post(`${API_BASE}/admin/products`, form, { headers: authHeaders });
      }
      setForm(EMPTY_FORM);
      setEditingId("");
      fetchProducts();
    } catch (e2) {
      setError(e2?.response?.data?.detail || t("admin.products.failedSave"));
    }
  };

  const onEdit = (product) => {
    setEditingId(product.id);
    setForm({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      weight: product.weight,
      stock: product.stock,
      promo: Boolean(product.promo),
      featured: Boolean(product.featured),
      image: product.image || "",
    });
  };

  const onDelete = async (id) => {
    if (!window.confirm(t("admin.products.confirmDelete").replace("{id}", id))) return;
    setError("");
    try {
      await axios.delete(`${API_BASE}/admin/products/${id}`, { headers: authHeaders });
      fetchProducts();
    } catch (e) {
      setError(e?.response?.data?.detail || t("admin.products.failedDelete"));
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(255,193,7,0.15),_transparent_34%),_rgb(247,245,238)] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-[1.6rem] border border-slate-200 bg-white p-5">
          <div>
            <h1 className="text-3xl font-bold text-slate-950">{t("admin.products.title")}</h1>
            <p className="text-sm text-slate-600">{t("admin.products.subtitle")}</p>
          </div>
          <div className="flex gap-2">
            <Link to="/admin/orders" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">{t("admin.common.orders")}</Link>
            <button onClick={logout} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">{t("admin.common.logout")}</button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.45fr_1fr]">
          <form onSubmit={onSubmit} className="rounded-[1.6rem] border border-slate-200 bg-white p-5 space-y-3">
            <h2 className="text-xl font-bold text-slate-950">{editingId ? `${t("admin.products.edit")} ${editingId}` : t("admin.products.create")}</h2>
            <input disabled={Boolean(editingId)} value={form.id} onChange={(e) => setForm({ ...form, id: e.target.value })} required placeholder={t("admin.products.fieldId")} className="w-full rounded-full border border-slate-200 bg-[#F7FAF0] px-4 py-2.5" />
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder={t("admin.products.fieldName")} className="w-full rounded-full border border-slate-200 bg-[#F7FAF0] px-4 py-2.5" />
            <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required placeholder={t("admin.products.fieldCategory")} className="w-full rounded-full border border-slate-200 bg-[#F7FAF0] px-4 py-2.5" />
            <input type="number" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} required placeholder={t("admin.products.fieldPrice")} className="w-full rounded-full border border-slate-200 bg-[#F7FAF0] px-4 py-2.5" />
            <input value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} required placeholder={t("admin.products.fieldWeight")} className="w-full rounded-full border border-slate-200 bg-[#F7FAF0] px-4 py-2.5" />
            <input type="number" min="0" value={form.stock} onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })} required placeholder={t("admin.products.fieldStock")} className="w-full rounded-full border border-slate-200 bg-[#F7FAF0] px-4 py-2.5" />
            <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder={t("admin.products.fieldImage")} className="w-full rounded-full border border-slate-200 bg-[#F7FAF0] px-4 py-2.5" />
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.promo} onChange={(e) => setForm({ ...form, promo: e.target.checked })} /> {t("admin.products.promo")}</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /> {t("admin.products.featured")}</label>
            <div className="flex gap-2">
              <button type="submit" className="rounded-full bg-[#FFC107] px-4 py-2 text-sm font-semibold text-[#0F172A]">{editingId ? t("admin.products.update") : t("admin.products.create")}</button>
              {editingId ? <button type="button" onClick={() => { setEditingId(""); setForm(EMPTY_FORM); }} className="rounded-full border border-slate-200 px-4 py-2 text-sm">{t("admin.products.cancel")}</button> : null}
            </div>
          </form>

          <section className="rounded-[1.6rem] border border-slate-200 bg-white p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t("admin.products.search")} className="w-full max-w-md rounded-full border border-slate-200 bg-[#F7FAF0] px-4 py-2.5" />
              <button onClick={fetchProducts} className="rounded-full border border-slate-200 px-4 py-2 text-sm">{t("admin.common.refresh")}</button>
            </div>
            {error ? <p className="mb-3 text-sm font-medium text-red-600">{error}</p> : null}
            {loading ? <p className="text-sm text-slate-600">{t("admin.common.loading")}</p> : null}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-600">
                    <th className="py-2">{t("admin.products.columns.id")}</th><th className="py-2">{t("admin.products.columns.name")}</th><th className="py-2">{t("admin.products.columns.category")}</th><th className="py-2">{t("admin.products.columns.price")}</th><th className="py-2">{t("admin.products.columns.stock")}</th><th className="py-2">{t("admin.products.columns.promo")}</th><th className="py-2">{t("admin.products.columns.featured")}</th><th className="py-2">{t("admin.common.actions")}</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p) => (
                    <tr key={p.id} className="border-b border-slate-100">
                      <td className="py-2 pr-2">{p.id}</td>
                      <td className="py-2 pr-2">{p.name}</td>
                      <td className="py-2 pr-2">{p.category}</td>
                      <td className="py-2 pr-2">{p.price}</td>
                      <td className="py-2 pr-2">{p.stock}</td>
                      <td className="py-2 pr-2">{p.promo ? t("admin.products.yes") : t("admin.products.no")}</td>
                      <td className="py-2 pr-2">{p.featured ? t("admin.products.yes") : t("admin.products.no")}</td>
                      <td className="py-2 pr-2 flex gap-2">
                        <button onClick={() => onEdit(p)} className="rounded-full border border-slate-200 px-3 py-1 text-xs">{t("admin.products.edit")}</button>
                        <button onClick={() => onDelete(p.id)} className="rounded-full border border-red-200 px-3 py-1 text-xs text-red-700">{t("admin.products.delete")}</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
