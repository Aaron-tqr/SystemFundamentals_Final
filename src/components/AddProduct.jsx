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
    // validation check - simple
    const required = ["name", "category", "price", "quantity", "image"];
    for (let field of required) {
      if (!form[field]) {
        alert("Please fill all required fields.");
        return;
      }
    }
    // For prototype: just push to defaultProducts (client-only)
    const newId = Math.max(...defaultProducts.map((p) => p.id)) + 1;
    defaultProducts.push({
      id: newId,
      name: form.name,
      category: form.category,
      price: Number(form.price),
      quantity: Number(form.quantity),
      image: form.image,
      description: form.description,
      specs: form.specs,
      rating: Number(form.rating) || 0,
    });
    alert("Product added (runtime only). Redirecting to home.");
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
