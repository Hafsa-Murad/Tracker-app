"use client";

import { useState } from "react";

export default function SearchProduct({ stockData, setStockData }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value) {
      const results = stockData.filter(product =>
        product.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleIncrease = (id) => {
    const updatedStockData = stockData.map(product => 
      product.id === id ? { ...product, quantity: product.quantity + 1 } : product
    );
    setStockData(updatedStockData);
  };

  const handleDecrease = (id) => {
    const updatedStockData = stockData.map(product => 
      product.id === id ? { ...product, quantity: product.quantity - 1 } : product
    );
    setStockData(updatedStockData);
  };

  return (
    <div className="flex flex-col items-center mb-8 ">
      <h1 className="text-2xl font-bold mb-6 ">Search a Product</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearch}
        className="border p-2 rounded w-full sm:w-48 mb-4 text-lg w-full sm:w-3/4" // Increase text size in input field
      />
      {searchResults.length > 0 && (
        <div className="border rounded w-full sm:w-48 bg-white w-full sm:w-3/4">
          {searchResults.map((result) => (
            <div key={result.id} className="p-4 border-b last:border-b-0 flex items-center justify-between"> {/* Increased padding */}
              <span className="text-lg">{result.name}</span> {/* Increased font size */}
              <span className="text-lg">Quantity: {result.quantity}</span> {/* Increased font size */}
              <div className="flex items-center gap-4"> {/* Increased gap between buttons */}
                <button onClick={() => handleDecrease(result.id)} className="bg-red-500 text-white px-3 py-1 rounded text-lg">-</button> {/* Increased button size */}
                <button onClick={() => handleIncrease(result.id)} className="bg-green-500 text-white px-3 py-1 rounded text-lg">+</button> {/* Increased button size */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
