import React from 'react'
import { TbTruckDelivery } from "react-icons/tb";
import { FaRegHandshake } from "react-icons/fa";
import { PiCoatHangerFill } from "react-icons/pi";
import Link from 'next/link';

export default function Intro() {
  return (
    <>
    <div className="container mx-auto lg:w-[1200px] p-4">

        <h1 className=" text-2xl md:text-3xl font-bold tet-center uppercase mb-3 mt-7 text-blue-900 text-center">Welcome to the Monte Vista Primary School's Online Store</h1>
        <p className="text-md  leading-tight text-blue-900 text-justify mb-5">At Monte Vista, we believe in promoting pride, unity, and excellence in all that we do, and what better way to do that than through our school apparel? With our new online store, parents, students, and staff members can easily purchase Monte Vista Primary School clothing and accessories from the comfort of their own homes. We offer a wide range of high-quality item with new items added regularly.</p>
    
    
    <div className="flex flex-col md:flex-row gap-3 h-auto">
        <div className="basis-1/1 md:basis-1/3 lg:basis-1/3 flex flex-col p-4">
        <TbTruckDelivery className="h-12 w-12 text-center mx-auto text-blue-900"/>
        <p className="text-lg uppercase font-bold text-blue-900 text-center mb-5" >Delivery Policy</p>
        <p className="text-md  leading-tight text-blue-900 text-justify mb-5 antialiased">Paid online orders will be picked, packed, and delivered directly to learners within 3-5 school days from the order date. Goods may be exchanged for a different size if unused and in their original condition by returning them with the learner within 7 days of receipt. Refunds will only be granted if the school is at fault, such as for faulty or defective items. Claims must be filed within 7 days of receipt.</p> 
        
        <Link href="/deliveryprocess" className="inline-block px-6 py-2.5 mt-auto mb-3 bg-blue-800 text-white font-medium text-medium leading-tight uppercase rounded text-center shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">LEARN MORE</Link>
        
        </div>
        <div className="basis-1/1 md:basis-1/3 lg:basis-1/3 flex flex-col p-4">
        <FaRegHandshake className="h-12 w-12 text-center mx-auto text-blue-900"/>
        <p className="text-lg uppercase font-bold text-blue-900 text-center mb-5" >Terms and Conditions</p>
        <p className="text-md  leading-tight text-blue-900 text-justify mb-5">Only fully paid orders will be processed, and no stock will be reserved for orders that are not fully paid. Unauthorized use of images  is strictly prohibited.The school reserves the right to block any user found to be visiting the site for personal gain. Please note that the payment gateway is managed by a third-party provider, and the School does not store any payment details on its database.</p> 
        <Link href="/prescribeduniform" className="inline-block w-75  px-6 py-2.5 mt-auto mb-3 bg-blue-800 text-white font-medium text-medium leading-tight uppercase rounded text-center shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">LEARN MORE</Link>
        
        
        
        
        </div>
        <div className="basis-1/1 md:basis-1/3 lg:basis-1/3 flex flex-col p-4">
        <PiCoatHangerFill className="h-12 w-12 text-center mx-auto text-blue-900"/>
        <p className="text-lg uppercase font-bold text-blue-900 text-center mb-5" >Prescribed Uniform</p>
        <p className="text-md  leading-tight text-blue-900 text-justify mb-5">The Grade R uniform includes the MVP sports top, shorts, and the school tracksuit for colder days. Grades 1-7 Boys wear a plain white shirt with grey trousers (long or short), long grey socks, and black shoes. Grades 1-7 Girls wear a school skirt or slacks with a white shirt, black shoes, and white socks. Both boys and girls wear the MVP sports top and shorts for sports, with the school tracksuit for cooler weather.</p>
        <Link href="/prescribeduniform" className="inline-block px-6 py-2.5 mt-auto mb-3 bg-blue-800 text-white font-medium text-medium leading-tight uppercase rounded text-center shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">LEARN MORE</Link>
        
        
        </div>
    </div>
    
    <Image src="schooljersey.png" width="300" height=""
    
    
    
    
    
    </div>







    </>
  )
}
