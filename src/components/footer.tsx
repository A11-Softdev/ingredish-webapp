import React from "react";
import Image from "next/image";
import {
  faFacebook,
  faLine,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faPhone, faTruckMoving, faStore, faChessRook  } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <div>
      {/* Black part */}
      <div className="flex flex-row gap-8 bg-[#222222] z-10 p-4 px-10 w-screen flex-wrap border-b-4 border-[#F1C339]">
        <Image src={"/logo.svg"} alt="Ingredish-icon" width={120} height={60}/>
        {/* Social */}
        <div className="flex flex-col grow">
          <div className="text-center text-white font-[800] text-xl">
            Social
          </div>
          <div className="flex mt-2 gap-4 md:flex-row flex-col justify-evenly">
            {/* <div className="flex gap-4"> */}
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faFacebook}
                  width={30}
                  className="text-[#F1C339]"
                />
                <p className="ml-2 text-white">Ingredish</p>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faLine}
                  width={30}
                  className="text-[#F1C339]"
                />
                <p className="ml-2 text-white">Ingredish</p>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faInstagram}
                  width={30}
                  className="text-[#F1C339]"
                />
                <p className="ml-2 text-white">Ingredish</p>
              </div>
            {/* </div> */}
            {/* <div className="flex gap-4"> */}
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  width={30}
                  className="text-[#F1C339]"
                />
                <p className="ml-2 text-white">Ingredish</p>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faXTwitter}
                  width={30}
                  className="text-[#F1C339]"
                />
                <p className="ml-2 text-white">Ingredish</p>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faPhone}
                  width={30}
                  className="text-[#F1C339]"
                />
                <p className="ml-2 text-white">02-232-2314</p>
              </div>
            </div>
          {/* </div> */}
        </div>
        <div className="flex flex-col">
          <div className="text-center text-white font-[800] text-xl">
            Partner
          </div>
          <div className="flex mt-2 gap-4 lg:flex-row flex-col">
            {/* <div className="flex items-center gap-6"> */}
              <FontAwesomeIcon
                icon={faTruckMoving}
                width={30}
                className="text-[#F1C339]"
              />
              <FontAwesomeIcon
                icon={faStore}
                width={30}
                className="text-[#F1C339]"
              />
              <FontAwesomeIcon
                icon={faChessRook }
                width={30}
                className="text-[#F1C339]"
              />

            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
