import React, { useState, useEffect } from "react";
import defaultProducts from "../data/defaultProducts";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem("products_v1");
      if (!saved) return defaultProducts;
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) return defaultProducts;
      return parsed;
    } catch (err) {
      console.error("Failed to parse products_v1 from localStorage:", err);
      try {
        localStorage.removeItem("products_v1");
      } catch (e) {}
      return defaultProducts;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("products_v1", JSON.stringify(products));
    } catch (err) {
      console.error("Failed to save products_v1 to localStorage:", err);
    }
  }, [products]);

  const [filter, setFilter] = useState("All");

  // Remove totally invalid items here before using them
  const safeProducts = products.filter((p) => {
    if (!p || typeof p !== "object") return false;
    // price and quantity must be finite numbers
    const price = Number(p.price);
    const qty = Number(p.quantity);
    if (!Number.isFinite(price) || !Number.isFinite(qty)) {
      console.warn("Dropping invalid product from render:", p);
      return false;
    }
    return true;
  });

  const categories = [
    "All",
    ...Array.from(
      new Set(safeProducts.map((p) => p.category || "Uncategorized"))
    ),
  ];
  const filtered =
    filter === "All"
      ? safeProducts
      : safeProducts.filter((p) => (p.category || "Uncategorized") === filter);

  const overallTotal = safeProducts.reduce((sum, p) => {
    const price = Number(p.price) || 0;
    const qty = Number(p.quantity) || 0;
    return sum + price * qty;
  }, 0);

  // handlers (increase/decrease/add) should update the full products list (not only safeProducts)
  function handleIncrease(id) {
    setProducts((prev) =>
      prev.map((p) =>
        p && p.id === id ? { ...p, quantity: (Number(p.quantity) || 0) + 1 } : p
      )
    );
  }

  function handleDecrease(id) {
    setProducts((prev) =>
      prev.map((p) =>
        p && p.id === id
          ? { ...p, quantity: Math.max(0, (Number(p.quantity) || 0) - 1) }
          : p
      )
    );
  }

  function handleAddToCart(product) {
    alert(`${product.name} added to cart`);
  }

  // CSV export should use safeProducts
  function downloadCSV() {
    const rows = [
      ["id", "name", "category", "price", "quantity", "subtotal"],
      ...safeProducts.map((p) => [
        p.id,
        p.name,
        p.category,
        p.price,
        p.quantity,
        (Number(p.price) || 0) * (Number(p.quantity) || 0),
      ]),
    ];
    const csv = rows
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "products_export.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 14,
        }}
      >
        <div>
          <label className="small">Filter by category: </label>
          <select
            className="input"
            style={{ display: "inline-block", width: 200 }}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Link to="/add" className="button">
            Add New Product
          </Link>
          <button
            className="button"
            onClick={downloadCSV}
            style={{ marginLeft: 12 }}
          >
            Export CSV
          </button>
        </div>
      </div>

      <div className="grid">
        {filtered.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            onAdd={handleAddToCart}
          />
        ))}
      </div>

      <div className="overall-total">
        <p className="small">Overall Total</p>
        <p style={{ fontSize: 28, fontWeight: 700 }}>
          ₱{overallTotal.toLocaleString()}
        </p>
      </div>
    </>
  );
}
