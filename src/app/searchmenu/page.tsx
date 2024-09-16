"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import FilterBar from "./components/FilterBar";
import { LongCardDataProps } from "./types/LongCardTypes"

const SearchMenu = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  // username: string;
  // description: string;
  // time: string;
  // portion: string;
  // name: string;
  // isByAI: boolean;
  const items: LongCardDataProps[] = [
    {username: "N", description: "-", time: "40 นาที", portion: "1 คนทาน", menu:"ข้าวไข่เจียว", isByAI: false, id : 0, rating: 4.5, tools: "กระทะไฟฟ้า", source: "AI"},
    {username: "N", description: "-", time: "40 นาที", portion: "1 คนทาน", menu:"ข้าวไข่เจียว", isByAI: true, id : 1, rating: 4.7, tools: "ทั้งหมด", source: "ผู้ใช้งาน"}
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
      <div className="z-0">
        {filteredItems.map(item => (
          <div key={item.id} className="item">
            {item.username} {item.menu} - {item.rating} ⭐ - {item.tools} ({item.source})
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchMenu;
