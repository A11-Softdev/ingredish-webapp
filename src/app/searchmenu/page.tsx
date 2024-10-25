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

  const deleteBlog = (id: string) => {
    setBlogs((prevCards) => prevCards?.filter((card) => card._id !== id));
  };

  //get Data
  const getBlogs = async (query: string, page: number) => {
    try {
      setLoading(true);
      const temp = await fetchBlogs(page, 10, query);
      console.log("Fetched data:", temp);

      setBlogs(temp.data);

      let numberOfPages: number = Math.ceil(temp.total / temp.limit);
      const isNotZero: number = temp.total % temp.limit; // Calculate the modulus

      // if (isNotZero > 0) {
      //   numberOfPages++;
      // }
      // console.log(numberOfPages);

      setNumpage(numberOfPages);

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
    getBlogs(query, currentPage);
  }, [query, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Handle filtering and sorting
  const filteredItems = blogs
    ?.filter((item) => {
      // Filter by selected kitchen tools
      const matchesTools =
        selectedTools.length === 0 ||
        item.kitchentools?.some((tool) => selectedTools.includes(tool));

      // Filter by source (AI-generated or user-generated)
      const matchesSource =
        selectedSource.length === 0 ||
        selectedSource.includes(item.IsGenerated ? "AI" : "ผู้ใช้งาน");
      return matchesTools && matchesSource;
    })
    .sort((a, b) => {
      // Sorting logic based on selected sort option
      if (sortOption === "latest") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else if (sortOption === "oldest") {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      } else if (sortOption === "highestRating") {
        return (b.rating || 0) - (a.rating || 0);
      } else if (sortOption === "menuAsc") {
        return a.name.localeCompare(b.name);
      } else if (sortOption === "menuDesc") {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });

  return (
    <div className="ml-28 mr-28">
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
      <div className="h-[650px]">
        <div className="grid grid-cols-2 gap-2">
          {filteredItems?.slice(0, 10).map((blog) => (
            <LongCard card={blog} onDelete={deleteBlog} />
          ))}
        </div>
      </div>
      <div className="mt-10 mb-10">
        <Pagination
          currentPage={currentPage}
          totalPages={numPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default SearchMenu;
