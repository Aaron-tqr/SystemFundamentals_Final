import React, { useState } from "react";
import defaultProducts from "../data/defaultProducts";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState(defaultProducts);
  const [filter, setFilter] = useState("All");

  function handleIncrease(id) {
    setProducts(
      products.map((p) =>
        p.id === id ? { ...p, quantity: p.quantity + 1 } : p
      )
    );
  }

  function handleDecrease(id) {
    setProducts(
      products.map((p) =>
        p.id === id ? { ...p, quantity: Math.max(0, p.quantity - 1) } : p
      )
    );
  }

  function handleAddToCart(product) {
    // For prototype: simple alert + could implement cart later
    alert(`${product.name} added to cart`);
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
        <div>
          <Link to="/add" className="button">
            Add New Product
          </Link>
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
