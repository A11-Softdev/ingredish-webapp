import React from "react";
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

interface Props {
  id: string;
  img: string;
  name: string;
  description: string;
  sold: number;
  amount: number;
  price: number;
}

export default function ProductCard({ product }: { product: Props }) {
  const [open, setOpen] = React.useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
              onClick={() => {
                console.log("delete")
                setOpen(true);
              }}
            >
              <FontAwesomeIcon icon={faTrashCan} className="mr-3" />
              ลบ
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="flex justify-center items-center w-full h-full">
          <div className="w-[500px] py-6 bg-white flex flex-col gap-6 rounded-lg border-2 border-black">
            <p className="text-center text-xl font-bold">
              ต้องการที่จะลบสินค้านี้ใช่หรือไม่
            </p>
            <div className="flex gap-6 w-full justify-evenly">
              <button className="px-4 py-1 bg-yellow-300 hover:bg-[#F1C339] font-bold rounded-md">
                ยืนยัน
              </button>
              <button
                className="px-4 py-1 bg-[#4D4D4E] hover:bg-[#39393a] font-bold rounded-md text-white"
                onClick={() => {
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
