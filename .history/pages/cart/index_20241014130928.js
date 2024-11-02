import { useState , useEffect} from 'react'
import Head from 'next/head'
import {useDispatch, useSelector } from 'react-redux'
import { useCart } from '@/context/CartContext';


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
  
  return (
    <div><Head>
        <title>Your Shopping Cart</title>
        <description>Review your cart before you place your order.</description>
        </Head>
     
       
       <Navbar></Navbar>
       <NavLinks></NavLinks>
       <div className="container mx-auto text-center px-4 py-2">
      
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
      ) : (
    <>
     <h1 className="text-2xl text-blue-800 font-bold text-center mt-5 ">Your Cart</h1>
     <p className="text-center text-md">Your selected items are listed below. Please review them carefully before proceeding to checkout. Adjust the quantities or remove items if needed.</p>
     <div className="flex flex-row">
<div className=" basis-1/1 md:basis-1/2 p-2 flex-col flex">
<div className="min-h-[350px] lg:min-h-[500px] border-gray-300 border rounded-lg shadow-sm">
    <table className="w-[100%] border-collapse ">
      <thead className="bg-blue-900 text-white">
        <th className="py-2 px-2"></th>
        <th className="py-2 px-2 border-left-gray-300 border border-right-gray-300">Product</th>
        <th className="py-2 px-2 ">Size</th>
        <th className="py-2 px-2 border-left-gray-300 border border-right-gray-300">Qty</th>
        <th className="py-2 px-2 border-left-gray-300 border border-right-gray-300">Subtotal</th>
        <th className="py-2 px-2 "></th>
    

      </thead>
      <tbody>
      {cart.map((cartItem) => (
      
          <tr key={cartItem.item.id} className="border border-gray-200">
            <td  className="py-2 px-auto  text-center"><Image src={cartItem.product.images[0]} width="60" height="75" className="mx-auto -my-2" alt={cartItem.product.name}/></td>
<td className="py-2 px-2 ">{cartItem.product.name}</td>
<td className="py-2 px-2 ">{cartItem.item.size}</td>
<td className="py-2 px-2 "> <input
              type="number"
              className="p-2 border border-gray-400 rounded-lg w-[55px]"
              value={cartItem.quantity}
              onChange={(e) =>
                handleUpdateQuantity(
                  cartItem.product.id,
                  cartItem.item.id,
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
<table>
  <tbody>
    <tr>
      <td className="w-[40%]"></td>
      <th className="w-[30%] bg-blue-900 text-white px-4 py-2 text-end">Total</th>
      <th className="w-[25%] border border-gray-300 px-">R {Number(cartTotal).toFixed(2)}</th>
    </tr>
  </tbody>
</table>
    <button onClick={clearCart}>Clear Cart</button>
          </div>
  
      
      </div>


</>
      )}
      
    </div>




    </div>


  )
} 
