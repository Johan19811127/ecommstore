import Image from 'next/image'
import React from 'react'

export default function Footer() {
  return (

    <div className="w-screen p-5 bg-slate-500  border-t-slate-500 mt-10">

<div className="container mx-auto lg:w-[1200px] p-4">
<div className="flex flex-col md:flex-row">
    <div className="lg:basis-1/4">
   <Image src="/badge.png" width="200" height="200" alt="Monte Vista Primary School"></Image>
   
    </div>
</div>


</div>



    </div>
 
  )
}
 