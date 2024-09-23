"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import FilterBar from "./components/FilterBar";
import { LongCardDataProps, BlogsProps } from "./types/LongCardTypes";
import { fetchBlogs } from "./api/blogs";

import LongCard from "./components/LongCard";

const SearchMenu = () => {
  const [blogs, setBlogs] = useState<LongCardDataProps[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [numPage, setNumpage] = useState<number>(1);

  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [selectedSource, setSelectedSource] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>("latest");
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
        (item.name.toLowerCase().includes(query?.toLowerCase()) || item.ingredient.some(ingre => ingre.toLowerCase().includes(query?.toLowerCase() || '')))
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
      <ul>
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
            <LongCard
              _id={blog._id}
              user_id={blog.user_id}
              name={blog.name}
              role={blog.role}
              image_url={blog.image_url}
              serve={blog.serve}
              ingredient={blog.ingredient}
              kitchentools={blog.kitchentools}
              recipe={blog.recipe}
              review={blog.review}
              createdAt={blog.createdAt}
              rating={blog.rating}
              isGenByAI={blog.isGenByAI}
              source={blog.source}
            />

            // <li key={blog._id}>
            //   <h2>{blog.name}</h2>
            //   <p>{blog.user_id}</p>
            //   <p>{blog.role}</p>
            //   <p>{blog.image_url}</p>
            //   <p>{blog.serve}</p>
            //   <p>{blog.ingredient}</p>
            //   <p>{blog.kitchentools}</p>
            //   <p>{blog.recipe}</p>
            //   <p>{blog.review}</p>
            //   <p>{blog.rating}</p>
            //   <p>{blog.isGenByAI}</p>
            //   <small>{new Date(blog.createdAt).toLocaleDateString()}</small>
            // </li>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default SearchMenu;
