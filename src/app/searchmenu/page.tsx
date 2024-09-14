"use client";
import React from 'react'
import { useSearchParams } from 'next/navigation';


const SearchMenu = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";


  return (
    <div className='pl-28 pr-28 pt-14'>
      {query && (
        <div className='text-3xl font-semibold text-center'>สูตรจาก '{query}'</div>
        
      )}
    </div>
  )
}

export default SearchMenu
