import Navbar from '@/components/Navbar'
import NavLinks from '@/components/NavLinks'
import Image from 'next/image'
import React from 'react'

export default function SizeCharts() {
  return (
    <div>
        <Navbar></Navbar>
        <NavLinks></NavLinks>
        <div className="container bg-white mx-auto  lg:w-[1200px] p-4 rounded-lg">
        <h1 className="text-3xl font-bold text-blue-800 mt-3 mb-3 text-center">Sizing Charts</h1>
        <p className="font-semibold text-blue-700 text-center antialiased my-3 leading-tight">At Monte Vista, we want you to find the perfect fit! Our sizing charts are here to help you choose the best size for your garments. Please note that due to variations in manufacturing, sizes may vary slightly from one garment to another.But don’t worry if the size you choose isn’t quite right, our returns policy is super easy! You can easily exchange your item for a different size. For more details on how to return items for a different size, please refer to our Delivery Policy.</p>

        <p className="font-semibold text-blue-700 text-center antialiased my-3">Before we dive into each product's chart, let's first clarify the terms used in the tables.</p>
        <div className="grid lg:grid-cols-2 gap-3 align-items-center mt-5">
            <div className="flex flex-row card border border-slate-200 rounded-lg bg-gray-50">
                <div className="basis-1/2 bg-blue-300">
                <Image src="/waist.png" width="400" height="400" alt="waist"></Image>
                </div>
            </div>
   
   
   
   
   
   
   
   
</div>   
    </div>
    </div>
  )
}