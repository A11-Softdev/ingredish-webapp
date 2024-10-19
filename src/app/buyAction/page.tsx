'use client';

import React, { useState } from 'react';
import ShopCard from '@/components/ShopCard';

const BuyAction: React.FC = () => {
    const [quantity, setQuantity] = useState(20);
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  
    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuantity(Number(e.target.value));
    };
  
    const handleAddToCart = () => {
      setIsModalOpen(true); // Show the modal when button is clicked
    };
  
    const closeModal = () => {
      setIsModalOpen(false); // Close the modal
    };

  const shop = {
    id: "1234",
    name: "Shikanoko",
    owner: "Takanoko",
    description: "Shikanoko Shikanoko Shikanoko Shikanoko Shikanoko Shikanoko",
    contact: "contact",
    address:
      "123/456 Shikanoko town Shikanoko city Shikanoko country Shikanoko 12345",
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-5xl w-full">
        {/* Shop Card Section */}
        <div className="mb-6 flex">
            <ShopCard shop={shop} manage={false} />
        </div>

        {/* Product Section */}
        <div className="flex justify-between">
          {/* Image Section */}
          <div className="w-1/3 flex justify-center mb-6">
            <img
              src="https://images.healthshots.com/healthshots/en/uploads/2024/01/25225611/tomatoes-1.jpg" // Replace with the actual image URL
              alt="มะเขือเทศ"
              className="w-48 h-48 rounded-md object-cover"
            />
          </div>

          {/* Product Information */}
          <div className="w-2/3 space-y-4">
            {/* Product Name */}
            <div className="grid grid-cols-2 gap-4">
              <label className="text-gray-700 font-semibold text-lg">ชื่อสินค้า</label>
              <p className="text-gray-700 font-medium text-lg">มะเขือเทศ</p>
            </div>

            {/* Product Description */}
            <div className="grid grid-cols-2 gap-4">
              <label className="text-gray-700 font-semibold text-lg">รายละเอียดสินค้า</label>
              <p className="text-gray-500">
                ร้านขายของสด พืชผัก ผลไม้ ตามฤดูกาล, ขายเนื้อหมู เนื้อวัว, ขายอาหารทะเลสด ฯลฯ
              </p>
            </div>

            {/* Stock and Price */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold text-lg">จำนวนที่มีอยู่</label>
                <p className="text-gray-700">100</p>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold text-lg">ราคาขาย/หน่วย</label>
                <p className="text-gray-700">20</p>
              </div>
            </div>

            {/* Unit of Sale */}
            <div className="grid grid-cols-2 gap-4">
              <label className="text-gray-700 font-semibold text-lg">หน่วยการขาย</label>
              <p className="text-gray-700">หน่วย</p>
            </div>

            {/* Explanation */}
            <div className="grid grid-cols-2 gap-4">
              <label className="text-gray-700 font-semibold text-lg">คำอธิบาย</label>
              <p className="text-gray-700">1 หน่วยจะได้มะเขือเทศ 5-6 ลูก</p>
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
                onClick={handleAddToCart} // Handle the add-to-cart click
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
};

export default BuyAction;
