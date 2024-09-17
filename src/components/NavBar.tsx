"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import SearchBox from "./SearchBox";
import AvatarIcon from "./AvatarIcon";
import Cookies from "js-cookie";

const NavBar = () => {
  const [isToken, setIsToken] = useState<boolean>(false);

  const handleLogout = () => {
    Cookies.remove("token");
    setIsToken(false);
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsToken(true);
    }
  }, []);

  return (
    <nav className="min-h-20 bg-[rgb(34,34,34)] flex items-center justify-between relative gap-2">
      <Link href="/" className="ml-5">
        <img src="/logo.png" alt="Logo" className="h-12 self-center" />
      </Link>

      {isToken ? (
        <>
          <div className="max-w-lg w-full flex justify-center">
            <SearchBox />
          </div>
          <div className="max-w-md w-full flex justify-between items-center mr-5">
            <Link href="/" className="flex flex-col">
              <img
                src="/tabler_file-text-ai.png"
                alt="Menu Icon"
                className="size-8 self-center"
              />
              <p className="font-sans text-base font-bold text-white">Menu</p>
            </Link>
            <Link href="/" className="flex flex-col">
              <img
                src="/basil_home-outline.png"
                alt="Home Icon"
                className="size-8 self-center"
              />
              <p className="font-sans text-base font-bold text-white">Home</p>
            </Link>
            <Link href="/" className="flex flex-col">
              <img
                src="/basil_file-outline.png"
                alt="Post Icon"
                className="size-8 self-center"
              />
              <p className="font-sans text-base font-bold text-white">Post</p>
            </Link>
            <Link href="/" className="flex flex-col">
              <img
                src="/basil_shopping-bag-outline.png"
                alt="Shop Icon"
                className="size-8 self-center"
              />
              <p className="font-sans text-base font-bold text-white">Shop</p>
            </Link>
            <Link href="/" className="flex flex-col">
              <img
                src="/basil_shopping-basket-outline.png"
                alt="Cart Icon"
                className="size-8 self-center"
              />
              <p className="font-sans text-base font-bold text-white">Cart</p>
            </Link>
            <AvatarIcon onLogout={handleLogout} /> {/* Pass the handleLogout function */}
          </div>
        </>
      ) : (
        <Link
          href="/register"
          className="text-lg font-bold text-[rgb(34,34,34)] bg-[rgb(237,179,07)] pl-4 pr-4 pt-1 pb-1 rounded-md mr-5"
        >
          Register
        </Link>
      )}
    </nav>
  );
};

export default NavBar;
