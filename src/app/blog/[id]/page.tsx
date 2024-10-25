"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
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

interface Recipe {
  IsGenerated: boolean;
  _id: string;
  user_id: string;
  name: string;
  Role: string;
  image_url: string;
  serve: number;
  ingredient: string[];
  kitchentools: string[];
  recipe: string[];
  review: string[];
  createdAt: string;
}

export default function Page() {
  const params = useParams<{ id: string }>();
  const [data, setData] = useState<Recipe>();
  const [open, setOpen] = React.useState<boolean>(false);
  const router = useRouter();

  const handleDelete = async () => {
    alert("Delete post");
    // Delete the blog post using axios.
    axios
      .delete(`http://localhost:5050/blogs/${params.id}`)
      .then((response) => {})
      .catch((error) => {
        console.error("Error deleting the blog post:", error);
      });
    setOpen(false);

    router.push("/");
  };

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer 427622c2e0ecc5226bd502ac4ea6a27274f569b33b516a2fba680bdae63f9b34371a915404a4e47e0d357f3d9242ead0c9afe1ae6838fddb62131497ef42467d`, // Add the JWT token to the Authorization header
      },
    };

    const formatDateToThai = (dateString: string): string => {
      const date = new Date(dateString);
      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      };
      return new Intl.DateTimeFormat("th-TH", options).format(date);
    };

    axios
      .get(`http://localhost:5050/blogs/${params.id}`, config)
      .then((response) => {
        const updatedData = {
          ...response.data,
          createdAt: formatDateToThai(response.data.createdAt),
        };
        setData(updatedData);
        console.log(updatedData);
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
              data?.image_url
                ? data?.image_url
                : "https://www.maggi.co.th/sites/default/files/styles/home_stage_944_531/public/srh_recipes/a1b6cab9710d963ab0d30f62e5d3a88a.jpeg?h=b6717701&itok=ygShKDIs"
            }
            alt={"Food Image"}
          ></img>
        </div>
        <div className="shadow-lg text-2xl font-bold rounded-lg p-4">
          {data?.name}
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
              <p className="text-gray-500">โพสต์เมื่อ {data?.createdAt}</p>
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
              {data?.serve} นาที
            </div>
            <div>
              <FontAwesomeIcon
                icon={faUser}
                width={30}
                className="text-[#F1C339]"
              />
              {data?.serve} คนทาน
            </div>
          </div>
          <ul className="list-decimal mt-2 ml-8 flex flex-col gap-2">
            {data?.ingredient.map((ingredient) => (
              <li>{ingredient}</li>
            ))}
          </ul>
        </div>
        <div className="shadow-lg rounded-lg gap-2 p-4">
          <p className="font-bold  text-xl mb-2">เครื่องครัว</p>
          <hr className="border-b-1 border-green-500" />
          <ul className="list-decimal mt-2 ml-8 flex flex-col gap-2">
            {data?.kitchentools.map((kitchentool) => (
              <li>{kitchentool}</li>
            ))}
          </ul>
        </div>
        <div className="shadow-lg rounded-lg gap-2 p-4">
          <p className="font-bold  text-xl mb-2">วิธีการทำ</p>
          <hr className="border-b-1 border-green-500" />
          <ul className="list-decimal mt-2 ml-8 flex flex-col gap-2">
            {data?.recipe.map((recipe) => (
              <li>{recipe}</li>
            ))}
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
            {data?.review.map((review, index) => (
              <div key={index} className="flex flex-row gap-4">
                <div>
                  <img
                    src="/profile.webp"
                    alt="profile image"
                    width={50}
                    className="rounded-3xl shadow-xl"
                  />
                </div>

                <div className="flex flex-col w-full max-w-xl">
                  <div className="flex flex-col bg-white border-black border-2 p-2 rounded-md">
                    <div className="text-[22px]">JoJo JoStar</div>
                    <div>อาหารอร่อยมากครับ อยากให้ทำเมนูอื่นๆด้วยครับ</div>
                    <button className="flex self-end">ตอบกลับ</button>
                  </div>
                  <div className="ml-2 mt-1">3 ชม.ที่แล้ว</div>
                </div>
              </div>
            ))}
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
        {/* if user is owner of blog */}
        {data?.user_id === "66e3a3da9c7c2fe955645c8c" && (
          <>
            <button
              onClick={() => {
                router.push(`/blog/${params.id}/edit`);
              }}
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
          </>
        )}
      </div>
      <ConfirmationModal
        title="ต้องการที่จะลบโพสต์ใช่หรือไม่"
        open={open}
        setOpen={setOpen}
        handleSubmit={handleDelete}
      ></ConfirmationModal>
    </div>
  );
}
