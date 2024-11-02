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
 
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setSubtotal(selected.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2));
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
  
  return (
    <div><Head>
        <title>Your Shopping Cart</title>
        <description>Review your cart before you place your order.</description>
        </Head>
     
       
       <Navbar></Navbar>
       <NavLinks></NavLinks>
       <div className="container mx-auto lg:w-[1200px] text-center p-4">
      
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
      

<h2>Your Cart</h2>

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
     <h1 className="text-2xl text-blue-800 font-bold text-center mt-5 "></h2>
        {cart.map((cartItem) => (
          <div key={`${cartItem.product.id}-${cartItem.item.id}`}>
            <h3>{cartItem.product.name} - {cartItem.item.size}</h3>
            <p>Quantity: {cartItem.quantity}</p>
            <input
              type="number"
              value={cartItem.quantity}
              onChange={(e) =>
                handleUpdateQuantity(
                  cartItem.product.id,
                  cartItem.item.id,
                  Number(e.target.value)
                )
              }
              min="1"
            />
            <button onClick={() => handleRemoveItem(cartItem.product.id, cartItem.item.id)}>
              Remove
            </button>
          </div>
      ))}
<button onClick={clearCart}>Clear Cart</button>
</>
      )}
      
    </div>




    </div>


  )
} 
