"use client";
import React, { useEffect, useState } from 'react';
import CartItem from '@/components/CartItem';
import Cookies from 'js-cookie';
import axios from 'axios';

function Page() {
  const token = Cookies.get('token');
  const [cartItems, setCartItems] = useState<any[]>([]);

  const fetchCartItems = () => {
    axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/carts/my-cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      setCartItems(response.data.products);
    })
    .catch((error) => {
      console.error('Error fetching cart items:', error);
    });
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    // Ensure newQuantity is a number and not a string
    if (typeof newQuantity === 'number') {
      axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/carts/my-cart/setProduct`, {
        productId,
        amount: newQuantity,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        fetchCartItems(); // Refresh cart items after updating quantity
        console.log('Item quantity updated');
      })
      .catch((error) => {
        console.error('Error updating item quantity:', error);
      });
    }
  };
  

  const handleDelete = (index: number) => {
    const productId = cartItems[index].productId._id; // Assume productId is stored in `_id`

    axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/carts/my-cart/setProduct`, {
      productId,
      amount: 0,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      console.log('Item deleted from cart');
      fetchCartItems(); // Refresh cart items after deleting item
    })
    .catch((error) => {
      console.error('Error removing item from cart:', error);
    });
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.productId.price * item.amount, 0);
  };

  return (
    <div className='flex flex-col min-h-[81vh] items-center p-5 w-full'>
      <div className='bg-dark-yellow w-2/5 flex justify-center text-4xl font-bold p-4 rounded-t-xl shadow-lg [text-shadow:_0_1px_2px_rgb(0_0_0_/_0.8)]'>Your Cart</div>
      <div className='bg-background w-2/5 flex flex-col gap-4 p-8 rounded-b-xl shadow-xl items-center'>
        <div className='flex flex-col gap-4 w-full'>
          {cartItems.length !== 0 ? cartItems.map((item, index) => (
            <CartItem
              key={index}
              name={item.productId.name}
              price={item.productId.price}
              store={item.productId.store}
              productId={item.productId._id}
              quantity={item.amount}
              stock={item.productId.amount}
              img={item.productId.image_url}
              onQuantityChange={handleQuantityChange}
              onDelete={() => handleDelete(index)}
            />
          )) : (
            <div className='w-full flex flex-col items-center mb-5'>
              <div className=' w-full flex justify-center '>
                <img src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" alt="" className='object-cover'/>
              </div>
              <div className='text-lg font-semibold text-center'>ไม่มีสินค้าในตะกร้า...</div>
            </div>
          )}
        </div>
        <div className='bg-dark-yellow p-4 w-2/5 shadow-lg rounded-lg flex justify-center text-lg font-semibold'>รวม {calculateTotal()} ฿</div>
        <button className='bg-success p-4 shadow-lg rounded-lg flex justify-center font-bold'>Check Out</button>
      </div>
    </div>
  );
}

export default Page;
