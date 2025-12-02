import React, { useState, useEffect } from "react";
import defaultProducts from "../data/defaultProducts";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("products_v1");
    return saved ? JSON.parse(saved) : defaultProducts;
  });

  const [filter, setFilter] = useState("All");

  useEffect(() => {
    localStorage.setItem("products_v1", JSON.stringify(products));
  }, [products]);

  function handleIncrease(id) {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: p.quantity + 1 } : p))
    );
  }
  function handleDecrease(id) {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, quantity: Math.max(0, p.quantity - 1) } : p
      )
    );
  }
  function handleAddToCart(product) {
    alert(`${product.name} added to cart`);
  }

  function downloadCSV() {
    const rows = [
      ["id", "name", "category", "price", "quantity", "subtotal"],
      ...products.map((p) => [
        p.id,
        p.name,
        p.category,
        p.price,
        p.quantity,
        p.price * p.quantity,
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

  const filtered =
    filter === "All" ? products : products.filter((p) => p.category === filter);
  const overallTotal = products.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );

  const categories = [
    "All",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

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

        {/* Right-side controls: Add and Export buttons */}
        <div>
          <Link to="/add" className="button">
            Add New Product
          </Link>

          {/* Export button placed next to Add New Product */}
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
