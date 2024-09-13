"use client";

import React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  faClock,
  faUser,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Page() {
  const params = useParams<{ postId: string }>();
  return (
    <div className="flex flex-row w-3/5 p-10 gap-6 mx-auto b  g-zinc-100">
      <div className="flex flex-col gap-6 w-3/5 ">
        <div className="bg-center max-h-[500px] bg-white">
          <img
          className="w-full object-contain bg-center h-full"
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBe3aCKZdDJfdiCwyZCfUUXyuyC2nAd44ouw&s"
            }
            alt={"Food Image"}
          ></img>
        </div>
        <div className="shadow-lg text-2xl font-bold rounded-lg p-4">
          ข้าวไข่ข้นปู
        </div>
        <div className="shadow-lg  rounded-lg p-4">
          <div className="flex flex-row items-center gap-2">
            <div>
              <img
                src="/profile.webp"
                alt="profile image"
                width={50}
                className="rounded-3xl"
              />
            </div>
            <div className="flex flex-col ">
              <p className="text-2xl font-bold">ณัฐริกา เจ็กสูงเนิน</p>
              <p className="text-gray-500">โพสต์วันที่ 25 มกราคม 2547</p>
            </div>
          </div>
          <p className="mt-2">ข้าวไข่ข้นปูนุ่มๆ ละมุนลิ้นกลิ่นผลไม้</p>
        </div>
        <div className="flex flex-col gap-2 p-4 shadow-lg rounded-lg">
          <p className="font-bold  text-xl">ส่วนผสม</p>{" "}
          <hr className="border-b-1 border-green-500" />
          <div className="flex gap-4">
            <div>
              <FontAwesomeIcon
                icon={faClock}
                width={30}
                className="text-[#F1C339]"
              />
              30 นาที
            </div>
            <div>
              <FontAwesomeIcon
                icon={faUser}
                width={30}
                className="text-[#F1C339]"
              />
              1 คนทาน
            </div>
          </div>
          <ul className="list-decimal mt-2 ml-8 flex flex-col gap-2">
            <li>ไข่ไก่ 20 ฟอง</li>
            <li>ไข่ไก่ 20 ฟอง</li>
            <li>ไข่ไก่ 20 ฟอง</li>
            <li>ไข่ไก่ 20 ฟอง</li>
            <li>ไข่ไก่ 20 ฟอง</li>
          </ul>
        </div>
        <div className="shadow-lg rounded-lg gap-2 p-4">
          <p className="font-bold  text-xl">วิธีการทำ</p>
          <ul className="list-decimal mt-2 ml-8 flex flex-col gap-2">
            <li>ไข่ไก่ 20 ฟอง</li>
            <li>ไข่ไก่ 20 ฟอง</li>
            <li>ไข่ไก่ 20 ฟอง</li>
            <li>ไข่ไก่ 20 ฟอง</li>
            <li>ไข่ไก่ 20 ฟอง</li>
            </ul>
        </div>
        {/* Comment box*/}
        <div className="shadow-lg rounded-lg gap-3 p-4 bg-[#F1C339]">
          <div className="flex flex-row gap-2 items-center">
            <FontAwesomeIcon
              icon={faCommentDots}
              width={30}
              className="text-2xl"
            />
            <p className="font-bold  text-xl">ความคิดเห็น</p>
          </div>
          {/* Comment fetch section*/}
          <div className="flex flex-col mt-4">
            {/* each comment */}
            <div className="flex flex-row gap-4">
              <div className="">
                <img
                  src="/profile.webp"
                  alt="profile image"
                  width={50}
                  className="rounded-3xl shadow-xl"
                />
              </div>

              <div className="flex flex-col w-full max-w-xl">
                <div className="flex flex-col bg-white border-black border-2 p-2 rounded-md ">
                  <div className="text-[22px]">JoJo JoStar</div>
                  <div>
                    อาหารอร่อยมาก อาหารอร่อยมาก อาหารอร่อยมาก อาหารอร่อยมาก
                    อาหารอร่อยมาก อาหารอร่อยมาก อาหารอร่อยมาก
                    อาหารอร่อยมากอาหารอร่อยมาก อาหารอร่อยมาก อาหารอร่อยมาก
                    อาหารอร่อยมากอาหารอร่อยมาก อาหารอร่อยมาก อาหารอร่อยมาก
                    อาหารอร่อยมากอาหารอร่อยมาก อาหารอร่อยมาก อาหารอร่อยมาก
                    อาหารอร่อยมาก
                  </div>
                  <button className="flex self-end">ตอบกลับ</button>
                </div>
                <div className="ml-2 mt-1">3 ชม.ที่แล้ว</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 grow">
        <div
          onClick={() => {
            alert("Hello");
          }}
        >
          {" "}
          Rating : 4.5/5.0
        </div>
        <a>rate 1 2 3 4 5</a>
        <button
          onClick={() => {}}
          className="`px-4 py-2 rounded-lg border-black border-2 hover:border-yellow-500"
        >
          แก้ไขโพสต์
        </button>
        <button
          onClick={() => {}}
          className="`px-4 py-2 rounded-lg border-black border-2 hover:border-yellow-500"
        >
          ลบโพสต์
        </button>
      </div>
    </div>
  );
}
