"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "@nextui-org/react";
import { Tab, Tabs, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import ShopCard from "@/components/ShopCard";
import { useRouter } from "next/navigation";

export default function Page() {
  const params = useParams<{ id: string }>();
  const [tabValue, setTabValue] = useState(0); // 0 for all products, 1 for popular
  const [sortOption, setSortOption] = useState("A-Z"); // Sort option
  const [searchQuery, setSearchQuery] = useState("");
  const [shop, setShop] = useState<any>();
  const [transformedShop, setTransformedShop] = useState<any>();
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [sortedProducts, setSortedProducts] = useState<any[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/shops/${params.id}`)
      .then((response) => {
        setShop(response.data);
        setProducts(response.data.product || []);
        setTransformedShop({
          id: response.data._id,
          name: response.data.name,
          owner: response.data.user.username,
          contact: response.data.contact,
          address: response.data.address,
        });
      })
      .catch((error) => {
        console.error("Error fetching shop data:", error);
        alert("Error fetching shop data");
      });
  }, [params.id]);

  // Filter products by search query
  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, products]);

  // Sort products based on selected option
  useEffect(() => {
    setSortedProducts(
      [...filteredProducts].sort((a, b) => {
        if (sortOption === "A-Z") return a.name.localeCompare(b.name);
        if (sortOption === "Z-A") return b.name.localeCompare(a.name);
        if (sortOption === "low-high") return a.price - b.price;
        if (sortOption === "high-low") return b.price - a.price;
        if (sortOption === "sold-most") return b.sold - a.sold;
        if (sortOption === "sold-least") return a.sold - b.sold;
        return 0;
      })
    );
  }, [sortOption, filteredProducts]);

  // Filter by tab selection (All or Popular)
  useEffect(() => {
    setDisplayedProducts(
      sortedProducts.filter((product) => {
        if (tabValue === 1) return product.sold > 50; // Popular items filter
        return true; // All items
      })
    );
  }, [tabValue, sortedProducts]);

  // Event Handlers
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    setSortOption(event.target.value as string);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Calculate the products to display based on the current page
  const paginatedProducts = displayedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Calculate total pages
  const totalPages = Math.ceil(displayedProducts.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex w-[85vw] min-h-[81vh] mx-auto bg-background flex-col">
      {/* shop-detail */}
      {transformedShop && <ShopCard shop={transformedShop} manage={false} />}

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
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          size="large"
          color="primary"
        />
      </div>
    </div>
  );
}
