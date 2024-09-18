"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

export default function page({ params }: { params: { id: string } }) {
  const id = params.id;
  const product = {
    img: "https://inwfile.com/s-ci/hyea80.jpg",
    name: "มะเขือเทศ",
    description: "มะเขือเทศ สดจากสวน ชุ่มฉ่ำ กรอบหวาน สุดอร่อย",
    sold: 100,
    amount: 50,
    price: 20,
  };
  // useEffect(async() => {
  //     console.log(id);
  //     const shop = await axios(`/shop/${id}`);
  // });
  return (
    // page div
    <div className="flex w-[85vw] mx-auto bg-background flex-col">
      {/* shop-detail */}
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
        <div className="flex flex-col bg-white border-2 border-black rounded-xl grow p-4">
          <div className="flex gap-2">
            <span className="text-xl">{"shop.name"}</span>
            <span className="flex items-end">{"shop.owner"}</span>
          </div>
          <div className="mt-2">{"shop.description"}</div>
          <div className="mt-2">{"shop.contact"}</div>
          <div className="mt-2">
            <FontAwesomeIcon icon={faLocationDot} className="mr-2"/>
            {"shop.address"}
          </div>
        </div>
      </div>
      {/* filter bar */}
      <div className=""></div>
      {/* total product */}
      <div className="tracking-tight">
        จำนวนสินค้า : {"shop.totalProduct"} รายการ
      </div>
      {/* product list */}
      <div className="flex flex-col gap-4 lg:grid grid-cols-2 mt-2">
        <ProductCard product={product}></ProductCard>
        <ProductCard product={product}></ProductCard>
        <ProductCard product={product}></ProductCard>
        <ProductCard product={product}></ProductCard>
        <ProductCard product={product}></ProductCard>
      </div>
    </div>
  );
}
