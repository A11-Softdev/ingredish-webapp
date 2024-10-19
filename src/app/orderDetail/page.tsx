"use client";
import React, { useState } from 'react';
import OrderDetailItem from './components/OrderDetailItem';

interface CartItemType {
  name: string;
  quantity: number;
  img: string;
};

function Page() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([
    { name: 'มะเขือเทศ', quantity: 1, img: 'https://s.isanook.com/he/0/ud/6/32153/tomatoes.jpg?ip/crop/w670h402/q80/jpg' },
    { name: 'มะเขือเทศ', quantity: 2, img: 'https://s.isanook.com/he/0/ud/6/32153/tomatoes.jpg?ip/crop/w670h402/q80/jpg' },
    { name: 'มะเขือเทศ', quantity: 1, img: 'https://s.isanook.com/he/0/ud/6/32153/tomatoes.jpg?ip/crop/w670h402/q80/jpg' },
  ]);

  return (
    <div className='flex flex-col min-h-[81vh] items-center p-5 w-full'>
      <div className='bg-dark-yellow w-2/5 flex justify-center text-4xl font-bold p-4 rounded-t-xl shadow-lg [text-shadow:_0_1px_2px_rgb(0_0_0_/_0.8)]'>Customer's Cart</div>
      <div className='bg-background w-2/5 flex flex-col gap-4 p-8 rounded-b-xl shadow-xl items-center'>
        <div className='flex flex-col gap-4 w-full'>
          {cartItems.map((item, index) => (
            <OrderDetailItem
              key={index}
              name={item.name}
              quantity={item.quantity}
              img={item.img}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
