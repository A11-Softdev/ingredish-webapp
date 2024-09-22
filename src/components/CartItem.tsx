"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
interface Props {
  name: string;
  price: number;
  store: string;
  img: string;
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  onDelete: () => void;  // Add onDelete prop
}

function CartItem({ name, price, store, img, quantity, onQuantityChange, onDelete }: Props) {
  const [inputValue, setInputValue] = useState<number>(quantity);

  const handleDecrement = () => {
    if (inputValue > 1) {
      const newQuantity = inputValue - 1;
      setInputValue(newQuantity);
      onQuantityChange(newQuantity);
    }
  };

  const handleIncrement = () => {
    const newQuantity = inputValue + 1;
    setInputValue(newQuantity);
    onQuantityChange(newQuantity);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      setInputValue(newQuantity);
      onQuantityChange(newQuantity);
    }
  };

  return (
    <div className="flex w-full border border-[#EDB307] bg-white rounded-lg p-4 shadow-lg justify-between items-center">
      <div className="w-[160px] h-full rounded-lg flex gap-2 justify-center">
        <img
          src={img}
          alt="product image"
          className="max-h-[160px] object-cover rounded-lg"
        />
      </div>
      <div className="ml-4 w-[50%] flex flex-col gap-2">
        <div className="text-xl font-bold">{name}</div>
        <div className="">ร้าน : {store}</div>
        <div className="flex w-full items-center">
          <button
            className="bg-[#EDB307] rounded-full w-[35px] h-[35px] text-red-600"
            onClick={handleDecrement}
          >
            -
          </button>
          <input
            className="mx-4 w-1/5 border border-[#EDB307] text-center shadow-lg rounded-lg"
            value={inputValue}
            onChange={handleInputChange}
            type="number"
          />
          <button
            className="bg-[#EDB307] rounded-full w-[35px] h-[35px] text-green-600"
            onClick={handleIncrement}
          >
            +
          </button>
        </div>
      </div>
      <div className="ml-auto text-2xl font-bold text-[#EDB307] ">{price * inputValue} ฿</div>
      {/* Delete Button */}
      <button
        className="ml-4 bg-red-500 text-white p-3 rounded-lg shadow-lg"
        onClick={onDelete}  // Call onDelete when clicked
      >
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
    </div>
  );
}

export default CartItem;
