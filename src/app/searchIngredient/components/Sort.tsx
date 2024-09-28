"use client";
import React, { useState, useEffect, useRef } from "react";
import { SortProps } from "../types/Sort";

const Sort: React.FC<SortProps> = ({setSortOption, sortOption}) => {
  const [isClick, setIsClick] = useState<boolean>(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      elementRef.current &&
      !elementRef.current.contains(event.target as Node)
    ) {
      setIsClick(false);
    }
  };

  const handleClick = () => {
    setIsClick(!isClick);
  };

  useEffect(() => {
    if (isClick) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isClick]);

  return (
    <div>
      <div
        className="relative flex items-center bg-[rgb(237,179,07)] pl-2 pr-3 rounded-md max-w-28"
        onClick={handleClick}
      >
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
      {isClick && (
        <div
          className="absolute z-50 flex flex-col items-start border-1.5 border-black rounded-md m-2 min-w-40 font-medium text-medium"
          ref={elementRef}
        >
          <button className="ml-2 mt-1 hover:text-[rgb(66,110,134)]" onClick={()=>setSortOption("latest")}>
            ล่าสุด
          </button>
          <button className="ml-2 hover:text-[rgb(66,110,134)]" onClick={()=>setSortOption("oldest")}>เก่าสุด</button>
          <button className="ml-2 hover:text-[rgb(66,110,134)]" onClick={()=>setSortOption("cheap")}>ราคาถูก</button>
          <button className="ml-2 hover:text-[rgb(66,110,134)]" onClick={()=>setSortOption("oexpensive")}>ราคาแพง</button>
          <button className="ml-2 hover:text-[rgb(66,110,134)]" onClick={()=>setSortOption("lowestRating")}>
            Rating ต่ำสุด
          </button>
          <button className="ml-2 hover:text-[rgb(66,110,134)]" onClick={()=>setSortOption("highestRating")}>
            Rating สูงสุด
          </button>
          <button className="ml-2 hover:text-[rgb(66,110,134)]"onClick={()=>setSortOption("productAsc")}>
            ชื่อสินค้า ก-ฮ,A-Z
          </button>
          <button className="ml-2 hover:text-[rgb(66,110,134)]"onClick={()=>setSortOption("productDesc")}>
            ชื่อสินค้า ฮ-ก,Z-A
          </button>
          <button className="ml-2 hover:text-[rgb(66,110,134)]"onClick={()=>setSortOption("shopAsc")}>
            ชื่อร้านค้า ก-ฮ,A-Z
          </button>
          <button className="ml-2 mb-1 hover:text-[rgb(66,110,134)]" onClick={()=>setSortOption("shopDesc")}>
            ชื่อร้านค้า ฮ-ก,Z-A
          </button>
        </div>
      )}
    </div>
  );
};

export default Sort;
