"use client";

import React, { useRef, useState, useEffect } from "react";
import CardPost from "./CardPost";
import { LongCardDataProps } from "../types/LongCardTypes";
import { fetchBlogs } from "../api/blogs";
import KitchenwareFilter from "./KitchenwareFilter";

type CardListProps = {
  query: string;
  page: number;
};

const filterOptions = [
  "ทั้งหมด",
  "หม้อนึ่ง",
  "ไมโครเวฟ",
  "หม้อหุงข้าว",
  "เตาอบ",
  "หม้ออบลมร้อน",
  "หม้อทอดไร้น้ำมัน",
  "กระทะไฟฟ้า",
  "เครื่องปั่น",
];

const CardList = ({ query, page }: CardListProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [blogs, setBlogs] = useState<LongCardDataProps[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [numPage, setNumpage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  //get Data
  const getBlogs = async (query: string, page:number) => {
    try {
      setLoading(true);
      const temp = await fetchBlogs(page, 50, query);
      console.log("Fetched data:", temp);

      setBlogs(temp.data);

      // Check if the data is indeed an array
      if (Array.isArray(temp.data)) {
        setBlogs(temp.data); // Set blogs only if data is an array
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
  useEffect(() => {
    getBlogs(query, page);
  }, [query, page]);

  const filteredItems = blogs?.filter((item) => {
    const generatedSource = item.IsGenerated ? "AI" : "ผู้ใช้งาน";
    const matchesSource = generatedSource === query || query === "ทั้งหมด"; // กรองด้วย AI หรือผู้ใช้งาน หรือทั้งหมด
  
    // ตรวจสอบว่า filterOptions มีอยู่ใน item.kitchentools หรือไม่
    const matchesType = item.kitchentools.some((tool) => filterOptions.includes(tool));
  
    return matchesSource && matchesType; // คืนค่าตามเงื่อนไขที่กำหนด
  });
  

  const deleteBlog = (id: string) => {
    setBlogs((prevCards) => prevCards?.filter((card) => card._id !== id));
  };

  return (
    <div
      className="flex overflow-x-scroll pb-2 items-center w-full"
      ref={scrollRef}
    >
      <div className="flex flex-nowrap gap-4">
        {blogs?.slice(0, 5).map((blog, index) => (
          <CardPost key={index} card={blog} onDelete={deleteBlog} />
        ))}
      </div>
    </div>
  );
};

export default CardList;
