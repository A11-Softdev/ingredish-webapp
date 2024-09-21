"use client";
import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Input } from "@nextui-org/react";
import { Tab, Tabs, Select, MenuItem, SelectChangeEvent} from "@mui/material";
import Pagination from "@mui/material/Pagination";

export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [tabValue, setTabValue] = useState(0); // 0 for all products, 1 for popular
  const [sortOption, setSortOption] = useState("A-Z"); // Sort option
  const [searchQuery, setSearchQuery] = useState("");

  const shop = {
    name: "Shikanoko",
    owner: "Takanoko",
    description: "Shikanoko Shikanoko Shikanoko Shikanoko Shikanoko Shikanoko",
    contact: "contact",
    address: "123/456 Shikanoko town Shikanoko city Shikanoko country Shikanoko 12345",
  };

  const products = [
    {
      id: "1",
      img: "https://inwfile.com/s-ci/hyea80.jpg",
      name: "มะเขือเทศ",
      description: "มะเขือเทศ สดจากสวน ชุ่มฉ่ำ กรอบหวาน สุดอร่อย",
      sold: 100,
      amount: 50,
      price: 20,
    },
    {
      id: "2",
      img: "https://inwfile.com/s-ci/hyea80.jpg",
      name: "มะเขือเทศ",
      description: "มะเขือเทศ สดจากสวน ชุ่มฉ่ำ กรอบหวาน สุดอร่อย",
      sold: 30,
      amount: 50,
      price: 25,
    },
    {
      id: "3",
      img: "https://inwfile.com/s-ci/hyea80.jpg",
      name: "พริกหวาน",
      description: "พริกหวานกรอบ หวานสด จากฟาร์ม",
      sold: 150,
      amount: 70,
      price: 15,
    },
    {
      id: "4",
      img: "https://inwfile.com/s-ci/hyea80.jpg",
      name: "แตงกวา",
      description: "แตงกวาสด กรอบ จากสวน",
      sold: 60,
      amount: 100,
      price: 10,
    },
    {
      id: "5",
      img: "https://inwfile.com/s-ci/hyea80.jpg",
      name: "กะหล่ำปลี",
      description: "กะหล่ำปลี สดจากสวน กะหล่ำปลี สดจากสวน กะหล่ำปลี สดจากสวน",
      sold: 100,
      amount: 50,
      price: 20,
    },
  ];

  // Handle tab change (filtering by popular/all)
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Handle sort option change
  const handleSortChange = (event: SelectChangeEvent) => {
    setSortOption(event.target.value as string);
  };

  // Handle search query change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Filter products by search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort products based on selected option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "A-Z") return a.name.localeCompare(b.name);
    if (sortOption === "Z-A") return b.name.localeCompare(a.name);
    if (sortOption === "low-high") return a.price - b.price;
    if (sortOption === "high-low") return b.price - a.price;
    return 0;
  });

  // Filter by tab selection (All or Popular)
  const displayedProducts = sortedProducts.filter((product) => {
    if (tabValue === 1) return product.sold > 50; // Popular items filter
    return true; // All items
  });

  return (
    <div className="flex w-[85vw] min-h-[81vh] mx-auto bg-background flex-col">
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
      </div>

      {/* Tabs, Filter, Search */}
      <div className="flex w-full justify-evenly items-center pb-4 border-b-2 border-gray-300">
        {/* Tabs on the Left */}
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="product category tabs" className="flex-1">
          <Tab label="สินค้าทั้งหมด" />
          <Tab label="สินค้ายอดนิยม" />
        </Tabs>

        {/* Sort Filter in the Middle */}
        <div className="flex-1 flex justify-center bg-dark-yellow p-2 items-center gap-8">
          <Select value={sortOption} onChange={handleSortChange} className="min-w-[200px] bg-white" displayEmpty>
            <MenuItem value="A-Z">เรียงตามตัวอักษร A-Z</MenuItem>
            <MenuItem value="Z-A">เรียงตามตัวอักษร Z-A</MenuItem>
            <MenuItem value="low-high">ราคาจากน้อยไปมาก</MenuItem>
            <MenuItem value="high-low">ราคาจากมากไปน้อย</MenuItem>
          </Select>


        {/* Search Bar on the Right */}
          <Input placeholder="ค้นหาสินค้า..." value={searchQuery} onChange={handleSearchChange} isClearable/>
        </div>
      </div>

      {/* Total product count */}
      <div className="tracking-tight">จำนวนสินค้า : {displayedProducts.length} รายการ</div>

      {/* Product List */}
      <div className="flex flex-col gap-4 lg:grid grid-cols-2 mt-2">
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="flex justify-center my-10 space-x-2 w-full"><Pagination count={10} size="large" color="primary" /></div>

    </div>
  );
}
