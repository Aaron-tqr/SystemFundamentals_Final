import React from "react";
import { useParams, Link } from "react-router-dom";
import defaultProducts from "../data/defaultProducts";

export default function ProductDetail() {
  const { id } = useParams();
  const product = defaultProducts.find((p) => String(p.id) === id);

  if (!product) {
    return (
      <div>
        <p>Product not found.</p>
        <Link to="/">Back</Link>
      </div>
    );
  }

  return (
    <div className="card" style={{ padding: 0 }}>
      <img src={product.image} alt={product.name} />
      <div className="card-body">
        <h2>{product.name}</h2>
        <p className="small">{product.category}</p>
        <p className="price">₱{product.price.toLocaleString()}</p>
        <p className="small">Quantity: {product.quantity}</p>
        <p style={{ marginTop: 12 }}>{product.description}</p>
        <p className="small" style={{ marginTop: 8 }}>
          Specs: {product.specs}
        </p>
        <p className="small" style={{ marginTop: 8 }}>
          Rating: {product.rating}
        </p>
        <div style={{ marginTop: 12 }}>
          <Link to="/" className="button">
            Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
}
