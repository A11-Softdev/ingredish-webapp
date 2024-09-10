"use client";
import React from "react";
import Link from "next/link";
import SearchBox from "./SearchBox";
import AvatarIcon from "./AvatarIcon";

const NavBar = () => {
  return (
    <>
      <nav className="min-h-20 bg-[rgb(34,34,34)] flex  items-center gap-5 p-2 justify-between">
        <Link href="/" className="basis-40">
          <img src="/logo.png" alt="Logo" className="h-12 pl-5 self-center" />
        </Link>
        <div className="flex justify-center">
          <SearchBox />
        </div>

        <div className=" flex grow justify-between xl:pl-32 xl:pr-32 lg:pl-16 lg:pr-16">
          <Link href="/" className="flex flex-col">
            <img
              src="/tabler_file-text-ai.png"
              alt="Logo"
              className="size-8 self-center"
            />
            <p className="font-sans text-base font-bold text-white">Menu</p>
          </Link>
          <Link href="/" className="flex flex-col">
            <img
              src="/basil_home-outline.png"
              alt="Logo"
              className="size-8 self-center"
            />
            <p className="font-sans text-base font-bold text-white">Home</p>
          </Link>
          <Link href="/" className="flex flex-col">
            <img
              src="/basil_file-outline.png"
              alt="Logo"
              className="size-8 self-center"
            />
            <p className="font-sans text-base font-bold text-white">Post</p>
          </Link>
          <Link href="/" className="flex flex-col">
            <img
              src="/basil_shopping-bag-outline.png"
              alt="Logo"
              className="size-8 self-center"
            />
            <p className="font-sans text-base font-bold text-white">Shop</p>
          </Link>
          <Link href="/" className="">
            <img
              src="/basil_shopping-basket-outline.png"
              alt="Logo"
              className="size-8 self-center"
            />
            <p className="font-sans text-base font-bold text-white">Cart</p>
          </Link>
        </div>
        <div className="basis-24 flex justify-center">
          <AvatarIcon />
        </div>
      </nav>
    </>
  );
};

export default NavBar;
