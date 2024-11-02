import { useState , useEffect} from 'react'
import Head from 'next/head'
import {useDispatch, useSelector } from 'react-redux'
import { useCart } from '@/context/CartContext';
import useAuth from '@/lib/useAuth';

import styles from './cart.module.scss'
import { TfiShoppingCartFull } from "react-icons/tfi";
import ProductCard from '../../components/cart/cartitems';
import Checkout from '../../components/cart/checkout'
import CartHeader from '../../components/cart/cardheader'
import Navbar from '@/components/Navbar'
import NavLinks from '@/components/NavLinks'
import Image from 'next/image';

export default function cart() {
  const { cart, updateCartItem, removeFromCart, clearCart } = useCart();
  const [selected, setSelected] = useState([]);
  const { user, loading } = useAuth();
  const dispatch = useDispatch();
 
  const [subtot, setSubtot] = useState(0);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setSubtot(selected.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2));
    setTotal(
      (
        selected.reduce((a, c) => a + c.price * c.qty, 0) 
      ).toFixed(2)
    );
  }, [selected]);

  const handleUpdateQuantity = (productId, itemId, newQuantity) => {
    updateCartItem(productId, itemId, newQuantity);
  };

  const handleRemoveItem = (productId, itemId) => {
    removeFromCart(productId, itemId);
  };

  const calculateSubtotal = (price, quantity) => {
    return price * quantity;
  };

  const calculateTotal = () => {
    return cart.reduce((acc, cartItem) => {
      return acc + calculateSubtotal(cartItem.item.selling, cartItem.quantity);
    }, 0); // Start from 0 and sum all the subtotals
  };

  const cartTotal = calculateTotal();

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true,
    }).format(amount).replace(/,/g, ' '); // Replace commas with spaces
  };
  
  return (
    <div><Head>
        <title>Your Shopping Cart</title>
        <description>Review your cart before you place your order.</description>
        </Head>
     
       <body className="bg-gray-100 min-h-[100vh]">
        <>
       <Navbar></Navbar>
       <NavLinks></NavLinks>
       <div className="container mx-auto text-center px-4 py-2 ">
      
 {/* {cart.length > 1 ? (
            <>
            <div className="row">           
              <div className="col-lg-8">
              <CartHeader
              cartItems={cart.cartItems}
              selected={selected}
              setSelected={setSelected}
            />
            {
              cart.map((product) => (
                <ProductCard  product={product}
                key={product.id}
                selected={selected}
                setSelected={setSelected}/>
              ))
            }
           
           

     </div>
     <div className="col-lg-4">
      <Checkout 
      subtotal={subtotal}
      total={total}
      selected={selected}
      ></Checkout>
      </div>       
</div>
            </>
           ):(
<>
<div className="flex flex-col p-4 content-center items-center ">
            <Image src="/emptycart.png" alt="Empty Cart" width="350" height="300"></Image>
            <h2 className="text-2xl text-blue-800 font-bold text-center mt-5 ">Oops! Looks like your cart is empty.</h2>
            <h5 className="text-lg font-semibold mt-3 mb-2 text-blue-800 ">To add a item to your cart simply follow these steps:
            </h5>
            <div className="justify-self-center">
            <ol className="text-blue-800 text-sm gap-2 lg:text-md font-md mb-4 ml-5 list-decimal mx-auto ">
              <li>Click anywhere on the card of the item you are interested in.</li>
              <li>Click on the size you  are interested in buying.</li>
              <li>Add the quantity you require which is less or the same as stock on hand.</li>
              <li>Add to Cart.</li>
            </ol>
            </div>
            <button className="items-center py-3 px-4 mt-5 shadow-md bg-blue-800 text-lg text-white font-bold rounded-lg"><a href="/" className="flex flex-row"><TfiShoppingCartFull className="mr-5 w-8 h-8"/>CONTINUE SHOPPING</a></button>
            </div>
</>
           )

           } 
    
        
        
         */}
      



      {cart.length === 0 ? (
     
      <div className="flex flex-col p-4 content-center items-center ">
                  <Image src="/emptycart.png" alt="Empty Cart" width="350" height="300"></Image>
                  <h2 className="text-2xl text-blue-800 font-bold text-center mt-5 ">Oops! Looks like your cart is empty.</h2>
                  <h5 className="text-lg font-semibold mt-3 mb-2 text-blue-800 ">To add a item to your cart simply follow these steps:
                  </h5>
                  <div className="justify-self-center">
                  <ol className="text-blue-800 text-sm gap-2 lg:text-md font-md mb-4 ml-5 list-decimal mx-auto ">
                    <li>Click anywhere on the card of the item you are interested in.</li>
                    <li>Click on the size you  are interested in buying.</li>
                    <li>Add the quantity you require which is less or the same as stock on hand.</li>
                    <li>Add to Cart.</li>
                  </ol>
                  </div>
                  <button className="items-center py-3 px-4 mt-5 shadow-md bg-blue-800 text-lg text-white font-bold rounded-lg"><a href="/" className="flex flex-row"><TfiShoppingCartFull className="mr-5 w-8 h-8"/>CONTINUE SHOPPING</a></button>
                  </div>
     
      ) : (
    <>
   
     
     <div className="flex flex-col md:flex-row gap-5 ">
<div className=" basis-1/1 md:basis-4/12 mt-3 flex-col flex">
<div className="border-border-gray-200 shadow-md p-4 bg-white rounded-lg">
<h1 className="text-2xl text-blue-800 font-bold text-center mt-2 mb-3 ">Your Cart</h1>
<p className="text-sm text-start leading-tight mx-5">Your selected items are listed below. Please review them carefully before proceeding to checkout. Adjust the quantities or remove items if needed.</p>
<div className="min-h-[350px] lg:min-h-[600px] mt-2 border-gray-300 border rounded-lg shadow-sm">
    <table className="w-[100%] border-collapse ">
      <thead className="bg-blue-900 text-white">
        <th className="py-2 px-2"></th>
        <th className="py-2 px-2 border-left-gray-300 border text-left border-right-gray-300">Product</th>
        <th className="py-2 px-2 ">Size</th>
        <th className="py-2 px-2 border-left-gray-300 border border-right-gray-300">Qty</th>
        <th className="py-2 px-2 border-left-gray-300 border border-right-gray-300">Subtotal</th>
        <th className="py-2 px-2 "></th>
    

      </thead>
      <tbody>
      {cart.map((cartItem) => (
      
          <tr key={cartItem.item.id} className="border border-gray-200">
            <td  className="py-2 px-auto  text-center"><Image src={cartItem.product.images[0]} width="40" height="50" className="mx-auto -my-2" alt={cartItem.product.name}/></td>
<td className="py-2 px-2 text-left leading-tight text-sm">{cartItem.product.name}</td>
<td className="py-2 px-2 ">{cartItem.item.size}</td>
<td className="py-2 px-2 "> <input
              type="number"
              className="p-2 border border-gray-400 text-center rounded-lg w-[55px]"
              value={cartItem.quantity}
              onChange={(e) =>
                handleUpdateQuantity(
                 
                  cartItem.item._id,
                  Number(e.target.value)
                )
              }
              min="1"
            /></td>
<td className="py-2 px-2 ">R {Number(cartItem.item.selling*cartItem.quantity).toFixed(2)}</td>
<td className="py-2 px-2 "> <button onClick={() => handleRemoveItem(cartItem.product.id, cartItem.item.id)} className="bg-red-500 rounded-lg text-sm text-white font-semibold px-2 py-1">
             X
            </button></td>

           

</tr>
   ))}
</tbody>
    </table>
      
    </div>
<table className="w-full">
  <tbody>
    <tr>
      <td className="w-[40%]"></td>
      <th className="w-[30%] bg-blue-900 text-white text-xl font-semibold px-4 py-2 text-end">Total</th>
      <th className="w-[30%] border border-gray-300 text-xl font-semibold px-3 py-2">R {formatAmount(Number(cartTotal).toFixed(2))}</th>
    </tr>
  </tbody>
</table>

    <button className="py-2 px-5 mx-auto bg-red-500 text-white mt-2 rounded-lg "onClick={clearCart}>Clear Cart</button>
          </div>
        
          
          
          
          </div>
          <div className=" basis-1/1 md:basis-4/12 mt-3 flex-col flex">
          
          <div className="border-border-gray-200 shadow-md p-4 mb-3 bg-white rounded-lg">
          <h1 className="text-2xl text-blue-800 font-bold text-center mt-2 mb-3 ">Your Details</h1>
          {user ? (
          <p className="text-sm text-start mb-4 leading-tight mx-5">As a logged-in user, you unlock additional benefits such as faster checkout and real-time order tracking. Please ensure your account information is always up to date to guarantee timely delivery of your packages and swift resolution of any potential issues.</p>
          ):(
            <p className="text-sm text-start mb-4 leading-tight mx-5">You are not currently logged in. to enjoy benefits like faster checkout and real-time order tracking please log in and complete your personal information page.</p>
          )}
          <div className="flex flex-row gap-3">
            <div className="flex flex-col px-3">

            <p className="text-sm text-start font-semibold mb-2">Your Name and Surname</p>
            <input className="py-2 px-3 w-full border border-gray-200 rounded-md"></input>
            </div>
            <div className="md:basis-5/12 flex flex-col px-3">
            <p className="text-sm text-start font-semibold mb-2">Contact Number</p>
            <input className="py-2 px-3 w-full border border-gray-200 rounded-md"></input>
          </div>

          </div>
          <div className="flex flex-row mt-3 gap-3">
            <div className="md:basis-6/12 flex flex-col px-5">

            <p className="text-sm text-start font-semibold mb-2">Your Email Address:</p>
            <input className="py-2 px-3 w-full border border-gray-200 rounded-md"></input>
            </div>
            <div className="md:basis-6/12 flex flex-col px-3">
            <p className="text-sm text-start font-semibold mb-2">Daytime Telephone #</p>
            <input className="py-2 px-3 w-full border border-gray-200 rounded-md"></input>
          </div>

          </div>
          <p className="text-center font-bold mt-3">Learner Information for Order Delivery.</p>
          <div className="flex flex-row mt-3 gap-3">
            <div className="md:basis-8/12 flex flex-col px-3">

            <p className="text-sm text-start font-semibold mb-2">Learners Full Name:</p>
            <input className="py-2 px-3 w-full border border-gray-200 rounded-md"></input>
            </div>
            <div className="md:basis-2/12 flex flex-col px-3">
            <p className="text-sm text-start font-semibold mb-2">Grade</p>
            <input className="py-2 px-3 w-full border border-gray-200 rounded-md"></input>
          </div>
          <div className="md:basis-2/12 flex flex-col px-3">
            <p className="text-sm text-start font-semibold mb-2">Class</p>
            <input className="py-2 px-3 w-full border border-gray-200 rounded-md"></input>
          </div>
          </div>
          <div className="flex flex-row mt-3 gap-3">
            <div className="w-full flex flex-col px-3">

            <p className="text-sm text-start font-semibold mb-2">Special Instructions:</p>
            <textarea 
            className="py-2 px-3 w-full leading-tight border border-gray-200 rounded-md"
            rows="4"></textarea>
            </div>
            </div>
          </div>
          <div className="border-border-gray-200 shadow-md p-4 mb-3 bg-white rounded-lg">
          <h1 className="text-2xl text-blue-800 font-bold text-center mt-2 mb-3 ">Payment Details</h1>
          <p className="text-sm text-start mb-4 leading-tight mx-5">Please note: If you choose EFT payment, we cannot guarantee that your items will still be available once your payment is verified, as stock can only be reserved with confirmed payment. To avoid delays, we recommend making your payment via card wherever possible. </p>
            </div>
      </div>
   </div>

</>
      )}
    
    </div>



</>
   
   
    </body>
    </div>
  )
} 
