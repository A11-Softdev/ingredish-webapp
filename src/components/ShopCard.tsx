import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { user } from "@nextui-org/react";

interface ShopCard {
  id: string;
  name: string;
  owner: string;
  description?: string;
  contact: string[];
  address: string;
  image_url?: string;
}

export default function ShopCard({
  shop,
  manage,
}: {
  shop: ShopCard;
  manage: boolean;
}) {
  return (
    <div className="flex gap-4 flex-row w-full p-8">
      {/* Image container */}
      <div className="rounded-lg max-w-[150px]">
        <img
          src={shop.image_url ?? "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"}
          alt="shop image"
          className="rounded-lg object-cover h-full w-full"
        ></img>
      </div>
      {/* shop info */}
      <div className="flex flex-row bg-white border-2 border-black rounded-xl grow p-4 relative ">
        <div className="flex grow flex-col">
          <div className="flex gap-2">
            <span className="text-xl font-bold">{shop.name}</span>
            <span className="flex items-end">{shop.owner}</span>
          </div>
          <div className="mt-2">{shop.description}</div>
          <div className="mt-2 flex flex-col">
            <span className="font-semibold">ช่องทางการติดต่อ</span>
            <div className="flex flex-row gap-3">
              {shop.contact.map((contactInfo, index) => (
                <p key={index}>{contactInfo}</p>
              ))}
            </div>
          </div>
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
