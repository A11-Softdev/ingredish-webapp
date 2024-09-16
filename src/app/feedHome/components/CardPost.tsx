'use client'

import React, { useState } from 'react';

interface CardProps {
  imageUrl: string;
  title: string;
  rating: number;
  userName: string;
  AItags: boolean;
}

const CardPost: React.FC<CardProps> = ({ imageUrl, title, rating, userName, AItags }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-64">
      <div className="relative">
        <img src={imageUrl} alt={title} className="w-full h-40 object-cover" />
        <div className="absolute top-2 right-2">
          <button
            onClick={handleMenuToggle}
            className="text-gray-600 hover:text-gray-800 focus:outline-none bg-yellow-400 rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="black"
              strokeWidth={4}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v.01M12 12v.01M12 18v.01"
              />
            </svg>
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-yellow-400 rounded-md shadow-lg py-1">
              <a
                href="#"
                className="block px-4 py-2 text-sm bg-yellow-400 text-black hover:bg-gray-100"
              >
                แก้ไขโพสต์
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm bg-yellow-400 text-black hover:bg-gray-100"
              >
                ลบโพสต์
              </a>
            </div>
          )}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <div className="flex flex-wrap w-full py-2 border-b-1 border-yellow-400">
          {AItags && (
            <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1 rounded-full">
              Recipe by AI
            </span>          
          )}
          {!AItags && (
            <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded-full">
              Recipe by User
            </span>
          )}
        </div>
        <h4 className="text-sm my-2">{userName}</h4>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <span className="text-yellow-500">★</span>
            <span className="text-gray-600 ml-1">{rating}/5</span>
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
