"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from "@/screens/blogs/blog.module.css";

const ProductsTable: React.FC = () => {
  // Define the Product type within the component
  type Product = {
    _id: string;
    writer: string;
    title: string;
    body: string;
  };

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>('/api/products'); // Adjust the API endpoint as necessary
        setProducts(response.data);
      } catch (error) {
        console.error(`Error: ${(error as Error).message}`);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      {products.map((product) => (
        <div key={product._id} className={styles.card}>
          <h2>{product.title}</h2>
          <h5>{product.writer}</h5>
          <p>{product.body}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductsTable;
