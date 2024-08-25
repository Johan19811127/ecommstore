import React from 'react'
import { FaBaseballBatBall } from "react-icons/fa6";





export default function Products() {
  return (
    <div className="container mx-auto lg:w-[1200px] p-4">
  <h1 className="text-3xl font-bold tet-center uppercase mb-3 mt-7 text-blue-900 text-center">OUR PRODUCTS</h1>
  <p className="text-md  leading-tight text-blue-900 text-justify mb-5 md:text-center">Browse our complete collection of all products or filter our products by choosing a category below</p>
<div className="container flex flex-row ">
<div className="basis-1/8 px-3 py-5 justify-content-center align-items-center">
<FaBaseballBatBall className="w-16 h-16 text-blue-900 mx-auto"></FaBaseballBatBall>
<p className="text-lg font-bold text-blue-900 uppercase text-center">SPORTSWEAR</p>





</div>







</div>
























    </div>
  )
}
