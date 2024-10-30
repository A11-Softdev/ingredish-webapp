"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import Link from "next/link";
import Cookies from "js-cookie";
import { deleteBlog } from "../api/deleteBlogs";
interface settingProps{
  user_id : string;
  blog_id : string;
  onDelete: (id: string) => void;
}

const SettingCard = ({ user_id, blog_id, onDelete }: settingProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [bannedModal, setBannedModal] = useState<number>(0);
  const [deleteModal, setDeleteModal] = useState<number>(0);
  const [isClick, setIsClick] = useState<boolean>(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const currentUserID = Cookies.get("userId");

  // State to manage the input value
  const [inputValue, setInputValue] = useState("");

  // Handle input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // Handle the close action to reset to the first modal
  const handleClose = () => {
    onClose();
    setBannedModal(0); // Reset to the first modal when closing
    setDeleteModal(0);

  };

  // Handle submit button in the first modal
  const handleDeleteSubmit = async () => {
    await deleteBlog(blog_id);
    onDelete(blog_id);
    setDeleteModal(1); // Switch to the second modal
  };

  // Handle submit button in the first modal
  const handleBannedSubmit = () => {
    console.log("Input Value:", inputValue);
    setBannedModal(1); // Switch to the second modal
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      elementRef.current &&
      !elementRef.current.contains(event.target as Node) &&
      !(event.target instanceof HTMLInputElement) // Exclude clicks on input elements
    ) {
      setIsClick(false); // Close or set state as needed

    }
  };
  const handleClick = () => {
    setIsClick(!isClick);
  };

  useEffect(() => {
    if (isClick) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isClick]);

  return (
    <div className="relative">
      <button onClick={handleClick}>
        <svg
          className="border-2 border-black rounded-md bg-white"
          fill="#000000"
          width="24px"
          height="24px"
          viewBox="0 0 32 32"
          enable-background="new 0 0 32 32"
          id="Glyph"
          version="1.1"
          xmlSpace="preserve"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M16,13c-1.654,0-3,1.346-3,3s1.346,3,3,3s3-1.346,3-3S17.654,13,16,13z"
              id="XMLID_287_"
            ></path>
            <path
              d="M6,13c-1.654,0-3,1.346-3,3s1.346,3,3,3s3-1.346,3-3S7.654,13,6,13z"
              id="XMLID_289_"
            ></path>
            <path
              d="M26,13c-1.654,0-3,1.346-3,3s1.346,3,3,3s3-1.346,3-3S27.654,13,26,13z"
              id="XMLID_291_"
            ></path>
          </g>
        </svg>
      </button>

      {isClick &&
        (currentUserID == user_id ? (
          <div
            ref={elementRef}
            className="min-w-32 absolute right-0 z-50 bg-white border-2 border-black rounded-md"
          >
            <Link href="/" className="flex hover:bg-[rgb(237,179,07)] p-2">
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
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
                    d="M8 5.00005C7.01165 5.00082 6.49359 5.01338 6.09202 5.21799C5.71569 5.40973 5.40973 5.71569 5.21799 6.09202C5 6.51984 5 7.07989 5 8.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.07989 21 8.2 21H15.8C16.9201 21 17.4802 21 17.908 20.782C18.2843 20.5903 18.5903 20.2843 18.782 19.908C19 19.4802 19 18.9201 19 17.8V8.2C19 7.07989 19 6.51984 18.782 6.09202C18.5903 5.71569 18.2843 5.40973 17.908 5.21799C17.5064 5.01338 16.9884 5.00082 16 5.00005M8 5.00005V7H16V5.00005M8 5.00005V4.70711C8 4.25435 8.17986 3.82014 8.5 3.5C8.82014 3.17986 9.25435 3 9.70711 3H14.2929C14.7456 3 15.1799 3.17986 15.5 3.5C15.8201 3.82014 16 4.25435 16 4.70711V5.00005M12 15H9M15 11H9"
                    stroke="#000000"
                    stroke-width="1.2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                </g>
              </svg>
              แก้ไขโพสต์
            </Link>
            <Button
              className="w-full bg-white flex hover:bg-[rgb(237,179,07)] p-2 rounded-md self-start"
              onPress={onOpen}
            >
              <div className="w-full flex ">
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
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
                      d="M16.5 22.25H7.49999C7.31264 22.2508 7.13176 22.1815 6.99295 22.0556C6.85415 21.9298 6.76748 21.7565 6.74999 21.57L5.24999 5.57C5.23937 5.46613 5.25178 5.36119 5.28635 5.26267C5.32092 5.16415 5.3768 5.07446 5.44999 5C5.51851 4.92149 5.60305 4.85855 5.69792 4.81543C5.79279 4.77231 5.89579 4.75 5.99999 4.75H18C18.1055 4.75109 18.2096 4.77384 18.306 4.81684C18.4023 4.85985 18.4888 4.92219 18.56 5C18.6298 5.07644 18.6827 5.16667 18.7154 5.26485C18.7482 5.36303 18.7599 5.46699 18.75 5.57L17.25 21.57C17.2325 21.7565 17.1458 21.9298 17.007 22.0556C16.8682 22.1815 16.6874 22.2508 16.5 22.25ZM8.17999 20.75H15.82L17.18 6.25H6.81999L8.17999 20.75Z"
                      fill="#000000"
                    ></path>{" "}
                    <path
                      d="M19 6.25H5C4.80109 6.25 4.61032 6.17098 4.46967 6.03033C4.32902 5.88968 4.25 5.69891 4.25 5.5C4.25 5.30109 4.32902 5.11032 4.46967 4.96967C4.61032 4.82902 4.80109 4.75 5 4.75H19C19.1989 4.75 19.3897 4.82902 19.5303 4.96967C19.671 5.11032 19.75 5.30109 19.75 5.5C19.75 5.69891 19.671 5.88968 19.5303 6.03033C19.3897 6.17098 19.1989 6.25 19 6.25Z"
                      fill="#000000"
                    ></path>{" "}
                    <path
                      d="M14.5 3.25H9.5C9.30109 3.25 9.11032 3.17098 8.96967 3.03033C8.82902 2.88968 8.75 2.69891 8.75 2.5C8.75 2.30109 8.82902 2.11032 8.96967 1.96967C9.11032 1.82902 9.30109 1.75 9.5 1.75H14.5C14.6989 1.75 14.8897 1.82902 15.0303 1.96967C15.171 2.11032 15.25 2.30109 15.25 2.5C15.25 2.69891 15.171 2.88968 15.0303 3.03033C14.8897 3.17098 14.6989 3.25 14.5 3.25Z"
                      fill="#000000"
                    ></path>{" "}
                    <path
                      d="M10.25 17.47C10.0519 17.4674 9.86263 17.3876 9.72253 17.2475C9.58244 17.1074 9.50259 16.9181 9.5 16.72V10.28C9.5 10.0811 9.57902 9.89032 9.71967 9.74967C9.86032 9.60902 10.0511 9.53 10.25 9.53C10.4489 9.53 10.6397 9.60902 10.7803 9.74967C10.921 9.89032 11 10.0811 11 10.28V16.72C10.9974 16.9181 10.9176 17.1074 10.7775 17.2475C10.6374 17.3876 10.4481 17.4674 10.25 17.47Z"
                      fill="#000000"
                    ></path>{" "}
                    <path
                      d="M13.75 17.47C13.5519 17.4674 13.3626 17.3876 13.2225 17.2475C13.0824 17.1074 13.0026 16.9181 13 16.72V10.28C13 10.0811 13.079 9.89032 13.2197 9.74967C13.3603 9.60902 13.5511 9.53 13.75 9.53C13.9489 9.53 14.1397 9.60902 14.2803 9.74967C14.421 9.89032 14.5 10.0811 14.5 10.28V16.72C14.4974 16.9181 14.4176 17.1074 14.2775 17.2475C14.1374 17.3876 13.9481 17.4674 13.75 17.47Z"
                      fill="#000000"
                    ></path>{" "}
                  </g>
                </svg>
                <p>ลบโพสต์</p>
              </div>
              <Modal
                isOpen={isOpen}
                onClose={handleClose}
                onOpenChange={(open) => (open ? onOpen() : onClose())}
              >
                <ModalContent>
                  {(close) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1 text-center">
                        {deleteModal === 0
                          ? "ต้องการที่จะลบโพสต์นี้ใช่หรือไม่"
                          : ""}
                      </ModalHeader>
                      <ModalBody>
                        {deleteModal === 0 ? (
                          <></>
                        ) : (
                          <div className="text-center m-auto">
                            <svg
                              fill="#80AA50"
                              height="100px"
                              width="100px"
                              version="1.1"
                              id="Layer_1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              viewBox="-7.04 -7.04 78.08 78.08"
                              enable-background="new 0 0 64 64"
                              xmlSpace="preserve"
                              stroke="#80AA50"
                              stroke-width="5.12"
                              className="m-auto"
                            >
                              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                              <g
                                id="SVGRepo_tracerCarrier"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></g>
                              <g id="SVGRepo_iconCarrier">
                                {" "}
                                <g id="Checkbox-checked">
                                  {" "}
                                  <path d="M17.4305,23.4424305c-0.2742004-0.5039997-0.9062004-0.6914997-1.4091988-0.4172993 c-0.5050011,0.2740993-0.6915007,0.9050999-0.4173012,1.4090996l15.606699,28.710701 c0.1825008,0.335598,0.5323009,0.5433006,0.9133015,0.5433006c0.0009995,0,0.0019989,0,0.0019989,0 c0.382-0.0009995,0.7327995-0.210701,0.9132004-0.5474014L60.7841988,1.5316312 c0.2722015-0.505,0.0826988-1.1359999-0.4232979-1.4071c-0.5030022-0.2722-1.1350021-0.0837-1.4071999,0.4233 L32.1189003,50.4636307L17.4305,23.4424305z"></path>{" "}
                                  <path d="M61.9333,17.0416317c-0.5685005,0-1.0291023,0.4606991-1.0291023,1.0291996v29.9333 c0,7.6850014-6.2525902,13.9375-13.9374962,13.9375H17.0333004c-7.6849003,0-13.9375-6.2524986-13.9375-13.9375v-29.9333 c0-7.6850004,6.2525997-13.9375,13.9375-13.9375h29.9334011c0.5684967,0,1.0290985-0.4607,1.0290985-1.0292001 s-0.4606018-1.0290999-1.0290985-1.0290999H17.0333004c-8.8198996,0-15.9958,7.1758003-15.9958,15.9958v29.9333 c0,8.8199997,7.1759,15.9958992,15.9958,15.9958992h29.9334011c8.8199043,0,15.9957962-7.1758995,15.9957962-15.9958992v-29.9333 C62.9624977,17.5023308,62.5018997,17.0416317,61.9333,17.0416317z"></path>{" "}
                                </g>{" "}
                              </g>
                            </svg>
                            <p className="font-bold text-xl">ลบโพสต์สำเร็จ</p>
                          </div>
                        )}
                      </ModalBody>
                      <ModalFooter>
                        {deleteModal === 0 && (
                          <div className="w-full flex justify-around ">
                            <Button
                              className="bg-[rgb(237,179,07)] font-semibold text-lg"
                              onPress={handleDeleteSubmit}
                            >
                              ยืนยัน
                            </Button>
                            <Button
                              className="bg-[rgb(77,77,78)] text-white font-semibold text-lg"
                              variant="light"
                              onPress={close}
                            >
                              ยกเลิก
                            </Button>
                          </div>
                        )}
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </Button>
          </div>
        ) : (
          <div
            ref={elementRef}
            className="w-full min-w-32 absolute right-0 z-50 bg-white border-2 border-black rounded-md"
          >
            <Button
              className="w-full bg-white flex hover:bg-[rgb(237,179,07)] p-2 rounded-md"
              onPress={onOpen}
            >
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-1"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M12.5 2.2a10.3 10.3 0 1 0 10.3 10.3A10.299 10.299 0 0 0 12.5 2.2zm0 1a9.252 9.252 0 0 1 6.203 2.39L5.59 18.703A9.284 9.284 0 0 1 12.5 3.2zm0 18.6a9.252 9.252 0 0 1-6.203-2.39L19.41 6.297A9.284 9.284 0 0 1 12.5 21.8z"></path>
                  <path fill="none" d="M0 0h24v24H0z"></path>
                </g>
              </svg>
              ร้องเรียน
            </Button>
            <Modal
              isOpen={isOpen}
              onClose={handleClose}
              onOpenChange={(open) => (open ? onOpen() : onClose())}
            >
              <ModalContent>
                {(close) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1 text-center">
                      {bannedModal === 0
                        ? "ต้องการที่จะร้องเรียนโพสต์นี้ด้วยเหตุผลใด"
                        : ""}
                    </ModalHeader>
                    <ModalBody>
                      {bannedModal === 0 ? (
                        <>
                          <p>อธิบายเหตุผล:</p>
                          <input
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            placeholder="Type here..."
                            style={{
                              width: "100%",
                              padding: "8px",
                              marginTop: "10px",
                            }}
                          />
                        </>
                      ) : (
                        <div className="text-center m-auto">
                          <svg
                            fill="#80AA50"
                            version="1.1"
                            id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 24.00 24.00"
                            xmlSpace="preserve"
                            width="124px"
                            height="124px"
                            stroke="#80AA50"
                            transform="matrix(1, 0, 0, 1, 0, 0)"
                            strokeWidth="0.00024000000000000003"
                            className="m-auto"
                          >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g
                              id="SVGRepo_tracerCarrier"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              stroke="#CCCCCC"
                              strokeWidth="0.048"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                              <path d="M19.2,4.4L2.9,10.7c-1.1,0.4-1.1,1.1-0.2,1.3l4.1,1.3l1.6,4.8c0.2,0.5,0.1,0.7,0.6,0.7c0.4,0,0.6-0.2,0.8-0.4 c0.1-0.1,1-1,2-2l4.2,3.1c0.8,0.4,1.3,0.2,1.5-0.7l2.8-13.1C20.6,4.6,19.9,4,19.2,4.4z M17.1,7.4l-7.8,7.1L9,17.8L7.4,13l9.2-5.8 C17,6.9,17.4,7.1,17.1,7.4z"></path>
                              <rect
                                y="0"
                                fill="none"
                                width="24"
                                height="24"
                              ></rect>
                            </g>
                          </svg>
                          <p>ขอบคุณที่ช่วยดูแล community ของพวกเรา</p>
                          <p>เราได้ส่งคำร้องเรียนให้ผู้ดูแลระบบแล้ว</p>
                        </div>
                      )}
                    </ModalBody>
                    <ModalFooter>
                      {bannedModal === 0 && (
                        <div className="w-full flex justify-around ">
                          <Button
                            className="bg-[rgb(237,179,07)] font-semibold text-lg"
                            onPress={handleBannedSubmit}
                          >
                            ยืนยัน
                          </Button>
                          <Button
                            className="bg-[rgb(77,77,78)] text-white font-semibold text-lg"
                            variant="light"
                            onPress={close}
                          >
                            ยกเลิก
                          </Button>
                        </div>
                      )}
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>
        ))}
    </div>
  );
};

export default SettingCard;
