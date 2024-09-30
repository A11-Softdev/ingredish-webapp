"use client";
import React, { useState } from "react";
import axios from "axios";
import { Input } from "@nextui-org/react";
import { Select, MenuItem, SelectChangeEvent, Tab, Tabs } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import ShopCard from "@/components/ShopCard";
import ProductCard from "@/components/ProductCard";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [tabValue, setTabValue] = useState(0); // 0 for all products, 1 for adding product
  const [sortOption, setSortOption] = useState("A-Z"); // Sort option
  const [searchQuery, setSearchQuery] = useState("");
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    amount: 0,
    price: 0,
    unit: "",
    additionalDescription: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null); // For image preview
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    amount: "",
    price: "",
    unit: "",
    image: "",
  });

  const router = useRouter();
  const shop = {
    id: "1234",
    name: "Shikanoko",
    owner: "Takanoko",
    description: "Shikanoko Shikanoko Shikanoko Shikanoko Shikanoko Shikanoko",
    contact: "contact",
    address:
      "123/456 Shikanoko town Shikanoko city Shikanoko country Shikanoko 12345",
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
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    setSortOption(event.target.value as string);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setProductForm({ ...productForm, [name]: value });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const validateForm = () => {
    const newErrors = {
      name: "",
      description: "",
      amount: "",
      price: "",
      unit: "",
      image: "",
    };

    let isValid = true;

    if (!productForm.name) {
      newErrors.name = "Product name is required.";
      isValid = false;
    }

    if (!productForm.description) {
      newErrors.description = "Product description is required.";
      isValid = false;
    }

    if (!productForm.amount || productForm.amount <= 0) {
      newErrors.amount = "Amount must be greater than 0.";
      isValid = false;
    }

    if (!productForm.price || productForm.price <= 0) {
      newErrors.price = "Price must be greater than 0.";
      isValid = false;
    }

    if (!productForm.unit) {
      newErrors.unit = "Unit is required.";
      isValid = false;
    }

    if (!imageFile) {
      newErrors.image = "Please upload an image.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const resetForm = (event: React.FormEvent) => {
    event.preventDefault();
    setProductForm({
      name: "",
      description: "",
      amount: 0,
      price: 0,
      unit: "",
      additionalDescription: "",
    });
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Send the product form data via JSON
    const productData = {
      ...productForm,
      image: imageFile?.name, // sending image file name along with the form data
    };

    try {
      // Check if an image file exists before uploading
      let uploadedImageUrl = "";

      if (imageFile) {
        const imageData = new FormData();
        imageData.append("image", imageFile); // Only append the file if it's not null
        console.log("Image data:", imageData);
        console.log("Product data:", productData);

        // Upload image file first (assuming a separate image upload API)
        const imageResponse = await axios.post("/api/upload-image", imageData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (imageResponse.status === 200) {
          uploadedImageUrl = imageResponse.data.url; // Get the uploaded image URL
        } else {
          throw new Error("Image upload failed");
        }
      }

      // Then submit the product form with the uploaded image URL
      const response = await axios.post("/api/products", {
        ...productData,
        imageUrl: uploadedImageUrl, // Attach the image URL to the product data
      });

      if (response.status === 200) {
        alert("Product added successfully!");
        // Reset form after successful submission
        setProductForm({
          name: "",
          description: "",
          amount: 0,
          price: 0,
          unit: "",
          additionalDescription: "",
        });
        setImageFile(null);
        setImagePreview(null);
      }
    } catch (error) {
      console.error("Error submitting product:", error);
      alert("Error submitting product.");
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "A-Z") return a.name.localeCompare(b.name);
    if (sortOption === "Z-A") return b.name.localeCompare(a.name);
    if (sortOption === "low-high") return a.price - b.price;
    if (sortOption === "high-low") return b.price - a.price;
    if (sortOption === "sold-most") return b.sold - a.sold;
    if (sortOption === "sold-least") return a.sold - b.sold;
    return 0;
  });

  return (
    <div className="flex w-[85vw] min-h-[81vh] mx-auto bg-background flex-col">
      <ShopCard shop={shop} manage={true} />

      <div className="flex w-full justify-evenly items-center border-b-2 border-gray-300">
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="product category tabs"
          className="flex-1"
        >
          <Tab label="สินค้าทั้งหมด" />
          <Tab label="เพิ่มสินค้า" />
          <div
            onClick={() => {
              router.push(`/shop/manage/${shop.id}`);
            }}
            className="px-4 py-3 ml-4 hover:cursor-pointer hover:bg-[#fff6c2] tracking-tight text-[16px]"
          >
            ดู Orders
          </div>
        </Tabs>

        <div className="flex-1 flex justify-center bg-dark-yellow p-2 items-center gap-8 rounded-lg">
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

          <Input
            placeholder="ค้นหาสินค้า..."
            onChange={handleSearchChange}
            isClearable
            onClear={() => setSearchQuery("")}
          />
        </div>
      </div>

      {tabValue === 0 ? (
        <>
          <div className="tracking-tight">
            จำนวนสินค้า : {sortedProducts.length} รายการ
          </div>
          <div className="flex flex-col gap-4 lg:grid grid-cols-2 mt-2">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} manage={true} />
            ))}
          </div>
          <div className="flex justify-center my-10 space-x-2 w-full">
            <Pagination count={10} size="large" color="primary" />
          </div>
        </>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-row gap-6 w-full justify-center"
        >
          <div className="flex flex-col h-full justify-center items-center m-4 mt-6">
            <input
              type="file"
              hidden
              id="fileInput"
              onChange={handleImageUpload}
            />
            <label
              htmlFor="fileInput"
              className="w-[300px] h-[300px] bg-gray-300 rounded-lg flex flex-col justify-center items-center cursor-pointer relative"
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Image preview"
                  className="w-full h-full object-contain rounded-lg"
                />
              ) : (
                <>
                  <span className="text-3xl font-bold text-black">+</span>
                </>
              )}
              <span className="absolute bottom-0 text-white rounded-b-lg bg-black bg-opacity-70 w-full text-center py-1">
                เลือกรูปภาพ
              </span>
            </label>
            {errors.image && (
              <span className="text-red-500 mt-1">{errors.image}</span>
            )}
          </div>

          <div className="mt-5 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label>ชื่อสินค้า</label>
              <input
                type="text"
                name="name"
                value={productForm.name}
                onChange={handleInputChange}
                className={`border p-2 rounded-md ${
                  errors.name ? "border-red-500" : ""
                }`}
              />
              {errors.name && (
                <span className="text-red-500 mt-1">{errors.name}</span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label>รายละเอียดสินค้า</label>
              <input
                type="text"
                name="description"
                value={productForm.description}
                onChange={handleInputChange}
                className={`border p-2 rounded-md ${
                  errors.description ? "border-red-500" : ""
                }`}
              />
              {errors.description && (
                <span className="text-red-500 mt-1">{errors.description}</span>
              )}
            </div>

            <div className="flex flex-row gap-4">
              <div className="flex flex-col gap-1">
                <label>จำนวนสินค้า</label>
                <input
                  type="number"
                  name="amount"
                  value={productForm.amount}
                  onChange={handleInputChange}
                  className={`border p-2 rounded-md ${
                    errors.amount ? "border-red-500" : ""
                  }`}
                />
                {errors.amount && (
                  <span className="text-red-500 mt-1">{errors.amount}</span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label>ราคา</label>
                <input
                  type="number"
                  name="price"
                  value={productForm.price}
                  onChange={handleInputChange}
                  className={`border p-2 rounded-md ${
                    errors.price ? "border-red-500" : ""
                  }`}
                />
                {errors.price && (
                  <span className="text-red-500 mt-1">{errors.price}</span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label>หน่วยการขาย</label>
                <input
                  type="text"
                  name="unit"
                  value={productForm.unit}
                  onChange={handleInputChange}
                  className={`border p-2 rounded-md ${
                    errors.unit ? "border-red-500" : ""
                  }`}
                />
                {errors.unit && (
                  <span className="text-red-500 mt-1">{errors.unit}</span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label>คำอธิบาย</label>
              <textarea
                name="additionalDescription"
                value={productForm.additionalDescription}
                onChange={handleInputChange}
                className="border p-2 rounded-md"
              />
            </div>

            <div className="mt-4 flex justify-end gap-12 mb-6">
              <button
                type="submit"
                className="bg-success hover:bg-[#94c45d] text-white font-bold py-4 px-6 rounded"
              >
                Create
              </button>
              <button
                className="bg-red-500 hover:bg-red-300 text-white font-bold py-4 px-6 rounded"
                onClick={resetForm}
              >
                Reset
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
