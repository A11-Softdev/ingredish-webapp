"use client";
import React, { useState, useEffect } from "react";
import { LongCardDataProps } from "../types/LongCardTypes";
import SettingCard from "./SettingCard";
import FavIcon from "./FavIcon";
import { fetchUser } from "../api/getUser";
import Link from "next/link";

type CardProps = {
  card: LongCardDataProps;
  onDelete: (id: string) => void;
};

const LongCard = ({ card, onDelete }: CardProps) => {
  const [username, setUsername] = useState<string>("unknow");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async (id: string) => {
      try {
        setLoading(true);
        const temp = await fetchUser(id);
        console.log("Fetched data:", temp);
        setUsername(temp);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("Failed to load blogs.");
      } finally {
        setLoading(false);
      }
    };
    getUser(card.user_id);
  }, [card.user_id]);
  return (
    <div className="bg-white w-full h-full min-h-28 grid grid-cols-5 border z-0">
      <div className="grid col-span-4 z-0 ml-3 mt-3 ">
        <Link href={`/blog/${card._id}`} key={card._id} className="flex -z-10">
          <div className="text-lg font-semibold">{card.name}</div>
          {card.IsGenerated && (
            <img
              src="/hugeicons_ai-chat-02.png"
              alt="Menu"
              className="size-6 relative -top-2 left-1"
            />
          )}
        </Link>

        <div className="flex">
          {card.ingredient.map((ingre, index) => (
            <p key={ingre} className="mr-1">
              {ingre}
              {index < card.ingredient.length - 1 && " •"}{" "}
              {/* Add " •" only if it's not the last item */}
            </p>
          ))}
        </div>

        <div className="flex text-sm font-normal">
          <div className="flex items-center text-[rgb(136,136,136)] mr-2">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              width="15"
              height="15"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-1"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  opacity="0.5"
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  fill="#888888"
                ></path>{" "}
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 7.25C12.4142 7.25 12.75 7.58579 12.75 8V11.6893L15.0303 13.9697C15.3232 14.2626 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2626 15.3232 13.9697 15.0303L11.4697 12.5303C11.329 12.3897 11.25 12.1989 11.25 12V8C11.25 7.58579 11.5858 7.25 12 7.25Z"
                  fill="#FFFFFF"
                ></path>{" "}
              </g>
            </svg>
            {"1.00 ชม"}
          </div>
          <div className="flex items-center text-[rgb(136,136,136)] mr-2">
            <svg
              fill="#888888"
              width="15"
              height="15"
              viewBox="-32 0 512 512"
              className="mr-1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
              </g>
            </svg>
            {card.serve}
          </div>
          <div className="flex items-center">
            <svg
              width="15px"
              height="15px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#80AA50"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M11.245 4.174C11.4765 3.50808 11.5922 3.17513 11.7634 3.08285C11.9115 3.00298 12.0898 3.00298 12.238 3.08285C12.4091 3.17513 12.5248 3.50808 12.7563 4.174L14.2866 8.57639C14.3525 8.76592 14.3854 8.86068 14.4448 8.93125C14.4972 8.99359 14.5641 9.04218 14.6396 9.07278C14.725 9.10743 14.8253 9.10947 15.0259 9.11356L19.6857 9.20852C20.3906 9.22288 20.743 9.23007 20.8837 9.36432C21.0054 9.48051 21.0605 9.65014 21.0303 9.81569C20.9955 10.007 20.7146 10.2199 20.1528 10.6459L16.4387 13.4616C16.2788 13.5829 16.1989 13.6435 16.1501 13.7217C16.107 13.7909 16.0815 13.8695 16.0757 13.9507C16.0692 14.0427 16.0982 14.1387 16.1563 14.3308L17.506 18.7919C17.7101 19.4667 17.8122 19.8041 17.728 19.9793C17.6551 20.131 17.5108 20.2358 17.344 20.2583C17.1513 20.2842 16.862 20.0829 16.2833 19.6802L12.4576 17.0181C12.2929 16.9035 12.2106 16.8462 12.1211 16.8239C12.042 16.8043 11.9593 16.8043 11.8803 16.8239C11.7908 16.8462 11.7084 16.9035 11.5437 17.0181L7.71805 19.6802C7.13937 20.0829 6.85003 20.2842 6.65733 20.2583C6.49056 20.2358 6.34626 20.131 6.27337 19.9793C6.18915 19.8041 6.29123 19.4667 6.49538 18.7919L7.84503 14.3308C7.90313 14.1387 7.93218 14.0427 7.92564 13.9507C7.91986 13.8695 7.89432 13.7909 7.85123 13.7217C7.80246 13.6435 7.72251 13.5829 7.56262 13.4616L3.84858 10.6459C3.28678 10.2199 3.00588 10.007 2.97101 9.81569C2.94082 9.65014 2.99594 9.48051 3.11767 9.36432C3.25831 9.23007 3.61074 9.22289 4.31559 9.20852L8.9754 9.11356C9.176 9.10947 9.27631 9.10743 9.36177 9.07278C9.43726 9.04218 9.50414 8.99359 9.55657 8.93125C9.61593 8.86068 9.64887 8.76592 9.71475 8.57639L11.245 4.174Z"
                  stroke="#80AA50"
                  stroke-width="1.44"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </g>
            </svg>
            {/* {rating} */}
            {"4/5"}
          </div>
        </div>
        <div className="flex justify-between">
          <div className=" flex gap-2 items-center">
            {username}
            {card.IsGenerated && (
              <div className="text-[rgb(66,110,134)] text-xs font-semibold">
                หมายเหตุสูตรนี้มี Ref จาก A.I.
              </div>
            )}
          </div>

          <FavIcon />
        </div>
      </div>

      <div className="relative z-50">
        <div className="absolute right-0 m-2">
          <SettingCard
            user_id={card.user_id}
            blog_id={card._id}
            onDelete={onDelete}
          />
        </div>
        {card.image_url == null ? (
          <img
            src="/bg_menu.png"
            alt="default picture menu"
            className="-z-10 h-full"
          />
        ) : (
          <img
            src={card.image_url}
            alt="\picture menu"
            className="-z-10 h-full"
          />
        )}
      </div>
    </div>
  );
};

export default LongCard;
