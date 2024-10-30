"use client";
import React from "react";
import Link from "next/link";
import { ShopProps } from "../types/product";

const ShopCard = () => {
  return (
    <div className="h-28 w-[700px] bg-white flex items-center">
      <div className="ml-4 mr-4  flex w-full justify-between">
        <div className="flex items-center">
          <img
            src="https://www.shutterstock.com/shutterstock/photos/475989598/display_1500/stock-vector-woman-girl-avatar-shopping-shop-store-sale-offer-market-icon-set-colorful-and-flat-design-vector-475989598.jpg"
            alt="\picture shop"
            className="h-16 w-16 rounded-[50%]"
          />
          <div className="ml-2">
            <p className="font-medium text-lg">ร้านค้ามะเขือเทศ</p>
            <p className="font-light text-sm">นายทักษ์ดนัย</p>
            <p className="font-extralight text-sm">425.25พัน ผู้ติดตาม | 3 กำลังติดตาม</p>
          </div>
        </div>

        <div className="flex items-center">
          <div className="">
            <svg
              version="1.0"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="24px"
              height="24px"
              viewBox="0 0 64 64"
              enable-background="new 0 0 64 64"
              xmlSpace="preserve"
              fill="#000000"
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
                  <circle fill="#000000" cx="44" cy="60" r="4"></circle>{" "}
                  <circle fill="#000000" cx="28" cy="60" r="4"></circle>{" "}
                  <path
                    fill="#000000"
                    d="M63.246,21.66C62.492,20.617,61.285,20,60,20H18.977L15.934,3.285C15.59,1.383,13.934,0,12,0H4 C1.789,0,0,1.789,0,4s1.789,4,4,4h4.66l7.406,40.715C16.41,50.617,18.066,52,20,52h32c1.723,0,3.25-1.102,3.793-2.734l8-24 C64.203,24.047,63.996,22.703,63.246,21.66z"
                  ></path>{" "}
                </g>{" "}
              </g>
            </svg>
            <p className="font-light text-sm">สินค้า</p>
            
          </div>
          <p className="font-medium text-sm ml-2">100</p>
        </div>

        <div className="flex flex-col justify-between w-28">
          <button className="text-center bg-white border rounded-md border-black h-7 w-full">
            ดูร้านค้า
          </button>
          <button className="text-center bg-white border rounded-md border-black h-7 w-full">
            ติดตาม
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;
