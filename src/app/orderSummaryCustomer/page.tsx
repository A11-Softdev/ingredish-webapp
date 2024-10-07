"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { OrderProps } from "./types/Order";
import { fetchOrders } from "./api/order";
import FilterBar from "./component/filterBar";
import SearchOrder from "./component/SearchOrder";

const OrderSummaryCustomer = () => {
  const [orders, setOrders] = useState<OrderProps[] | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const num: number = 10; // Still declaring num, but you use 10 directly below

  useEffect(() => {
    const getOrders = async () => {
      try {
        setLoading(true);
        const temp = await fetchOrders();
        console.log("Fetched data:", temp);

        if (Array.isArray(temp)) {
          setOrders(temp); // Set orders only if the data is an array
        } else {
          throw new Error("Invalid data format received. Expected an array.");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to load orders."); // Update error message for clarity
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="ml-28 mr-28 min-h-svh">
      <div className="mt-10 mb-5">
        <p className="font-bold text-[40px]">Your Order</p>
        <FilterBar />
      </div>
      <SearchOrder num={num} defaultValue={query} />
      <div>table</div>
    </div>
  );
};

export default OrderSummaryCustomer;
