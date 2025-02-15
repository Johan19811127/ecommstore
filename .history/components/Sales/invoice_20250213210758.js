// components/Invoice.js
// components/A4Invoice.js
import Image from "next/image";
import React, { useRef, useState } from "react";
import { LuSchool , LuMail , LuPhone, LuMailPlus  } from "react-icons/lu";
import { useCart } from '../../context/CartContext';
import useAuth from '../../lib/useAuth';
import Benefits from '../Benefits';
import { format } from 'date-fns';

import { useReactToPrint } from "react-to-print";






const A4Invoice = ({ invoice }) => {
  const invoiceRef = useRef();
const {cart} = useCart();
const { user, loading } = useAuth();



const {curuser, setCurUser} = useState('');
  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
    documentTitle: `Invoice_${invoice.invoiceNumber}`,
  });
  const calculateSubtotal = (price, quantity) => {
    return price * quantity;
  };
  const calculateTotal = () => {
    return cart.reduce((acc, cartItem) => {
      return acc + calculateSubtotal(cartItem.item.selling, cartItem.quantity);
    }, 0); // Start from 0 and sum all the subtotals
  };

  const cartTotal = calculateTotal();

  const delivery = {
    learner:{
      name:"Johan",
      surname:"Cronje",
      class:"5E3",

    },
}

const customer = {
  name : user.displayName || "",
  email: user.email || "",
tel: user.phone || "",

}
const order = 1005
  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true,
    }).format(amount).replace(/,/g, ' '); // Replace commas with spaces
  };
  
