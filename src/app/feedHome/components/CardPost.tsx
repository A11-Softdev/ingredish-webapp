"use client";

import React, { useEffect, useState } from "react";
import SettingCard from "./SettingCard";
import { LongCardDataProps } from "../types/LongCardTypes";
import { fetchUser } from "../api/getUser";
import Link from "next/link";

type CardProps = {
  card: LongCardDataProps;
  onDelete: (id: string) => void;
};

const CardPost = ({ card, onDelete }: CardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userName, setUserName] = useState<string>("unknow");

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getUser = async () => {
    try {
      const temp = await fetchUser(card.user);
      console.log("Fetched data:", temp);

      setUserName(temp.username);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setError("Failed to load blogs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  });

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-64">
      <div className="relative">
        <img
          src={card.image_url}
          alt={card.name}
          className="w-full h-40 object-cover"
        />
        <div className="absolute top-2 right-2">
          <SettingCard
            user_id={card.user}
            blog_id={card._id}
            onDelete={onDelete}
          />
        </div>
      </div>
      <div className="p-4">
        <Link href={`/blog/${card._id}`} key={card._id}>
          <h3 className="text-lg font-bold">{card.name}</h3>
        </Link>
        <div className="flex flex-wrap w-full py-2 border-b-1 border-yellow-400">
          {card.IsGenerated && (
            <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1 rounded-full">
              Recipe by AI
            </span>
          )}
          {!card.IsGenerated && (
            <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded-full">
              Recipe by User
            </span>
          )}
        </div>
        <h4 className="text-sm my-2">{userName}</h4>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <span className="text-yellow-500">★</span>
            <span className="text-gray-600 ml-1">{4}/5</span>
          </div>
          <button onClick={handleFavoriteToggle} className="focus:outline-none">
            {isFavorite ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="red"
                viewBox="0 0 24 24"
                stroke="red"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardPost;
