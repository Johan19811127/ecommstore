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
     <p clasName="text-center text-md">Your selected items are listed below. Please review them carefully before proceeding to checkout. Adjust the quantities or remove items if needed.</p>
     <div className="flex flex-row">
<div className="basis-5/8 p-2">
    <table className="w-[100%] border-collapse ">
      <thead className="bg-blue-600 text-white">
        <th className="py-3 px-2"></th>
        <th className="py-3 px-2">Product</th>
        <th className="py-3 px-2">Size</th>
        <th className="py-3 px-2">Qty</th>
        <th className="py-3 px-2">Subtotal</th>
        <th className="py-3 px-2"></th>
    

      </thead>
      <tbody>
      {cart.map((cartItem) => (
      
          <tr key={cartItem.item.id}>
            <td><Image src={cartItem.product.images[0]} width="80" height="100" alt={cartItem.product.name}/></td>
<td>{cartItem.product.name}</td>
<td>{cartItem.item.size}</td>
<td>{cartItem.quantity}</td>
<td>R {Number(cartItem.item.selling*cartItem.quantity).toFixed(2)}</td>
<td> <button onClick={() => handleRemoveItem(cartItem.product.id, cartItem.item.id)} className="bg-red-500 rounded-lg  text-white font-semibold px-2 py-1">
             X
            </button></td>

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

</tr>
   ))}
</tbody>
    </table>
      
           
 
          </div>
  
      <button onClick={clearCart}>Clear Cart</button>
      </div>


</>
      )}
      
    </div>




    </div>


  )
} 
