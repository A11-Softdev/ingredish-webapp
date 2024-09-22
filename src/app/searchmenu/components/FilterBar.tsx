"use client";
import React, { useState, useEffect, useRef } from "react";
import { FilterBarProps, tools, sources } from "../types/FilterBar";
import { source } from "framer-motion/client";
const FilterBar: React.FC<FilterBarProps> = ({
  selectedTools,
  setSelectedTools,
  selectedSource,
  setSelectedSource,
  sortOption,
  setSortOption,
}) => {
  const [isClickSort, setIsClickSort] = useState<boolean>(false);
  const [isFilterClick, setIsFilterClick] = useState<boolean>(false);
  const MAX_SELECTION = 8;
  const elementRef = useRef<HTMLDivElement>(null);

  // Handle Click
  const handleClickOutside = (event: MouseEvent) => {
    if (
      elementRef.current &&
      !elementRef.current.contains(event.target as Node)
    ) {
      setIsClickSort(false);
      setIsFilterClick(false);
    }
  };

  const handleClickSort = () => {
    setIsClickSort(!isClickSort);
  };

  const handleFilterClick = () => {
    setIsFilterClick(!isFilterClick);
  };

  // Handle tool selection
  const handleToolChange = (tool: string) => {
    setSelectedTools((prev) => {
      if (tool === "ทั้งหมด") {
        if (prev.length === tools.length) {
          return [];
        } else {
          const availableTools = tools.slice(
            0,
            MAX_SELECTION - selectedSource.length
          );
          return availableTools.length + selectedSource.length <= MAX_SELECTION
            ? availableTools
            : prev;
        }
      } else {
        if (prev.includes(tool)) {
          return prev.filter((t) => t !== tool);
        } else if (prev.length + selectedSource.length <= MAX_SELECTION) {
          return [...prev, tool];
        }
        return prev;
      }
    });
  };

  // Handle source selection
  const handleSourceChange = (source: string) => {
    setSelectedSource((prev) => {
      if (source === "ทั้งหมด") {
        if (prev.length === sources.length) {
          return [];
        } else {
          const availableSources = sources.slice(
            0,
            MAX_SELECTION - selectedTools.length
          );
          return availableSources.length + selectedTools.length <= MAX_SELECTION
            ? availableSources
            : prev;
        }
      } else {
        if (prev.includes(source)) {
          return prev.filter((s) => s !== source);
        } else if (prev.length + selectedTools.length <= MAX_SELECTION) {
          return [...prev, source];
        }
        return prev;
      }
    });
  };

  // Clear all filters
  const handleClear = () => {
    setSelectedTools([]);
    setSelectedSource([]);
  };

  useEffect(() => {
    if (isClickSort || isFilterClick) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isClickSort, isFilterClick]);

  return (
    <div className="pt-10 z-50 relative">
      <div className="min-h-10 flex justify-between bg-[rgb(237,179,07)] rounded-md pl-3 pr-3">
        <div className="flex">
          <button
            className="mr-2 font-semibold text-lg"
            onClick={handleFilterClick}
          >
            เลือก
          </button>
          <div className="flex items-center text-base font-medium">
            {selectedTools.length > 0 &&
              selectedTools.map((tool) => (
                <span
                  key={tool}
                  className=" min-h-6 bg-white flex items-center rounded-3xl mr-0.5 pl-1 pr-1"
                >
                  <button
                    className="flex items-center"
                    onClick={() => handleToolChange(tool)}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="rounded-full mr-1"
                      fill="none"
                      width="15"
                      height="15"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="24" height="24" fill="#426E86" />

                      <g clip-path="url(#clip0_429_10968)">
                        <circle
                          cx="12"
                          cy="12"
                          r="9"
                          stroke="#426E86"
                          stroke-width="2.4"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></circle>
                        <path
                          d="M15 9L9 15"
                          stroke="#FFFFFF"
                          stroke-width="2.4"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                        <path
                          d="M9 9L15 15"
                          stroke="#FFFFFF"
                          stroke-width="2.4"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </g>

                      <defs>
                        <clipPath id="clip0_429_10968">
                          <rect
                            width="24"
                            height="24"
                            fill="#426E86"
                            rx="4"
                            ry="4"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    {tool}{" "}
                  </button>
                </span>
              ))}
            {selectedSource.length > 0 &&
              selectedSource.map((source) => (
                <span
                  key={source}
                  className="min-h-6 bg-white flex items-center rounded-3xl mr-0.5 pl-1 pr-1"
                >
                  <button
                    className="flex items-center"
                    onClick={() => handleSourceChange(source)}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="rounded-full mr-1"
                      fill="none"
                      width="15"
                      height="15"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="24" height="24" fill="#426E86" />

                      <g clip-path="url(#clip0_429_10968)">
                        <circle
                          cx="12"
                          cy="12"
                          r="9"
                          stroke="#426E86"
                          stroke-width="2.4"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></circle>
                        <path
                          d="M15 9L9 15"
                          stroke="#FFFFFF"
                          stroke-width="2.4"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                        <path
                          d="M9 9L15 15"
                          stroke="#FFFFFF"
                          stroke-width="2.4"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </g>

                      <defs>
                        <clipPath id="clip0_429_10968">
                          <rect
                            width="24"
                            height="24"
                            fill="#426E86"
                            rx="4"
                            ry="4"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    {source}{" "}
                  </button>
                </span>
              ))}
            {(selectedTools.length > 0 || selectedSource.length > 0) && (
              <div className="min-h-6 bg-[rgb(77,77,78)] flex items-center rounded-3xl text-white mr-0.5 pl-1 pr-1">
                <button className="flex items-center" onClick={handleClear}>
                  <svg
                    viewBox="0 0 24 24"
                    className="rounded-full mr-1"
                    fill="none"
                    width="15"
                    height="15"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="24" height="24" fill="#131313" />

                    <g clip-path="url(#clip0_429_10968)">
                      <circle
                        cx="12"
                        cy="12"
                        r="9"
                        stroke="#131313"
                        stroke-width="2.4"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></circle>
                      <path
                        d="M15 9L9 15"
                        stroke="#FFFFFF"
                        stroke-width="2.4"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                      <path
                        d="M9 9L15 15"
                        stroke="#FFFFFF"
                        stroke-width="2.4"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </g>

                    <defs>
                      <clipPath id="clip0_429_10968">
                        <rect
                          width="24"
                          height="24"
                          fill="#131313"
                          rx="4"
                          ry="4"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  Clear all
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center" onClick={handleClickSort}>
          <svg
            fill="#000000"
            height="18px"
            width="18px"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 59.999 59.999"
            xmlSpace="preserve"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <g>
                {" "}
                <path d="M34.792,46.292L24.499,56.585V20.999c0-0.552-0.448-1-1-1s-1,0.448-1,1v35.586L12.206,46.292 c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414l12,12c0.092,0.092,0.203,0.165,0.325,0.216 c0.122,0.051,0.252,0.077,0.382,0.077s0.26-0.027,0.382-0.077c0.122-0.051,0.233-0.124,0.325-0.216l12-12 c0.391-0.391,0.391-1.023,0-1.414S35.183,45.901,34.792,46.292z"></path>{" "}
                <path d="M49.206,12.292l-12-12c-0.092-0.092-0.203-0.165-0.325-0.216c-0.245-0.101-0.52-0.101-0.764,0 c-0.122,0.051-0.233,0.124-0.325,0.216l-12,12c-0.391,0.391-0.391,1.023,0,1.414c0.195,0.195,0.451,0.293,0.707,0.293 s0.512-0.098,0.707-0.293L35.499,3.413v35.586c0,0.552,0.448,1,1,1s1-0.448,1-1V3.413l10.293,10.293 c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293C49.597,13.315,49.597,12.682,49.206,12.292z"></path>{" "}
              </g>{" "}
            </g>
          </svg>
          <button className="relative font-semibold text-lg">เรียงตาม</button>
        </div>
      </div>
      <div>
        {isFilterClick && (
          <div
            className="absolute left-2 bg-white border-1 border-black rounded-lg p-2 max-w-md w-full"
            ref={elementRef}
          >
            <h4>เครื่องมือ</h4>
            <div className="grid grid-cols-3">
              {tools.map((tool) => (
                <label key={tool} className="p-1 font-medium text-medium">
                  <input
                    type="checkbox"
                    checked={selectedTools.includes(tool)}
                    onChange={() => handleToolChange(tool)}
                  />{" "}
                  {tool}
                </label>
              ))}
            </div>

            <h4>สูตรจาก</h4>
            <div className="grid grid-cols-3">
              {sources.map((source) => (
                <label key={source} className="p-2 font-medium text-medium">
                  <input
                    type="checkbox"
                    checked={selectedSource.includes(source)}
                    onChange={() => handleSourceChange(source)}
                  />{" "}
                  {source}
                </label>
              ))}
            </div>
          </div>
        )}
        {isClickSort && (
          <div
            className="absolute -right-14 bg-white border-1 border-black rounded-lg p-2 pr-8 flex flex-col items-start font-medium text-medium"
            ref={elementRef}
          >
            <button
              className="hover:text-[rgb(66,110,134)] "
              onClick={() => setSortOption("latest")}
            >
              ล่าสุด
            </button>
            <button
              className="hover:text-[rgb(66,110,134)]"
              onClick={() => setSortOption("oldest")}
            >
              เก่าที่สุด
            </button>
            <button
              className="hover:text-[rgb(66,110,134)]"
              onClick={() => setSortOption("highestRating")}
            >
              Rating สูงสุด
            </button>
            <button
              className="hover:text-[rgb(66,110,134)]"
              onClick={() => setSortOption("menuAsc")}
            >
              ชื่อเมนู ก-ฮ, A-Z
            </button>
            <button
              className="hover:text-[rgb(66,110,134)]"
              onClick={() => setSortOption("menuDesc")}
            >
              ชื่อเมนู ฮ-ก, Z-A
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
