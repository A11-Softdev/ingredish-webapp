'use client'

import React, { useState } from "react";
import CardPost from "./components/CardPost"

const feedHome: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Food Cards</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <CardPost 
        imageUrl="https://sivasatciftligi.com/wp-content/uploads/2020/12/DBstycKXcAQMhaD-1024x682.jpg" 
        title='ไข่ข้นปู' 
        rating={4.9} 
        userName="กร มีความสุข" 
        AItags={false}
        />
        <CardPost 
        imageUrl="https://sivasatciftligi.com/wp-content/uploads/2020/12/DBstycKXcAQMhaD-1024x682.jpg" 
        title='ไข่ข้นปู' 
        rating={4.9} 
        userName="กร มีความสุข" 
        AItags={true}
        />
      </div>
    </div>
  );
};

export default feedHome;
  
