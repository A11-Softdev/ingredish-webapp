"use client";

import React, { useEffect,useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  faClock,
  faUser,
  faCommentDots,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RatingBox from "@/components/RatingBox";
import Modal from "@mui/material/Modal";
import ConfirmationModal from "@/components/ConfirmationModal";
import axios from "axios";

export default function Page() {
  const params = useParams<{ id: string }>();
  const [data, setData] = useState(null);
  const [open, setOpen] = React.useState<boolean>(false);

  const handleDelete = async () => {
    alert("Delete post");
  };

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer 427622c2e0ecc5226bd502ac4ea6a27274f569b33b516a2fba680bdae63f9b34371a915404a4e47e0d357f3d9242ead0c9afe1ae6838fddb62131497ef42467d`, // Add the JWT token to the Authorization header
      },
    };
    axios.get(`http://localhost:5050/blogs/${params.id}`,config)
      .then((response) => {
        setData(response.data); 
        console.log("Blog data:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching the blog data:", error);
      });
  }, [params.id]); 
  return (
    <div className="flex flex-row w-3/5 p-10 gap-6 mx-auto b  g-zinc-100">
      <div className="flex flex-col gap-6 w-3/5 ">
        <div className="bg-center max-h-[500px] bg-[url('/imageBox.svg')]">
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
          <p className="font-bold  text-xl mb-2">เครื่องครัว</p>
          <hr className="border-b-1 border-green-500" />
          <ul className="list-decimal mt-2 ml-8 flex flex-col gap-2">
            <li>ไข่ไก่ 20 ฟอง</li>
            <li>ไข่ไก่ 20 ฟอง</li>
            <li>ไข่ไก่ 20 ฟอง</li>
            <li>ไข่ไก่ 20 ฟอง</li>
            <li>ไข่ไก่ 20 ฟอง</li>
          </ul>
        </div>
        <div className="shadow-lg rounded-lg gap-2 p-4">
          <p className="font-bold  text-xl mb-2">วิธีการทำ</p>
          <hr className="border-b-1 border-green-500" />
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
        <div className="p-4 rounded-lg border-black border-2 text-xl">
          Rating : 4.5/5.0
        </div>
        <RatingBox />
        <button
          onClick={() => {}}
          className="px-4 py-2 rounded-lg border-black border-2 hover:border-yellow-500"
        >
          <FontAwesomeIcon className="mr-2" icon={faHeart} /> ถูกใจสูตร
        </button>
        <button
          onClick={() => {}}
          className="px-4 py-2 rounded-lg border-black border-2 hover:border-yellow-500"
        >
          แก้ไขโพสต์
        </button>
        <button
          onClick={() => {
            setOpen(true);
          }}
          className="px-4 py-2 rounded-lg border-black border-2 hover:border-yellow-500"
        >
          ลบโพสต์
        </button>
      </div>
      <ConfirmationModal title="ต้องการที่จะลบโพสต์ใช่หรือไม่" open={open} setOpen={setOpen} handleSubmit={handleDelete}></ConfirmationModal>
    </div>
  );
}
