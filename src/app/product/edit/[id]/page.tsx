"use client";
import React, { useState } from "react";
import axios from "axios";
import { Input } from "@nextui-org/react";
import { Select, MenuItem, SelectChangeEvent, Tab, Tabs } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import ShopCard from "@/components/ShopCard";
import ProductCard from "@/components/ProductCard";
import { useRouter } from "next/navigation";
import Modal from "@mui/material/Modal";
import ConfirmationModal from "@/components/ConfirmationModal";

export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [tabValue, setTabValue] = useState(0); // 0 for all products, 1 for adding product
  const [sortOption, setSortOption] = useState("A-Z"); // Sort option
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleSubmit = async (event?: React.FormEvent) => {
    if (event) event.preventDefault();

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
        // alert("submitting product");
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

  return (
    <div className="flex w-[85vw] min-h-[81vh] mx-auto bg-background flex-col">
      <ShopCard shop={shop} manage={true} />
      <p className="flex justify-center text-4xl font-black mb-6">แก้ไขสินค้า</p>
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
              className="bg-success hover:bg-[#94c45d] text-white font-bold py-4 px-6 rounded"
              onClick={(event)=>{
                event.preventDefault();
                setIsModalOpen(true);}}
            >
              แก้ไข
            </button>
            <button
              className="bg-red-500 hover:bg-red-300 text-white font-bold py-4 px-6 rounded"
              onClick={(e)=>{resetForm(e);
              router.push("/shop/1")
              }}
            >
              ยกเลิก
            </button>
          </div>
        </div>
      </form>
      <ConfirmationModal open={isModalOpen} setOpen={setIsModalOpen} handleSubmit={handleSubmit}></ConfirmationModal>
    </div>
  );
}
