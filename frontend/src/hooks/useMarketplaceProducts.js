import { useEffect, useState } from "react";
import axios from "axios";
import { MARKETPLACE_PRODUCTS } from "../data/marketplace";

const API_BASE = process.env.REACT_APP_BACKEND_URL ? `${process.env.REACT_APP_BACKEND_URL}/api` : "/api";

export default function useMarketplaceProducts() {
  const [products, setProducts] = useState(MARKETPLACE_PRODUCTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadProducts = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/products`);
        if (!active || !Array.isArray(data)) return;

        const liveById = new Map(data.map((product) => [product.id, product]));
        const merged = MARKETPLACE_PRODUCTS.map((product) => {
          const live = liveById.get(product.id);
          if (!live) return product;
          return {
            ...product,
            category: live.category ?? product.category,
            price: live.price ?? product.price,
            weight: live.weight ?? product.weight,
            stock: live.stock ?? product.stock,
            promo: live.promo ?? product.promo,
            featured: live.featured ?? product.featured,
          };
        });

        setProducts(merged);
      } catch {
        // Silent fallback: keep static marketplace data when backend is unavailable.
      } finally {
        if (active) setLoading(false);
      }
    };

    loadProducts();

    return () => {
      active = false;
    };
  }, []);

  return { products, loading };
}