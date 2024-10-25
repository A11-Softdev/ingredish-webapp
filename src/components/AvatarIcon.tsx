"use client";
import React, { useState } from "react";
import { Avatar } from "@nextui-org/react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface AvatarIconProps {
  onLogout: () => void;
}

const AvatarIcon: React.FC<AvatarIconProps> = ({ onLogout }) => {
  const [isClick, setIsClick] = useState<boolean>(false);
  const router = useRouter();

  const handleClick = () => {
    setIsClick(!isClick);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    onLogout();
    router.push("/login");
  };

  return (
    <div className="relative inline-block">
      <Avatar
        isBordered
        as="button"
        className="transition-transform"
        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        onClick={handleClick}
      />
      {isClick && (
        <div className="absolute top-full font-semibold right-0 mt-2 w-32 bg-[rgb(237,179,07)] rounded-md shadow-lg">
          <Link
            href="/profile"
            className="block p-2 hover:bg-[rgb(34,34,34)] hover:text-[rgb(237,179,07)] text-center rounded"
          >
            My Profile
          </Link>
          <Link
            href="/"
            className="block p-2 hover:bg-[rgb(34,34,34)] hover:text-[rgb(237,179,07)] text-center rounded"
          >
            My Shop
          </Link>
          <button
            onClick={handleLogout} // Logout and clear cookies
            className="w-full p-2 hover:bg-[rgb(34,34,34)] hover:text-[rgb(237,179,07)] text-center rounded"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default AvatarIcon;
