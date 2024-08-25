import React from 'react'
import { TbTruckDelivery } from "react-icons/tb";
import { FaRegHandshake } from "react-icons/fa";
import { PiCoatHangerFill } from "react-icons/pi";

export default function Intro() {
  return (
    <>
    <div className="container mx-auto lg:w-[1200px] p-4">

        <h1 className="text-3xl font-bold tet-center uppercase mb-3 mt-7 text-blue-900 text-center">Welcome to the Monte  Vista Primary School's Online Store</h1>
        <p className="text-md  leading-tight text-blue-900 text-justify mb-5">At Monte Vista, we believe in promoting pride, unity, and excellence in all that we do, and what better way to do that than through our school apparel? With our new online store, parents, students, and staff members can easily purchase Monte Vista Primary School clothing and accessories from the comfort of their own homes. We offer a wide range of high-quality item with new items added regularly.</p>
    
    
    <div className="flex flex-row gap-3 min-h-[50vh]">
        <div className="basis-1/1 md:basis-1/3 lg:basis-1/3 flex flex-col p-4">
        <TbTruckDelivery className="h-12 w-12 text-center mx-auto text-blue-900"/>
        <p className="text-lg uppercase font-bold text-blue-900 text-center mb-5" >Delivery Policy</p>
        <p className="text-md  leading-tight text-blue-900 text-justify mb-5">Paid online orders will be picked, packed, and delivered directly to learners within 3-5 school days from the order date. Goods may be exchanged for a different size if unused and in their original condition by returning them with the learner within 7 days of receipt. Refunds will only be granted if the school is at fault, such as for faulty or defective items. Claims must be filed within 7 days of receipt.</p> 
        
        
        
        </div>
        <div className="basis-1/1 md:basis-1/3 lg:basis-1/3 flex flex-col p-4">
        <FaRegHandshake className="h-12 w-12 text-center mx-auto text-blue-900"/>
        <p className="text-lg uppercase font-bold text-blue-900 text-center mb-5" >Terms and Conditions</p>
        <p className="text-md  leading-tight text-blue-900 text-justify mb-5">Only fully paid orders will be processed, and no stock will be reserved for orders that are not fully paid. Unauthorized use of images  is strictly prohibited.The school reserves the right to block any user found to be visiting the site for personal gain. Please note that the payment gateway is managed by a third-party provider, and the School does not store any payment details on its database.</p> 
        
        
        
        
        
        </div>
        <div className="basis-1/1 md:basis-1/3 lg:basis-1/3 flex flex-col p-4">
        <PiCoatHangerFill className="h-12 w-12 text-center mx-auto text-blue-900"/>
        <p className="text-lg uppercase font-bold text-blue-900 text-center mb-5" >Prec</p>
        
        
        
        
        </div>
    </div>
    
    
    
    
    
    
    
    </div>







    </>
  )
}
