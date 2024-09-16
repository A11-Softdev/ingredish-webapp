"use client";

import React, { useState } from "react";
import { Button, Modal } from "@mui/material";
import { useRouter } from "next/navigation";

interface Props {}

const Page = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("John Doe");
  const [email, setEmail] = useState<string>("john.doe@example.com");
  const [address, setAddress] = useState<string>("123 Main St");
  const router = useRouter();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated Name:", name);
    console.log("Updated Email:", email);
    console.log("Updated Address:", address);
    setOpen(false);
    router.push("/profile");
  };

  return (
    <div className="flex flex-col w-full items-center min-h-[82vh] gap-[60px] mt-10">
      <p className="text-4xl font-bold [text-shadow:_0_1px_2px_rgb(0_0_0_/_0.8)]">Edit Your Profile!</p>
      <div className="flex flex-col gap-4 justify-center items-center w-1/5">
        <Button
          variant="contained"
          component="label"
          className="rounded-full w-40 h-40  text-black bg-[#80AA50] whitespace-pre"
        >
          Upload Profile
          <input type="file" hidden accept=".gif,.jpg,.jpeg,.png" />
        </Button>
        <div className="bg-[#F1C339] rounded-lg p-3 w-full flex mt-12">
          <label htmlFor="name" className="font-bold">
            Name:{" "}
          </label>
          <input
            id="name"
            className="bg-[#F1C339] rounded-lg text-black grow ml-2 "
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="bg-[#F1C339] rounded-lg p-3 w-full flex">
          <label htmlFor="email" className="font-bold">
            Email:{" "}
          </label>
          <input
            id="email"
            className="bg-[#F1C339] rounded-lg text-black grow ml-2"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="bg-[#F1C339] rounded-lg p-3 w-full flex">
          <label htmlFor="address" className="font-bold">
            Address:{" "}
          </label>
          <input
            id="address"
            className="bg-[#F1C339] rounded-lg text-black grow ml-2"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
      </div>
      <div className="flex w-1/4 ">
        <div className="flex justify-between w-full">
          <button
            type="button"
            onClick={handleOpen}
            className="bg-[#F1C339] text-black p-4 px-6 font-bold shadow-md rounded-lg hover:bg-[#cca530]"
          >
            Update
          </button>
          <button
            type="button"
            onClick={() => {
              router.push("/profile");
            }}
            className="bg-red-600 shadow-md text-white font-bold p-4 px-6 rounded-lg hover:bg-red-800"
          >
            Cancel
          </button>
        </div>
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
              ต้องการที่จะอัพเดตข้อมูลโปรไฟล์ใช่หรือไม่
            </p>
            <div className="flex gap-6 w-full justify-evenly">
              <button
                className="px-4 py-1 bg-yellow-300 hover:bg-[#F1C339] font-bold rounded-md"
                onClick={handleSubmit}
              >
                ยืนยัน
              </button>
              <button
                className="px-4 py-1 bg-[#4D4D4E] hover:bg-[#39393a] font-bold rounded-md text-white"
                onClick={handleClose}
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Page;
