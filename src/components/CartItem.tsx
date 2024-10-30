"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import ConfirmationModal from "./ConfirmationModal";

type Props = {
  name: string;
  price: number;
  store: string;
  img: string;
  quantity: number;
  productId: string;
  
  onQuantityChange: (productId: string, newQuantity: number) => void;
  onDelete: (productId: string) => void;
  stock: number;
};

function CartItem({ name, price, store, img, quantity, productId, onQuantityChange, onDelete, stock }: Props) {
  const [inputValue, setInputValue] = useState<string>(quantity.toString());
  const [isRemoveModalOpen, setRemoveModalOpen] = useState(false);
  const [previousQuantity, setPreviousQuantity] = useState<number | null>(null);

  const handleDecrement = () => {
    const currentQuantity = parseInt(inputValue) || 1;
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;
      setInputValue(newQuantity.toString());
      onQuantityChange(productId, newQuantity);
    } else {
      setPreviousQuantity(currentQuantity);
      setRemoveModalOpen(true);
    }
  };

  const handleIncrement = () => {
    const currentQuantity = parseInt(inputValue) || 0;
    if (currentQuantity + 1 <= stock) {
      const newQuantity = currentQuantity + 1;
      setInputValue(newQuantity.toString());
      onQuantityChange(productId, newQuantity);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setInputValue(value);
    }
  };

  const handleBlur = () => {
    const currentQuantity = parseInt(inputValue);
    if (!inputValue || currentQuantity === 0) {
      console.log(0);
      setPreviousQuantity(1); // Set previous to 1 as fallback
      setRemoveModalOpen(true); // Open confirmation modal if value is 0
    } else if (currentQuantity > stock) {
      setInputValue(stock.toString());
      onQuantityChange(productId, stock);
    } else {
      onQuantityChange(productId, currentQuantity);
    }
  };

  const confirmRemove = async () => {
    onDelete(productId);
    setRemoveModalOpen(false);
  };

  const cancelRemove = () => {
    // Set input back to 1 if the user cancels the deletion
    setInputValue("1");
    console.log(1);
    onQuantityChange(productId, 1);
    setRemoveModalOpen(false);
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
        <div>ร้าน : {store}</div>
        <div className="flex w-full items-center">
          <button
            className="bg-[#EDB307] rounded-full w-[35px] h-[35px] text-red-600 text-2xl font-extrabold"
            onClick={handleDecrement}
          >
            -
          </button>
          <input
            className="mx-4 w-1/5 border border-[#EDB307] text-center shadow-lg rounded-lg"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleBlur}
            type="text"
          />
          <button
            className="bg-[#EDB307] rounded-full w-[35px] h-[35px] text-green-600 text-2xl font-extrabold"
            onClick={handleIncrement}
          >
            +
          </button>
        </div>
      </div>
      <div className="ml-auto text-2xl font-bold text-[#EDB307]">{price * (parseInt(inputValue) || 0)} ฿</div>
      {/* Delete Button */}
      <button
        className="ml-4 bg-red-500 text-white p-3 rounded-lg shadow-lg"
        onClick={() => {
          setPreviousQuantity(0);
          setRemoveModalOpen(true);
        }}
      >
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
      {/* Confirmation Modal for Remove or Delete */}
      <ConfirmationModal
        title="จะลบสินค้าในตะกร้าหรือไม่?"
        open={isRemoveModalOpen}
        setOpen={setRemoveModalOpen}
        handleSubmit={confirmRemove}
        handleCancel={cancelRemove}
      />
    </div>
  );
}

export default CartItem;
