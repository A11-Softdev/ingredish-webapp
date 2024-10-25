"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import FilterBar from "./components/FilterBar";
import { LongCardDataProps, BlogsProps } from "./types/LongCardTypes";
import { fetchBlogs } from "./api/blogs";

import LongCard from "./components/LongCard";
import Pagination from "@/components/Pagination";

const SearchMenu = () => {
  const [blogs, setBlogs] = useState<LongCardDataProps[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [numPage, setNumpage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [selectedSource, setSelectedSource] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>("latest");

  const deleteBlog = (id : string) => {
    setBlogs((prevCards) => prevCards?.filter((card) => card._id !== id));
  };

  //get Data
  useEffect(() => {
    const getBlogs = async () => {
      try {
        setLoading(true);
        const temp = await fetchBlogs();
        console.log("Fetched data:", temp);

        setBlogs(temp.data);
        setNumpage(temp.page);

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

    getBlogs();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // You can add logic here to fetch new data based on `page`
    console.log("Page changed to:", page);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Handle filtering and sorting
  const filteredItems = blogs
    ?.filter(
      (item) =>
        (selectedTools.length === 0 ||
          item.kitchentools.some((tool) => selectedTools.includes(tool))) &&
        (selectedSource.length === 0 ||
          selectedSource.includes(
            item.isGenByAI === true ? "AI" : "ผู้ใช้งาน"
          )) &&
        (item.name.toLowerCase().includes(query?.toLowerCase()) ||
          item.ingredient.some((ingre) =>
            ingre.toLowerCase().includes(query?.toLowerCase() || "")
          ))
    )
    .sort((a, b) => {
      if (sortOption === "latest") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else if (sortOption === "oldest") {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      } else if (sortOption === "highestRating") {
        return b.rating - a.rating;
      } else if (sortOption === "menuAsc") {
        return a.name.localeCompare(b.name);
      } else if (sortOption === "menuDesc") {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });

  return (
    <div className="ml-28 mr-28 min-h-svh">
      {query && (
        <>
          <div className="text-3xl font-semibold text-center mt-10">
            สูตรจาก '{query}'
          </div>
        </>
      )}
      <FilterBar
        selectedTools={selectedTools}
        setSelectedTools={setSelectedTools}
        selectedSource={selectedSource}
        setSelectedSource={setSelectedSource}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
      <div className="mt-2 mb-2 w-full border border-black"></div>
      <div className="grid grid-cols-2 gap-2">
        {filteredItems?.slice(0, 10).map((blog) => (
          <LongCard card={blog} onDelete={deleteBlog}/>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={numPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default SearchMenu;