const today = format(new Date(), 'dd MMM yyyy');
const via = "Online Store";
const status = "Order Received"
if(user){
  setCurUser(user)
  }else{
  const noUser= new Object()
      noUser.displayName= ""
      noUser.email= ""
      noUser.phone= ""
    
    setCurUser(noUser)
  }


  return (
    <div className="flex flex-col items-center p-6">
      {/* Print Button */}
      <button
        onClick={handlePrint}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Download Invoice as PDF
      </button>

      {/* Invoice Content */}
      <div
        ref={invoiceRef}
        className="bg-white flex flex-col relative p-8 border rounded-md shadow-md"
        style={{ width: "210mm", minHeight: "297mm" }} // A4 dimensions
      >
        {/* Header */}
        <div className="flex-1">
        <header className="mb-3 ">
          <div className="flex flex-row justify-around items-center pb-3">
            <div className="basis-3/8 justify-between items-center">
            <Image src="/Badge.png" width={150} height={200} alt="Monte Vista Badge" className="mx-5 my-2"></Image>
            </div>
            <div className="basis-5/8 py-0 ">
            <div className="flex flex-col">
           <h1 className="text-2xl font-bold me-5 mb-2 text-gray-800">SALES INVOICE</h1>
           <h2 className="text-2xl font-bold  mb-2 text-slate-800">Monte Vista Primary School</h2>
           <div className="flex flex-row items-center me-5 text-slate-800">
            <div className="basis-1/12">
          <LuSchool className="w-[20px] h-[20px] mr-3"/>
          </div>
          <div className="basis-11/12">
           <p className="text-md text-start">7 Huising Avenue, Monte Vista , 7460</p>
           </div>
            </div>
            <div className="flex flex-row items-center text-slate-800">
            <div className="basis-1/12">
            <LuMail   className="w-[20px] h-[20px] mr-3"/>
          </div>
          <div className="basis-11/12 ">
           <p className="text-md text-start">clothingstore@montevistaps.co.za</p>
           </div>
            </div>
            <div className="flex flex-row items-center">
            <div className="basis-1/12">
          <LuPhone   className="w-[20px] h-[20px] mr-3"/>
          </div>
          <div className="basis-11/12 ">
           <p className="text-md text-start me-3">021 558 4637</p>
           </div>
            </div>
            </div>
          </div>
            </div>
           
                <div className="flex flex-row w-full">
                  <div className="basis-1/2">
                  <div className="flex flex-row items-center justify-center text-slate-800">
                  <div className="basis-2/12"><p classname="text-sm text-center">To:</p></div>
                  <div className="basis-10/12 ">
                
              <h1 className="text-2xl font-bold mb-3">{customer.displayName}</h1>
             
              </div></div>
              <div className="flex flex-row items-center text-slate-800">
            <div className="basis-2/12">
            <LuMail   className="w-[20px] h-[20px] mr-3"/>
          </div>
          <div className="basis-10/12 ">
           <p className="text-md text-start">{curuser.email}</p>
           </div>
            </div>
            <div className="flex flex-row items-center">
            <div className="basis-2/12">
            <LuPhone   className="w-[20px] h-[20px] mr-3"/>
          </div>
          <div className="basis-10/12 ">
           <p className="text-md text-start me-3">{coruser.phone || "Not Stated" }</p>
           </div>
            </div>
        
            </div>
           
            <div className="basis-1/2 w-full">
            <div className="flex flex-row text-slate-800">
            <div className="basis-1/2">
            <p className="text-sm text-end">Order Number:</p>
          </div>
          <div className="basis-1/2 ">
          <h3 className="text-xl font-bold mb-2 text-end">INV00{order}</h3>
           </div>
           </div>
            <div className="flex flex-row  text-slate-800">
            <div className="basis-1/2">
            <p className="text-sm text-end">Date:</p>
          </div>
          <div className="basis-1/2 ">
           <p className="text-md text-end font-semibold mb-1">{today}</p>
           </div>
           </div>
           <div className="flex flex-row  text-slate-800">
            <div className="basis-1/2">
            <p className="text-sm text-end ">Sale done via:</p>
          </div>
          <div className="basis-1/2 ">
           <p className="text-sm text-end ">{via}</p>
           </div>
           </div> 
           <div className="flex flex-row  text-slate-800">
            <div className="basis-1/2">
            <p className="text-sm text-end">Order Status:</p>
          </div>
          <div className="basis-1/2 ">
           <p className="text-sm text-end ">{status}</p>
           </div>
           </div>  
         </div>
         </div>
         <p className="my-3 font-semibold">Delivery Details:</p>
         <p className="text-sm">Once the order is ready for dispatch, it will be handed over to <strong>{delivery.learner.name} {delivery.learner.surname}</strong> in Classroom <strong>{delivery.learner.class}</strong>.</p>
        </header>

        {/* Items Table */}
        <div className="min-h-[300px] lg:min-h-[400px] font-md mt-2 mb-3 rounded-lg">
    <table className="w-[100%] border-collapse ">
      <thead className=" ">

        <th className="py-1 px-3 border-left-gray-300 border text-left border-gray-400" >Product</th>
        <th className="py-1 px-3 border-left-gray-300 border text-center border-gray-400" >Size</th>
        <th className="py-1 px-3 border-left-gray-300 border text-center border-gray-400">Qty</th>
        <th className="py-1 px-3 border-left-gray-300 border border-gray-400 text-end">Unit Price</th> 
        <th className="py-1 px-3 border-left-gray-300 border border-gray-400 text-end">Subtotal</th>

    

      </thead>
      <tbody>
      {cart.map((cartItem) => (
      
          <tr key={cartItem.item.id} className="py-2 border-bottom border-gray-600">
         
<td className="py-2 px-2 text-left leading-tight text-sm ">{cartItem.product.name}</td>
<td className="py-2 px-2 text-center leading-tight text-sm ">{cartItem.item.size}</td>
<td className="py-2 px-2 text-center leading-tight text-sm "> {cartItem.quantity}</td>
<td className="py-2 px-2 text-sm text-end ">R {Number(cartItem.item.selling).toFixed(2)}</td>
            
           
<td className="py-2 px-2 text-sm  text-end">R {Number(cartItem.item.selling*cartItem.quantity).toFixed(2)}</td>

           

</tr>

   ))}
</tbody>
    </table>
      
    </div>


  <h4 className="text-xl mr-auto font-semibold mb-3 text-end pe-3"><span className="mr-12" >Total</span>R {calculateTotal().toFixed(2)}</h4>

  </div>
    
   

<div className="flex flex-col bg-gray-100 py-3 mt-auto">
 < Benefits></Benefits>

 </div>
 </div>
    </div>
  );
};

export default A4Invoice;