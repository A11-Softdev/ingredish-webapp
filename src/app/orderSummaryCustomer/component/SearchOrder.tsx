"use client";
import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { useRouter, usePathname } from "next/navigation";

interface SearchBoxProps {
  defaultValue: string;
  num: number;
}
const SearchOrder = ({ num, defaultValue }: SearchBoxProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const [inputValue, setValue] = useState<string>(defaultValue);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setValue(inputValue);
  };
  const handleSearch = () => {
    if (inputValue.trim()) {
      router.push(`/orderSummaryCustomer/?q=${encodeURIComponent(inputValue)}`);
    } else {
      router.push("/");
    }
  };
  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  const handleClear = () => {
    setValue(""); // Clear the input field by setting the state to an empty string
  };
  return (
    <div className="flex items-center gap-3">
      <p className="font-normal text-2xl">Result : {num} Order(s)</p>
      <div className=" border rounded-3xl w-[300px] h-[45px] bg-white flex items-center justify-around">
        <input
          type="text"
          placeholder="Search order..."
          className="w-[200px] border-none rounded-md focus:outline-none focus:ring-0"
          value={inputValue}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleClear}>
          <svg
            viewBox="0 0 24 24"
            className="rounded-full mr-1"
            fill="none"
            width="15"
            height="15"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="24" fill="#FFFFFF" />

            <g clip-path="url(#clip0_429_10968)">
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="#FFFFFF"
                stroke-width="2.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></circle>
              <path
                d="M15 9L9 15"
                stroke="#000000"
                stroke-width="2.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M9 9L15 15"
                stroke="#000000"
                stroke-width="2.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </g>

            <defs>
              <clipPath id="clip0_429_10968">
                <rect width="24" height="24" fill="#426E86" rx="4" ry="4" />
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SearchOrder;
