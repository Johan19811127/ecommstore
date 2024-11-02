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
            <div className="flex flex-row card border border-slate-200 shadow-md  mb-3 rounded-lg bg-white">
                <div className="basis-1/2 bg-blue-300 rounded-l-lg">
                <Image src="/waist.png" width="400" height="400" alt="waist" className="drop-shadow-md "></Image>
                </div>
                <div className="basis-1/2 content-center justify-center  p-5   ">
                <h3 className="text-2xl mb-5 font-semibold antialiased  text-blue-800 text-center">Waist.</h3>
                <p className="text-md text-blue-800 text-justify mb-5 leading-tight"> Wrap a measurement tape snug , but not to tight ,  around the waist just above the hips. </p><p className="text-sm text-center text-blue-600">**Measurement in centimeters. </p>
                </div>
            </div>
   
            <div className="flex flex-row card border border-slate-200 shadow-md  mb-3 rounded-lg bg-white">
                <div className="basis-1/2 bg-blue-300 rounded-l-lg">
                <Image src="/s2s.png" width="400" height="400" alt="waist" className="drop-shadow-lg "></Image>
                </div>
                <div className="basis-1/2 content-center justify-center p-5   ">
                <h3 className="text-2xl mb-5 font-semibold antialiased  text-blue-800 text-center">Shoulder to Shoulder</h3>
                <p className="text-md text-blue-800 text-justify mb-5 leading-tight"> Place the measuring tape at the outer edge of one shoulder and extend it straight across the back to the outer edge of the other shoulder.. </p><p className="text-sm text-center text-blue-600">**Measurement in centimeters. </p>
                </div>
            </div>
   
            <div className="flex flex-row card border border-slate-200 shadow-md rounded-lg mb-3 bg-white">
                <div className="basis-1/2 bg-blue-300 rounded-l-lg">
                <Image src="/s2p.png" width="400" height="400" alt="shoulder to palm" className="drop-shadow-md "></Image>
                </div>
                <div className="basis-1/2 content-center justify-center p-5   ">
                <h3 className="text-2xl mb-5 font-semibold antialiased  text-blue-800 text-center">Shoulder.</h3>
                <p className="text-md text-blue-800 text-justify mb-5 leading-tight"> Wrap a measurement tape snug , but not to tight ,  around the waist just above the hips. </p><p className="text-sm text-center text-blue-600">**Measurement in centimeters. </p>
                </div>
            </div>
   
            <div className="flex flex-row card border border-slate-200 shadow-md rounded-lg mb-3 bg-white">
                <div className="basis-1/2 bg-blue-300 rounded-l-lg">
                <Image src="/s2s.png" width="400" height="400" alt="waist" className="drop-shadow-lg "></Image>
                </div>
                <div className="basis-1/2 content-center justify-center p-5   ">
                <h3 className="text-2xl mb-5 font-semibold antialiased  text-blue-800 text-center">Shoulder to Shoulder</h3>
                <p className="text-md text-blue-800 text-justify mb-5 leading-tight"> Place the measuring tape at the outer edge of one shoulder and extend it straight across the back to the outer edge of the other shoulder.. </p><p className="text-sm text-center text-blue-600">**Measurement in centimeters. </p>
                </div>
            </div>
   
   
   
   
</div>   
    </div>
    </div>
  )
}
