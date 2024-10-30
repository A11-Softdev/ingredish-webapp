'use client';

import React, { useState, useEffect } from 'react';
import ShopCard from '@/components/ShopCard';
import axios from 'axios';
import Cookies from "js-cookie";
import { config } from 'process';

export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [data, setData] = useState<any>();
  const [quantity, setQuantity] = useState(20);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shop, setShop] = useState<any>();
  const [products, setProducts] = useState<any[]>([]);
  const [transformedShop, setTransformedShop] = useState<any>();

  const token = Cookies.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

  useEffect(() => {
    axios
      .get(`http://localhost:5050/products/${id}`, config)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, [id]); // Adding dependency array to prevent multiple requests

  useEffect(() => {
    if (data?.shopId?._id) {
      axios
        .get(`http://localhost:5050/shops/${data.shopId._id}`)
        .then((response) => {
          setShop(response.data);
          setProducts(response.data.product || []);
          setTransformedShop({
            id: response.data._id,
            name: response.data.name,
            owner: response.data.user.username,
            contact: response.data.contact,
            address: response.data.address,
            image_url: response.data.image_url
          });
        })
        .catch((error) => {
          console.error("Error fetching shop data:", error);
          alert("Error fetching shop data");
        });
    }
  }, [data?.shopId?._id]); // Only call this effect if shopId is available

  console.log(shop)

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };

  const handleAddToCart = (productId: string, amount: number) => {
    // Function to handle adding to cart
    axios
      .patch(`http://localhost:5050/carts/my-cart/setProduct`, {
        productId,
        amount,
      }, config)
      .then((response) => {
        console.log("Product added to cart:", response.data);
        setIsModalOpen(true); // Show the modal when the product is successfully added
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
      });
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-5xl w-full">
        {/* Shop Card Section */}
        <div className="mb-6 flex">
          {transformedShop && <ShopCard shop={transformedShop} manage={false} />}
        </div>

        {/* Product Section */}
        <div className="flex justify-between">
          {/* Image Section */}
          <div className="w-1/3 flex justify-center mb-6">
            {data?.image_url ? (
              <img
                src={data.image_url}
                alt="Product Image"
                className="w-48 h-48 rounded-md object-cover"
              />
            ) : (
              <div className="w-48 h-48 rounded-md bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">No Image Available</span>
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="w-2/3 space-y-4">
            {/* Product Name */}
            <div className="grid grid-cols-2 gap-4">
              <label className="text-gray-700 font-semibold text-lg">ชื่อสินค้า</label>
              <p className="text-gray-700 font-medium text-lg">{data?.name}</p>
            </div>

            {/* Product Description */}
            <div className="grid grid-cols-2 gap-4">
              <label className="text-gray-700 font-semibold text-lg">รายละเอียดสินค้า</label>
              <p className="text-gray-500">
                {data?.description}
              </p>
            </div>

            {/* Stock and Price */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold text-lg">จำนวนที่มีอยู่</label>
                <p className="text-gray-700">{data?.amount}</p>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold text-lg">ราคาขาย/หน่วย</label>
                <p className="text-gray-700">{data?.price}</p>
              </div>
            </div>

            {/* Quantity Input */}
            <div className="grid grid-cols-2 gap-4 items-center">
              <label className="text-gray-700 font-semibold text-lg">จำนวนที่ต้องการซื้อ</label>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-20 p-2 border border-gray-300 rounded-md text-center"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={() => handleAddToCart(data?._id, quantity)} 
                className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-md shadow-md"
              >
                เพิ่มไปยังตะกร้า
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-md">
                ซื้อเลย!
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Add to Cart */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 text-center shadow-lg max-w-sm w-full">
            <div className="mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto text-green-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-4">นำเข้าสู่ตะกร้าแล้ว</h2>
            <button
              onClick={closeModal} // Close modal on click
              className="text-3xl text-gray-500 hover:text-red-500"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
