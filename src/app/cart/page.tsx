"use client";
import React, { useState } from 'react';
import CartItem from '@/components/CartItem';

interface CartItemType {
  name: string;
  price: number;
  store: string;
  img: string;
  quantity: number;
};

function Page() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([
    { name: 'มะเขือเทศ', price: 30, store: 'นายทักษ์ดนัย', quantity: 1, img: 'https://s.isanook.com/he/0/ud/6/32153/tomatoes.jpg?ip/crop/w670h402/q80/jpg' },
    { name: 'มะเขือเทศ', price: 30, store: 'นายทักษ์ดนัย', quantity: 2, img: 'https://s.isanook.com/he/0/ud/6/32153/tomatoes.jpg?ip/crop/w670h402/q80/jpg' },
    { name: 'มะเขือเทศ', price: 30, store: 'นายทักษ์ดนัย', quantity: 1, img: 'https://s.isanook.com/he/0/ud/6/32153/tomatoes.jpg?ip/crop/w670h402/q80/jpg' },
  ]);

  const handleQuantityChange = (index: number, newQuantity: number) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = newQuantity;
    setCartItems(updatedCart);
  };

  const handleDelete = (index: number) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);  // Remove item by index
    setCartItems(updatedCart);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className='flex flex-col min-h-[81vh] items-center p-5 w-full'>
      <div className='bg-[#EDB307] w-2/5 flex justify-center text-4xl font-bold p-4 rounded-t-xl shadow-lg [text-shadow:_0_1px_2px_rgb(0_0_0_/_0.8)]'>Your Cart</div>
      <div className='bg-[#D9D9D9] w-2/5 flex flex-col gap-4 p-8 rounded-b-xl shadow-xl items-center'>
        <div className='flex flex-col gap-4 w-full'>
          {cartItems.map((item, index) => (
            <CartItem
              key={index}
              name={item.name}
              price={item.price}
              store={item.store}
              quantity={item.quantity}
              img={item.img}
              onQuantityChange={(newQuantity) => handleQuantityChange(index, newQuantity)}
              onDelete={() => handleDelete(index)}  // Pass the delete function
            />
          ))}
        </div>
        <div className='bg-[#EDB307] p-4 w-2/5 shadow-lg rounded-lg flex justify-center text-lg font-semibold'>รวม {calculateTotal()} ฿</div>
        <button className='bg-[#80AA50] p-4 shadow-lg rounded-lg flex justify-center font-bold'>Check Out</button>
      </div>
    </div>
  );
}

export default Page;
