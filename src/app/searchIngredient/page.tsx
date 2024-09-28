"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { fetchProducts } from "./api/product";
import { ProductProps } from "./types/product";
import Sort from "./components/Sort";
import ProductCard from "./components/ProductCard";

const searchIngredient = () => {
  const [products, setProducts] = useState<ProductProps[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [sortOption, setSortOption] = useState<string>("latest");

  //get Data
  useEffect(() => {
    const getProducts = async () => {
      try {
        // setLoading(true);
        const temp = await fetchProducts();
        console.log("Fetched data:", temp);

        // Check if the data is indeed an array
        if (Array.isArray(temp)) {
          setProducts(temp); // Set blogs only if data is an array
        } else {
          throw new Error("Invalid data format received. Expected an array.");
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("Failed to load blogs.");
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);
  return (
    <div className="ml-28 mr-28 min-h-svh">
      <div className="flex justify-between items-end mt-8">
        <p className="font-medium text-lg">ค้นหา '{query}'</p>
        <Sort sortOption={sortOption} setSortOption={setSortOption} />
      </div>
      
      <ProductCard />
    </div>
  );
};

export default searchIngredient;
