import Image from 'next/image'
import React from 'react'

export default function Footer() {
  return (

    <div className="w-screen p-5 bg-slate-200  border-t-slate-500 mt-10">

<div className="container mx-auto lg:w-[1200px] p-4">
<div className="flex flex-col md:flex-row">
    <div className="lg:basis-1/6 p-4">
   <Image src="/badge.png" width="200" height="200" alt="Monte Vista Primary School" className=" w-[20vw] md:w-[70%] h-auto mx-auto"></Image>
   
    </div>
    <div className="lg:basis-5/6 content-center items-center">
    <h6 className="font-semibold text-lg mb-2">Monte Vista Primary School - Online Store</h6>
    <p className="text-md">Supporting our learners with quality schoolwear and merchandise. Every purchase directly benefits the school and helps us continue to provide excellent education and a nurturing environment for our children.</p>
   <div className="flex md:flex-row">
    <div className="md:flex-row md:bais"
   </div>
   
   
    </div>
</div>


</div>



    </div>
 
  )
}
 