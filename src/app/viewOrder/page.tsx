'use client'

import React from 'react'
import ButtonGroup from './components/ButtonGroup'

const viewOrder = () => {
  return (
    <div className='w-full h-full bg-slate-400 flex justify-center'>
      <div className='w-4/5 h-full bg-white py-6'>
        <h1 className='text-4xl font-semibold pl-5'>Your Orders</h1> 
        <div className='flex justify-center'>
          <ButtonGroup/>          
        </div>
      </div>
    </div>
  )
}

export default viewOrder