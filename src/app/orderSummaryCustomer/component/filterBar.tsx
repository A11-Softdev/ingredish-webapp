"use client";
import React, { useState } from "react";

const FilterBar = () => {
  const [clickRQ, setClickRQ] = useState<boolean>(false);
  const [clickCF, setClickCF] = useState<boolean>(false);
  const [clickShip, setClickShip] = useState<boolean>(false);
  const [clickRC, setClickRC] = useState<boolean>(false);

  return (
    <div className="grid grid-cols-4 m-auto min-h-[60px] max-w-[1000px] border rounded-lg font-semibold text-xl">
      {clickRQ === true ? (
        <button
          className="rounded-l-lg bg-[rgb(237,179,07)] text-white "
          onClick={() => setClickRQ(!clickRQ)}
        >
          Requested Order
        </button>
      ) : (
        <button
          className="rounded-l-lg bg-white text-[rgb(66,110,134)] hover:bg-[rgb(233,230,230)]"
          onClick={() => (setClickRQ(!clickRQ),setClickCF(false),setClickShip(false),setClickRC(false))}
        >
          Requested Order
        </button>
      )}

      {clickCF === true ? (
        <button
          className=" bg-[rgb(237,179,07)] text-white "
          onClick={() => (setClickRQ(false),setClickCF(!clickCF),setClickShip(false),setClickRC(false))}
        >
          Confirmed Order
        </button>
      ) : (
        <button
          className=" bg-white text-[rgb(66,110,134)] hover:bg-[rgb(233,230,230)]"
          onClick={() => (setClickRQ(false),setClickCF(!clickCF),setClickShip(false),setClickRC(false))}
        >
          Confirmed Order
        </button>
      )}
      {clickShip === true ? (
        <button
          className=" bg-[rgb(237,179,07)] text-white "
          onClick={() => (setClickRQ(false),setClickCF(false),setClickShip(!clickShip),setClickRC(false))}
        >
          Shipped Order
        </button>
      ) : (
        <button
          className=" bg-white text-[rgb(66,110,134)] hover:bg-[rgb(233,230,230)]"
          onClick={() => (setClickRQ(false),setClickCF(false),setClickShip(!clickShip),setClickRC(false))}
        >
          Shipped Order
        </button>
      )}

      {clickRC === true ? (
        <button
          className="rounded-r-lg bg-[rgb(237,179,07)] text-white "
          onClick={() => (setClickRQ(false),setClickCF(false),setClickShip(false),setClickRC(!clickRC))}
        >
          Received Order
        </button>
      ) : (
        <button
          className="rounded-r-lg bg-white text-[rgb(66,110,134)] hover:bg-[rgb(233,230,230)]"
          onClick={() => (setClickRQ(false),setClickCF(false),setClickShip(false),setClickRC(!clickRC))}
        >
          Received Order
        </button>
      )}
    </div>
  );
};

export default FilterBar;
