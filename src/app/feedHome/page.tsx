'use client';

import React, {useState} from 'react';
import SearchBox from '@/components/SearchBox';
import CardList from './components/CardList';
import KitchenwareFilter from './components/KitchenwareFilter'

const FeedHome = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionChange = (options: string[]) => {
    setSelectedOptions(options);
  };

  const filterOptions = [
    'ทั้งหมด',
    'หม้อนึ่ง',
    'ไมโครเวฟ',
    'หม้อหุงข้าว',
    'เตาอบ',
    'หม้ออบลมร้อน',
    'หม้อทอดไร้น้ำมัน',
    'กระทะไฟฟ้า',
    'เครื่องปั่น',
  ];

  return (
    <div className='h-full bg-[#F2F2F2] flex justify-center'>
      <div className='w-4/5 h-full flex flex-col items-center'>
        <div className='my-3'>
          <h1 className='text-3xl font-semibold my-4'>What Should I COOK Today?</h1>
          <SearchBox defaultValue={''} />
        </div>
        <div className='w-full px-10 my-3 pb-5 border-b-2 border-yellow-400'>
          <h2 className="text-2xl font-medium my-3">สูตรที่ได้จาก A.I.</h2>
          <div className='py-5 px-3 bg-yellow-100 rounded-md'>
            <CardList/>
          </div>
        </div>
        <div className='w-full px-10 my-3 pb-5 border-b-2 border-yellow-400'>
          <h2 className="text-2xl font-medium my-3">สูตรที่คุณอาจสนใจ</h2>
          <div className='py-5 px-3 bg-yellow-100 rounded-md'>
            <CardList/>
          </div>
        </div>
        <div className='w-full px-10 my-3 pb-5 border-b-2 border-yellow-400'>
          <h2 className="text-2xl font-medium my-3">สูตรตามเครื่องครัวที่มี</h2>
          <div className='my-5'>
            <KitchenwareFilter
              options={filterOptions}
              selectedOptions={selectedOptions}
              onOptionChange={handleOptionChange}
            />
            <p>เลือก: {selectedOptions.join(', ')}</p>
          </div>
          <div className='py-5 px-3 bg-yellow-100 rounded-md'>
            <CardList/>
          </div>
        </div>
        <div className='w-full px-10 my-3'>
          <h2 className="text-2xl font-medium my-3">สูตรล่าสุด</h2>
          <div className='py-5 px-3 bg-yellow-100 rounded-md'>
            <CardList/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedHome;
