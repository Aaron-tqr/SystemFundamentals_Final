import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import AddProduct from "./components/AddProduct";

function App() {
  return (
    <div className="container">
      <header className="header">
        <h1>Product Management App</h1>
        <p className="small">
          Final Exam • CCDI Sorsogon — Prince Aaron John Tuquero
        </p>
      </header>

      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/add" element={<AddProduct />} />
      </Routes>
      <footer className="footer">
        © {new Date().getFullYear()} CCDI • Product Management App
      </footer>
    </div>
  );
}

export default App;
