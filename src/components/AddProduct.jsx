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
    rating: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // required fields
    const required = ["name", "category", "price", "quantity", "image"];

    // ✅ PUT IT HERE (validation block)
    for (let field of required) {
      if (!form[field]) {
        alert(`Please fill the required field: ${field}`);
        return;
      }
    }

    const stored = JSON.parse(localStorage.getItem("products_v1") || "[]");

    const highest = stored.length
      ? Math.max(...stored.map((p) => p.id))
      : defaultProducts.length
      ? Math.max(...defaultProducts.map((p) => p.id))
      : 0;

    const newId = highest + 1;

    const newProduct = {
      id: newId,
      name: form.name,
      category: form.category,
      price: Number(form.price),
      quantity: Number(form.quantity),
      image: form.image,
      description: form.description,
      specs: form.specs,
      rating: Number(form.rating) || 0,
    };

    const next = [...(stored.length ? stored : defaultProducts), newProduct];

    localStorage.setItem("products_v1", JSON.stringify(next));

    alert("Product added and saved locally. Redirecting to home.");
    navigate("/");
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: 700, margin: "0 auto" }}
      className="card"
    >
      <div className="card-body">
        <h2>Add New Product</h2>

        <div className="form-row">
          <label className="small">Name*</label>
          <input
            className="input"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <label className="small">Category*</label>
          <input
            className="input"
            name="category"
            value={form.category}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <label className="small">Price (PHP)*</label>
          <input
            className="input"
            name="price"
            value={form.price}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <label className="small">Quantity*</label>
          <input
            className="input"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <label className="small">Image URL*</label>
          <input
            className="input"
            name="image"
            value={form.image}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <label className="small">Description</label>
          <input
            className="input"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div style={{ marginTop: 12 }}>
          <button className="button" type="submit">
            Add Product
          </button>
        </div>
      </div>
    </form>
  );
}
