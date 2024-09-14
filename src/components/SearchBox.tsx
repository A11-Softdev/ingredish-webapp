"use client";
import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";

interface SearchBoxProps {
  defaultValue: string;
}

const SearchBox = ({ defaultValue }: SearchBoxProps) => {
  const router = useRouter();

  const [inputValue, setValue] = useState<string>(defaultValue);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setValue(inputValue);
  };

  const handleSearch = () => {
    if (inputValue.trim()) {
      router.push(`/searchmenu/?q=${encodeURIComponent(inputValue)}`);
    } else {
      router.push("/");
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <>
      <div className="max-w-lg w-full flex items-center border border-[rgb(237,179,07)] rounded-md p-1 bg-white ">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="พิมพ์ชื่อวัตถุดิบ..."
            className="w-full pl-10 pr-4 py-1 border-none rounded-md focus:outline-none focus:ring-0"
            value={inputValue}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />

          <svg
            className="absolute left-0.5 top-1/2 transform -translate-y-1/2 text-gray-500"
            width="28"
            height="22"
            fill="none"
            viewBox="0 0 30 40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"
              fill="#EDB307"
            />
          </svg>
        </div>
        <button onClick={handleSearch} className="bg-[rgb(237,179,07)] text-[rgb(34,34,34)] rounded-md px-4 py-1 ml-2 font-semibold">
          ค้นหา
        </button>
      </div>
    </>
  );
};

export default SearchBox;
