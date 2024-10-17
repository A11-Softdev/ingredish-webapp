import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { user } from "@nextui-org/react";

interface ShopCard {
  id: string;
  name: string;
  owner: string;
  description: string;
  contact: string;
  address: string;
}

export default function ShopCard({ shop ,manage }: { shop: ShopCard,manage:boolean }) {
  return (
    <div className="flex gap-4 flex-row w-full p-8">
      {/* Image container */}
      <div className="rounded-lg max-w-[150px]">
        <img
          src="https://i1.sndcdn.com/artworks-zYnSPKgrVqoZu1Oe-KxZZDg-t500x500.jpg"
          alt="shop image"
          className="rounded-lg object-cover h-full w-full"
        ></img>
      </div>
      {/* shop info */}
      <div className="flex flex-row bg-white border-2 border-black rounded-xl grow p-4 relative ">
        <div className="flex grow flex-col">
          <div className="flex gap-2">
            <span className="text-xl">{shop.name}</span>
            <span className="flex items-end">{shop.owner}</span>
          </div>
          <div className="mt-2">{shop.description}</div>
          <div className="mt-2">{shop.contact}</div>
          <div className="mt-2">
            <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
            {shop.address}
          </div>
        </div>
        {manage ? (
          <div className="flex flex-col gap-4">
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="mr-4 mt-2 text-2xl hover:cursor-pointer"
            />
          </div>
        ) : (
          <div className="flex flex-row gap-4 justify-end items-end">
            <a
              href=""
              className="border border-black p-2 rounded-xl px-6 hover:cursor-pointer"
            >
              ดูโปรไฟล์
            </a>
            <div
              onClick={() => {}}
              className="border border-black p-2 rounded-xl px-6 hover:cursor-pointer"
            >
              ติดตาม
            </div>
          </div>
        )}
      </div>
    </div>
  );
}