import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultProducts from "../data/defaultProducts";

export default function AddProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    image: "",
    description: "",
    specs: "",
    rating: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function validateNumber(value) {
    // allow numeric strings like "12345"
    const n = Number(String(value).trim());
    return Number.isFinite(n);
  }

  function sanitizeNumber(value, fallback = 0) {
    const n = Number(String(value).trim());
    return Number.isFinite(n) ? n : fallback;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Trim strings
    const name = (form.name || "").trim();
    const category = (form.category || "").trim();
    const priceRaw = (form.price || "").toString().trim();
    const quantityRaw = (form.quantity || "").toString().trim();
    const image = (form.image || "").trim();

    // Required fields check
    if (!name || !category || !priceRaw || !quantityRaw || !image) {
      alert("Please fill all required fields: name, category, price, quantity, image URL.");
      return;
    }

    // Strict numeric validation
    if (!validateNumber(priceRaw) || !validateNumber(quantityRaw)) {
      alert("Please enter valid numeric values for Price and Quantity.");
      return;
    }

    const price = sanitizeNumber(priceRaw, 0);
    const quantity = Math.max(0, Math.trunc(sanitizeNumber(quantityRaw, 0)));
    const rating = sanitizeNumber(form.rating || 0, 0);

    // Build the new product object with safe fields only
    const newProduct = {
      id: Date.now(), // simple unique id
      name,
      category,
      price,
      quantity,
      image,
      description: (form.description || "").trim(),
      specs: (form.specs || "").trim(),
      rating
    };

    try {
      // read stored products
      const storedStr = localStorage.getItem("products_v1");
      let stored = [];
      if (storedStr) {
        try {
          const parsed = JSON.parse(storedStr);
          if (Array.isArray(parsed)) stored = parsed;
          else console.warn("products_v1 not an array, overwriting with default + newProduct");
        } catch (err) {
          console.warn("Failed to parse products_v1; overwriting with defaults.", err);
        }
      } else {
        // no stored -> use defaultProducts
        stored = Array.isArray(defaultProducts) ? defaultProducts : [];
      }

      const next = [...stored, newProduct];

      // Try saving, with try/catch to avoid corrupting storage
      try {
        localStorage.setItem("products_v1", JSON.stringify(next));
      } catch (err) {
        console.error("Failed to write products_v1 to localStorage:", err);
        alert("Warning: could not save product locally (localStorage error). Product not persisted.");
      }

      alert("Product added successfully.");
      navigate("/");

    } catch (err) {
      console.error("Unexpected error adding product:", err);
      alert("An unexpected error occurred. See console for details.");
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 700, margin: "0 auto" }} className="card">
      <div className="card-body">
        <h2>Add New Product</h2>

        <div className="form-row">
          <label className="small">Name*</label>
          <input className="input" name="name" value={form.name} onChange={handleChange} />
        </div>

        <div className="form-row">
          <label className="small">Category*</label>
          <input className="input" name="category" value={form.category} onChange={handleChange} />
        </div>

        <div className="form-row">
          <label className="small">Price (PHP)*</label>
          <input className="input" name="price" value={form.price} onChange={handleChange} type="number" min="0" step="1" />
        </div>

        <div className="form-row">
          <label className="small">Quantity*</label>
          <input className="input" name="quantity" value={form.quantity} onChange={handleChange} type="number" min="0" step="1" />
        </div>

        <div className="form-row">
          <label className="small">Image URL*</label>
          <input className="input" name="image" value={form.image} onChange={handleChange} />
        </div>

        <div className="form-row">
          <label className="small">Description</label>
          <input className="input" name="description" value={form.description} onChange={handleChange} />
        </div>

        <div className="form-row">
          <label className="small">Specs</label>
          <input className="input" name="specs" value={form.specs} onChange={handleChange} />
        </div>

        <div className="form-row">
          <label className="small">Rating</label>
          <input className="input" name="rating" value={form.rating} onChange={handleChange} type="number" min="0" step="0.1" />
        </div>

        <div style={{ marginTop: 12 }}>
          <button className="button" type="submit">Add Product</button>
        </div>
      </div>
    </form>
  );
}
