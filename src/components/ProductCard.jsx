import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({
  product,
  onAdd,
  onDecrease,
  onIncrease,
}) {
  const subtotal = product.price * product.quantity;
  const lowStock = product.quantity < 5;

  return (
    <div className={`card ${lowStock ? "low-stock" : ""}`}>
      <img src={product.image} alt={product.name} />
      <div className="card-body">
        <h3>{product.name}</h3>
        <p className="small">{product.category}</p>
        <p className="price">₱{product.price.toLocaleString()}</p>
        <p className="small">Quantity: {product.quantity}</p>
        <p className="small">Subtotal: ₱{subtotal.toLocaleString()}</p>

        <div className="controls">
          <button className="button" onClick={() => onDecrease(product.id)}>
            -
          </button>
          <button className="button" onClick={() => onIncrease(product.id)}>
            +
          </button>
          <Link
            to={`/products/${product.id}`}
            className="button"
            style={{ marginLeft: 8 }}
          >
            Details
          </Link>
          <button
            onClick={() => onAdd(product)}
            style={{ marginLeft: 8 }}
            className="button"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
