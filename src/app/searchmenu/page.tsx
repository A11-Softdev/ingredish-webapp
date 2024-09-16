"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import FilterBar from "./components/FilterBar";
import { LongCardDataProps } from "./types/LongCardTypes";
import LongCard from "./components/LongCard";

const SearchMenu = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const items: LongCardDataProps[] = [
    {username: "N", description: "ไข่ • ปู • น้ำปลา • น้ำมัน", time: "40 นาที", portion: "1 คนทาน", menu:"ข้าวไข่เจียว", id : 0, rating: 4.5, tools: "กระทะไฟฟ้า", source: "AI"},
    {username: "A", description: "ไข่ • ปู • น้ำปลา • น้ำมัน", time: "40 นาที", portion: "1 คนทาน", menu:"ข้าวไข่เจียว", id : 1, rating: 4.7, tools: "ทั้งหมด", source: "ผู้ใช้งาน"},
    {username: "N", description: "ไข่ • ปู • น้ำปลา • น้ำมัน", time: "40 นาที", portion: "1 คนทาน", menu:"ข้าวไข่เจียว", id : 0, rating: 4.5, tools: "กระทะไฟฟ้า", source: "AI"},
    {username: "A", description: "ไข่ • ปู • น้ำปลา • น้ำมัน", time: "40 นาที", portion: "1 คนทาน", menu:"ข้าวไข่เจียว", id : 1, rating: 4.7, tools: "ทั้งหมด", source: "ผู้ใช้งาน"},
    {username: "N", description: "ไข่ • ปู • น้ำปลา • น้ำมัน", time: "40 นาที", portion: "1 คนทาน", menu:"ข้าวไข่เจียว", id : 0, rating: 4.5, tools: "กระทะไฟฟ้า", source: "AI"},
    {username: "A", description: "ไข่ • ปู • น้ำปลา • น้ำมัน", time: "40 นาที", portion: "1 คนทาน", menu:"ข้าวไข่เจียว", id : 1, rating: 4.7, tools: "ทั้งหมด", source: "ผู้ใช้งาน"},
    {username: "N", description: "ไข่ • ปู • น้ำปลา • น้ำมัน", time: "40 นาที", portion: "1 คนทาน", menu:"ข้าวไข่เจียว", id : 0, rating: 4.5, tools: "กระทะไฟฟ้า", source: "AI"},
    {username: "A", description: "ไข่ • ปู • น้ำปลา • น้ำมัน", time: "40 นาที", portion: "1 คนทาน", menu:"ข้าวไข่เจียว", id : 1, rating: 4.7, tools: "ทั้งหมด", source: "ผู้ใช้งาน"},
    {username: "N", description: "ไข่ • ปู • น้ำปลา • น้ำมัน", time: "40 นาที", portion: "1 คนทาน", menu:"ข้าวไข่เจียว", id : 0, rating: 4.5, tools: "กระทะไฟฟ้า", source: "AI"},
    {username: "A", description: "ไข่ • ปู • น้ำปลา • น้ำมัน", time: "40 นาที", portion: "1 คนทาน", menu:"ข้าวไข่เจียว", id : 1, rating: 4.7, tools: "ทั้งหมด", source: "ผู้ใช้งาน"}
  ]

  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [selectedSource, setSelectedSource] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>("latest");

  // Handle filtering and sorting
  const filteredItems = items
    .filter(item =>
      (selectedTools.length === 0 || selectedTools.includes(item.tools)) &&
      (selectedSource.length === 0 || selectedSource.includes(item.source))
    )
    .sort((a, b) => {
      if (sortOption === 'latest') {
        return b.id - a.id;
      } else if (sortOption === 'oldest') {
        return a.id - b.id;
      } else if (sortOption === 'highestRating') {
        return b.rating - a.rating;
      } else if (sortOption === 'menuAsc') {
        return a.menu.localeCompare(b.menu);
      } else if (sortOption === 'menuDesc') {
        return b.menu.localeCompare(a.menu);
      }
      return 0;
    });

  return (
    <div className="pl-28 pr-28 pt-14">
      {query && (
        <>
          <div className="text-3xl font-semibold text-center">
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
        {filteredItems.slice(0, 20).map(item => (
          <div key={item.id} className="w-full h-full max-h-32 max-w-xl">
            
            <LongCard
              username={item.username}
              description={item.description}
              time={item.time}
              portion={item.portion}
              menu={item.menu}
              id={item.id}
              rating={item.rating}
              tools={item.tools}
              source={item.source}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchMenu;
