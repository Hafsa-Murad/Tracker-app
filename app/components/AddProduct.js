"use client";

import { useState } from "react";

export default function AddProduct({ stockData, setStockData }) {
  const [newProduct, setNewProduct] = useState({ name: '', quantity: 0, price: '' });

  const handleAddProduct = async () => {
    const newId = stockData.length ? stockData[stockData.length - 1].id + 1 : 1;
    const newProductEntry = { ...newProduct, id: newId };
    setStockData([...stockData, newProductEntry]);
    setNewProduct({ name: '', quantity: 0, price: '' });

    await fetch('/api/mongodb/route', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProductEntry),
    });
  };

  return (
    <div className="flex flex-col items-center mb-8">
      <h2 className="text-2xl font-bold mb-6">Add a Product</h2>
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          className="border p-2 rounded w-full sm:w-48"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newProduct.quantity}
          onChange={(e) => setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) })}
          className="border p-2 rounded w-full sm:w-48"
        />
        <input
          type="text"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          className="border p-2 rounded w-full sm:w-48"
        />
        <button onClick={handleAddProduct} className="bg-blue-500 text-white p-2 rounded w-full sm:w-auto px-4 py-2">Add Product</button>
      </div>
    </div>
  );
}
