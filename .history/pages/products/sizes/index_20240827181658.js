import Navbar from '@/components/Navbar'
import NavLinks from '@/components/NavLinks'
import React from 'react'

export default function SizeCharts() {
  return (
    <div>
        <Navbar></Navbar>
        <NavLinks></NavLinks>
        <div className="container bg-white mx-auto mt-8 lg:w-[1200px] p-4 rounded-lg">
        <h1 className="text-3xl font-bold text-blue-800 mt-3 mb-3 text-center">Sizing Charts</h1>
        <p className="font-semibold text-blue-700 text-center antialiased my-3">At Monte Vista, we want you to find the perfect fit! Our sizing charts are here to help you choose the best size for your garments. Please note that due to variations in manufacturing, sizes may vary slightly from one garment to another.</p>

        <p className="font-semibold text-blue-700 text-center antialiased my-3">But don’t worry if the size you choose isn’t quite right, our returns policy is super easy! You can easily exchange your item for a different size. For more details on how to return items for a different size, please refer to our Delivery Policy .</p>
    </div>
    </div>
  )
}
