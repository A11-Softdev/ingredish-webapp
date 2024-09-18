import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

interface Props {
  img: string;
  name: string;
  description: string;
  sold: number;
  amount: number;
  price: number;
}

export default function ProductCard({ product }: { product: Props }) {
  return (
    <div className="relative border border-black p-3 flex gap-4 bg-white hover:cursor-pointer hover:bg-yellow-50">
      {/* Image container */}
      <div className="max-w-40 h-full">
        <img
          src={product.img}
          alt="product image"
          className="object-cover h-full"
        />
      </div>
      {/* product info */}
      <div className="flex flex-col">
        <span className="text-2xl font-bold">{product.name}</span>
        <span>{product.description}</span>
        <span>จำนวนที่ขายได้ : {product.sold}</span>
        <span>จำนวนคงเหลือ : {product.amount}</span>
        <span className="text-lg font-bold">ราคา {product.price} บาท</span>
      </div>
      <div className="absolute top-4 right-4">
      <Dropdown >
        <DropdownTrigger >
          <Button variant="bordered" className="bg-dark-yellow p-0 min-w-9"><FontAwesomeIcon icon={faEllipsis} /></Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem key="edit">
            <FontAwesomeIcon icon={faPenToSquare} className="mr-3" />
            แก้ไข
          </DropdownItem>
          <DropdownItem
            key="delete"
            className="text-danger"
          >
            <FontAwesomeIcon icon={faTrashCan} className="mr-3"/>
            ลบ
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      </div>
    </div>
  );
}
