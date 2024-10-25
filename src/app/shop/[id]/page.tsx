"use client";
import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "@nextui-org/react";
import { Tab, Tabs, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import ShopCard from "@/components/ShopCard";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [tabValue, setTabValue] = useState(0); // 0 for all products, 1 for popular
  const [sortOption, setSortOption] = useState("A-Z"); // Sort option
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const shop = {
    _id: "66ee3bfa78734c830d95a646",
    user_id: {
        _id: "66e3a3da9c7c2fe955645c8c",
        username: "HomTest",
        email: "HomTest@gmail.com",
        password: "$2a$10$sFxPVvFMfkoJfZFG30aOzOu0c3rTZFmhr/Tfyc.a0aV7AXx2QNDlC",
        image_url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        role: "customer",
        createdAt: "2024-09-13T02:30:50.299Z",
        updatedAt: "2024-09-15T23:48:21.656Z",
        __v: 0
    },
    name: "HomTestShop",
    image_url: "https://thumbs.dreamstime.com/b/vegetables-diet-food-background-vector-raw-vegetable-foods-healthy-seamless-pattern-organic-vegetarian-natural-83292835.jpg?w=768",
    contact: [
        "HomTestContact"
    ],
    address: "HomTestAddress",
    product: [
        "66f13ff8061d66ce8ab4cc56",
        "66f14000061d66ce8ab4cc5e"
    ],
    createdAt: "2024-09-21T03:22:34.973Z"
}

const transformedShop = {
  id: shop._id,
  name: shop.name,
  owner: shop.user_id.username, // Using the username from user_id as the owner
  description: "This is the description for the shop Hope you have a nice day na krub please review 5 star for our product", // Assuming you want a static description
  contact: shop.contact, 
  address: shop.address
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
    if (sortOption === "sold-most") return b.sold - a.sold;
    if (sortOption === "sold-least") return a.sold - b.sold;
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
      <ShopCard shop={transformedShop} manage={false} />

      {/* Tabs, Filter, Search */}
      <div className="flex w-full justify-evenly items-center  border-b-2 border-gray-300 ">
        {/* Tabs on the Left */}
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="product category tabs"
          className="flex-1"
        >
          <Tab label="สินค้าทั้งหมด" />
          <Tab label="สินค้ายอดนิยม" />
        </Tabs>
        {/* Sort Filter in the Middle */}
        <div className="flex-1 flex justify-center bg-dark-yellow p-2 items-center gap-8">
          <Select
            value={sortOption}
            onChange={handleSortChange}
            className="min-w-[200px] bg-white"
            displayEmpty
          >
            <MenuItem value="A-Z">เรียงตามตัวอักษร A-Z</MenuItem>
            <MenuItem value="Z-A">เรียงตามตัวอักษร Z-A</MenuItem>
            <MenuItem value="low-high">ราคา: น้อยไปมาก</MenuItem>
            <MenuItem value="high-low">ราคา: มากไปน้อย</MenuItem>
            <MenuItem value="sold-most">ยอดขาย: มากไปน้อย</MenuItem>
            <MenuItem value="sold-least">ยอดขาย: น้อยไปมาก</MenuItem>
          </Select>

          {/* Search Bar on the Right */}
          <Input
            placeholder="ค้นหาสินค้า..."
            onChange={handleSearchChange}
            isClearable
            onClear={() => {
              setSearchQuery("");
            }}
          />
        </div>
      </div>

      {/* Total product count */}
      <div className="tracking-tight">
        จำนวนสินค้า : {displayedProducts.length} รายการ
      </div>

      {/* Product List */}
      <div className="flex flex-col gap-4 lg:grid grid-cols-2 mt-2">
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} product={product} manage={false} />
        ))}
      </div>
      <div className="flex justify-center my-10 space-x-2 w-full">
        <Pagination count={10} size="large" color="primary" />
      </div>
    </div>
  );
}
