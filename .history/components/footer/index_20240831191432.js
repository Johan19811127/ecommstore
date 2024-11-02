import Image from 'next/image'
import React from 'react'
import { BsFillTelephoneFill } from "react-icons/bs";


export default function Footer() {
  return (

    <div className="w-screen p-5 bg-gray-200 border border-t-slate-300 mt-10">

<div className="container mx-auto lg:w-[1200px] p-4">
<div className="flex flex-col md:flex-row">
    <div className="lg:basis-2/12 p-4">
   <Image src="/badge.png" width="200" height="200" alt="Monte Vista Primary School" className=" w-[20vw] md:w-[70%] h-auto mx-auto"></Image>
   
    </div>
    <div className="lg:basis-5/12 content-center items-center px-5">
    <h6 className="font-semibold text-lg mb-2 text-blue-800">Monte Vista Primary School - Online Store</h6>
    <p className="text-md mb-2 text-blue-800">Supporting our learners with quality school wear and merchandise. Every purchase directly benefits the school and helps us continue to provide excellent education and a nurturing environment for our children.Our orders </p>
    </div>
    <div className="lg:basis-5/12 content-center items-center px-5">
    <p className="text-md font-semibold text-lg mb-2 text-blue-800"> Contact us on:.</p>
   <div className="flex flex-col text-blue-800 ">
 
    <div className=" flex flex-row md:basis-2/12 ">
    <p className="text-md align-middle text-blue-800 "><span className="inline-flex mr-3 font-bold items-center ">T:</span>021 558 4637</p>
    
    
    </div>
    <div className=" flex flex-row md:basis-4/12 ">
    <p className="text-md align-middle text-blue-800"><span className="inline-flex mr-3 font-bold items-center ">E:</span>clothingstore@montevistaps.co.za</p>
    
    
    </div> 
    <div className=" flex flex-row md:basis-6/12 ">
    <p className="text-md align-middle text-blue-800"><span className="inline-flex mr-3 font-bold items-center mb-2 ">A:</span>7 Huising Avenue, Monte Vista 7460</p>
    
    
    </div>
    <p className="text-md font-semibold text-lg mb-2 text-blue-800">Our clothing store's trading hours is as follow:
    </p>
   </div>
   
   
    </div>
</div>

</div>
</div>



   
 
  )
}
 