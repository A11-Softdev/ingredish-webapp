"use client";
import React, { useEffect, useState } from 'react';
import CartItem from '@/components/CartItem';
import Cookies from 'js-cookie';
import axios from 'axios';
interface CartItemType {
  name: string;
  price: number;
  store: string;
  img: string;
  quantity: number;
};




function Page() {
  const token = Cookies.get('token');
  const [cartItems, setCartItems] = useState<CartItemType[]>();
  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response.data);
      setCartItems(response.data);
    })
    .catch((error) => {
      console.error('Error fetching cart items:', error);
    });
  }, []); 
  // const [cartItems, setCartItems] = useState<CartItemType[]>([
  //   { name: 'มะเขือเทศ', price: 30, store: 'นายทักษ์ดนัย', quantity: 1, img: 'https://s.isanook.com/he/0/ud/6/32153/tomatoes.jpg?ip/crop/w670h402/q80/jpg' },
  //   { name: 'มะเขือเทศ', price: 30, store: 'นายทักษ์ดนัย', quantity: 2, img: 'https://s.isanook.com/he/0/ud/6/32153/tomatoes.jpg?ip/crop/w670h402/q80/jpg' },
  //   { name: 'มะเขือเทศ', price: 30, store: 'นายทักษ์ดนัย', quantity: 1, img: 'https://s.isanook.com/he/0/ud/6/32153/tomatoes.jpg?ip/crop/w670h402/q80/jpg' },
  // ]);

  const handleQuantityChange = (index: number, newQuantity: number) => {
    const updatedCart = cartItems ? [...cartItems] : [];
    updatedCart[index].quantity = newQuantity;
    setCartItems(updatedCart);
  };

  const handleDelete = (index: number) => {
    const updatedCart = cartItems?.filter((_, i) => i !== index);  // Remove item by index
    setCartItems(updatedCart);
  };

  const calculateTotal = () => {
    return cartItems?.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className='flex flex-col min-h-[81vh] items-center p-5 w-full'>
      <div className='bg-dark-yellow w-2/5 flex justify-center text-4xl font-bold p-4 rounded-t-xl shadow-lg [text-shadow:_0_1px_2px_rgb(0_0_0_/_0.8)]'>Your Cart</div>
      <div className='bg-background w-2/5 flex flex-col gap-4 p-8 rounded-b-xl shadow-xl items-center'>
        <div className='flex flex-col gap-4 w-full'>
          {cartItems?.map((item, index) => (
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
          {!cartItems && 
          <div className='w-full flex flex-col items-center mb-5'>
            <div className=' w-full flex justify-center '>
              <img src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" alt="" className='object-cover'/>
            </div>
            <div className='text-lg font-semibold text-center'>ไม่มีสินค้าในตะกร้า...</div>
          </div>}
        </div>
        <div className='bg-dark-yellow p-4 w-2/5 shadow-lg rounded-lg flex justify-center text-lg font-semibold'>รวม {cartItems ? calculateTotal() : 0} ฿</div>
        <button className='bg-success p-4 shadow-lg rounded-lg flex justify-center font-bold'>Check Out</button>
      </div>
    </div>
  );
}

export default Page;
