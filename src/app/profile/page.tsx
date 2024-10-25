"use client";

import React, { useState, useEffect } from "react";
import { Button, Modal } from "@mui/material";
import { useRouter } from "next/navigation";
import { getProfile } from './api/getProfile';
import Link from "next/link";

const Page = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    // Form states
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [imageUrl, setImageUrl] = useState<string>("");
    const [role, setRole] = useState<string>("");

    const router = useRouter();

    useEffect(() => {
        fetchProfileData();
    }, []);

    const fetchProfileData = async () => {
        try {
            setLoading(true);
            const profileData = await getProfile();
            setName(profileData.username);
            setEmail(profileData.email);
            setImageUrl(profileData.image_url);
            setRole(profileData.role);
        } catch (err) {
            setError("Failed to load profile data. Please try again.");
            console.error("Error fetching profile:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Updated Name:", name);
        console.log("Updated Email:", email);
        console.log("Updated Address:", address);
        setOpen(false);
        router.push("/profile");
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[82vh]">
                <p className="text-xl">Loading profile...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center min-h-[82vh] gap-4 mt-10">
                <p className="text-red-500">{error}</p>
                <button
                    onClick={fetchProfileData}
                    className="bg-[#F1C339] text-black p-2 px-4 rounded-lg hover:bg-[#cca530]"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full items-center min-h-[82vh] gap-[60px] mt-10">
            <p className="text-4xl font-bold [text-shadow:_0_1px_2px_rgb(0_0_0_/_0.8)]">Edit Your Profile!</p>
            <div className="flex flex-col gap-4 justify-center items-center w-1/5">
                <div className="relative">
                    <Button
                        variant="contained"
                        component="label"
                        className="rounded-full w-40 h-40 text-black bg-[#80AA50] whitespace-pre overflow-hidden"
                    >
                        {imageUrl && (
                            <img
                                src={imageUrl}
                                alt="Profile"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        )}
                        Upload Profile
                        <input type="file" hidden accept=".gif,.jpg,.jpeg,.png" />
                    </Button>
                </div>
                <div className="bg-[#F1C339] rounded-lg p-3 w-full flex mt-12">
                    <label htmlFor="name" className="font-bold">
                        Name:{" "}
                    </label>
                    <input
                        id="name"
                        className="bg-[#F1C339] rounded-lg text-black grow ml-2"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="bg-[#F1C339] rounded-lg p-3 w-full flex">
                    <label htmlFor="email" className="font-bold">
                        Email:{" "}
                    </label>
                    <input
                        id="email"
                        className="bg-[#F1C339] rounded-lg text-black grow ml-2"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="bg-[#F1C339] rounded-lg p-3 w-full flex">
                    <label htmlFor="address" className="font-bold">
                        Address:{" "}
                    </label>
                    <textarea
                        id="address"
                        className="bg-[#F1C339] rounded-lg text-black grow ml-2"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
            </div>
            {role == 'customer' && <div className="text-center">
                <p>คุณต้องการสร้างร้านค้าของตัวเองหรือไม่?</p>
                <Link href="/shop/create">
                    <button className="bg-[#F1C339] text-black p-4 px-6 font-bold shadow-md rounded-lg hover:bg-[#cca530] mt-7">สร้างร้านค้า</button>
                </Link>
            </div>}
        </div>
    );
};

export default Page;