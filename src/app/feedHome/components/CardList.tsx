'use clint'

import React, {useRef} from 'react'
import CardPost from './CardPost';

const CardList = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="flex overflow-x-scroll pb-2 items-center w-full" ref={scrollRef}>
      <div className="flex flex-nowrap gap-4">
        <CardPost
          imageUrl="https://sivasatciftligi.com/wp-content/uploads/2020/12/DBstycKXcAQMhaD-1024x682.jpg"
          title="กร มีความสุข"
          rating={4.9}
          userName="ไข่ข้นปู"
          AItags={true}
        />
        <CardPost
          imageUrl="https://www.wholeheartykitchen.co.uk/wp-content/uploads/2024/04/chilli_scramble-6-768x512.jpg"
          title="กร มีความสุข"
          rating={4.9}
          userName="ไข่ข้นปู"
          AItags={false}
        />
        <CardPost
          imageUrl="https://sivasatciftligi.com/wp-content/uploads/2020/12/DBstycKXcAQMhaD-1024x682.jpg"
          title="กร มีความสุข"
          rating={4.9}
          userName="ไข่ข้นปู"
          AItags={true}
        />
        <CardPost
          imageUrl="https://www.wholeheartykitchen.co.uk/wp-content/uploads/2024/04/chilli_scramble-6-768x512.jpg"
          title="กร มีความสุข"
          rating={4.9}
          userName="ไข่ข้นปู"
          AItags={false}
        />
        <CardPost
          imageUrl="https://sivasatciftligi.com/wp-content/uploads/2020/12/DBstycKXcAQMhaD-1024x682.jpg"
          title="กร มีความสุข"
          rating={4.9}
          userName="ไข่ข้นปู"
          AItags={false}
        />
      </div>
    </div>
  );
};

export default CardList;
