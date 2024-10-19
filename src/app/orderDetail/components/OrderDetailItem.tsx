"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
interface Props {
  name: string;
  quantity: number;
  img: string;
}

function OrderDetailItem({ name, img, quantity}: Props) {

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
        <div className="flex w-full items-center">จำนวน : {quantity}</div>
      </div>
    </div>
  );
}

export default OrderDetailItem;
