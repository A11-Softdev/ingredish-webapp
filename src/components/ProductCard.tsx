import React, { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import Modal from "@mui/material/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  img: string;
  name: string;
  description: string;
  sold: number;
  amount: number;
  price: number;
}

export default function ProductCard({ product,manage }: { product: Product,manage:boolean }) {
  const [open, setOpen] = React.useState<boolean>(false);
  const router = useRouter();
  const handleOpen = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent event from bubbling up
    setOpen(true);
  };
  const handleClose = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent event from bubbling up
    setOpen(false);
  };
  const handleViewProduct = (id: string) => {
    router.push(`/product/${id}`);
  };

  const handleDeleteClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevents click event from bubbling up to the parent
    setOpen(true); // Show modal
  };

  const handleDropdownClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevents click event from bubbling up to the parent
  };
  return (
    <div
      className="relative border border-black rounded-xl p-3 flex gap-4 max-h-[200px] bg-white hover:cursor-pointer hover:bg-yellow-50"
      onClick={() => handleViewProduct(product.id)}
    >
      {/* Image container */}
      <div className="max-w-40 h-full">
        <img
          src={product.img}
          alt="product image"
          className="object-cover h-full rounded-lg"
        />
      </div>
      {/* product info */}
      <div className="flex flex-col">
        <span className="text-2xl font-bold">{product.name}</span>
        <span className="text-ellipsis overflow-hidden whitespace-nowrap">
          {product.description}
        </span>
        <span>จำนวนที่ขายได้ : {product.sold}</span>
        <span>จำนวนคงเหลือ : {product.amount}</span>
        <span className="text-lg font-bold">ราคา {product.price} บาท</span>
      </div>
      {/* Dropdown */}
      {manage &&(
      <div className="absolute top-4 right-4">
        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered" className="bg-dark-yellow p-0 min-w-9">
              <FontAwesomeIcon icon={faEllipsis} />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem
              key="edit"
              onClick={() => {
                alert(product.id);
              }}
            >
              <FontAwesomeIcon icon={faPenToSquare} className="mr-3" />
              แก้ไข
            </DropdownItem>
            <DropdownItem
              key="delete"
              className="text-danger"
              onClick={handleOpen}
            >
              <FontAwesomeIcon icon={faTrashCan} className="mr-3" />
              ลบ
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      )}
      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          className="flex justify-center items-center w-full h-full"
          onClick={(e) => e.stopPropagation()} // Prevent clicks from bubbling
        >
          <div
            className="w-[500px] py-6 bg-white flex flex-col gap-6 rounded-lg border-2 border-black"
            onClick={(e) => e.stopPropagation()} // Prevent modal content clicks from propagating
          >
            <p className="text-center text-xl font-bold">
              ต้องการที่จะลบสินค้านี้ใช่หรือไม่
            </p>
            <div className="flex gap-6 w-full justify-evenly">
              <button className="px-4 py-1 bg-yellow-300 hover:bg-[#F1C339] font-bold rounded-md">
                ยืนยัน
              </button>
              <button
                className="px-4 py-1 bg-[#4D4D4E] hover:bg-[#39393a] font-bold rounded-md text-white"
                onClick={(e) => {
                  e.stopPropagation(); // Stop the event from propagating
                  setOpen(false);
                }}
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
