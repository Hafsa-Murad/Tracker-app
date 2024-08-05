"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Header from "./components/Header";
import AddProduct from "./components/AddProduct";
import DisplayProduct from "./components/DisplayProduct";
import SearchProduct from "./components/SearchProduct";
import Footer from "./components/Footer";

export default function Home() {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/mongodb/route');
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setStockData(data);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };
    fetchData();
  }, []);

  const handleRemoveProduct = async (id) => {
    const updatedStockData = stockData.filter(product => product.id !== id);
    setStockData(updatedStockData);

    await fetch(`/api/mongodb/id`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-6">
        <AddProduct stockData={stockData} setStockData={setStockData} />
        <SearchProduct stockData={stockData} setStockData={setStockData} />
        <DisplayProduct stockData={stockData} handleRemoveProduct={handleRemoveProduct} />
      </div>
      <Footer />
    </>
  );
}




