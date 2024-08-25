import React from 'react'
import { TbTruckDelivery } from "react-icons/tb";

export default function Intro() {
  return (
    <>
    <div className="container mx-auto lg:w-[1200px] p-4">

        <h1 className="text-3xl font-bold tet-center uppercase mb-3 mt-7 text-blue-900 text-center">Welcome to the Monte  Vista Primary School's Online Store</h1>
        <p className="text-md  leading-tight text-blue-900 text-justify mb-5">At Monte Vista, we believe in promoting pride, unity, and excellence in all that we do, and what better way to do that than through our school apparel? With our new online store, parents, students, and staff members can easily purchase Monte Vista Primary School clothing and accessories from the comfort of their own homes. We offer a wide range of high-quality item with new items added regularly.</p>
    
    
    <div className="flex flex-row gap-3 min-h-[50vh]">
        <div className="basis-1/1 md:basis-1/3 lg:basis-1/3 flex flex-col">
        <TbTruckDelivery className="h-12 w-12 text-center mx-auto text-blue-900"/>
        <p className="text-lg uppercase font-bold text-blue-900 text-center mb-5" >Delivery Policy</p>
        <p className="text-md  leading-tight text-blue-900 text-justify mb-5">Paid orders received from parents that ordered goods online will be picked and packed and delivered straight to the learners. This ussaully happens with in 3- 5 school days from tday of order.If Goods is unused and in nits original condition it can be exchanged by sending it back with the learner within 7 days from receiving the package to be exchanged for a different size. Refunds will only be approved for orders where the school is at fault and where faulty or defected items was supplied. Claims  
        
        
        
        </div>
        <div className="basis-1/1 md:basis-1/3 lg:basis-1/3 flex flex-col">
        <TbTruckDelivery className="h-20 w-20 text-center mx-auto text-blue-900"/>
        <p>Delivery Policy</p>
        
        
        
        
        </div>
        <div className="basis-1/1 md:basis-1/3 lg:basis-1/3 flex flex-col">
        <TbTruckDelivery className="h-20 w-20 text-center mx-auto text-blue-900"/>
        <p>Delivery Policy</p>
        
        
        
        
        </div>
    </div>
    
    
    
    
    
    
    
    </div>







    </>
  )
}
