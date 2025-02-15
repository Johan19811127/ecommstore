import { useState , useEffect} from 'react'
import Head from 'next/head'
import {useDispatch, useSelector } from 'react-redux'
import { useCart } from '../../context/CartContext';


import styles from './cart.module.scss'
import { TfiShoppingCartFull } from "react-icons/tfi";
import ProductCard from '../../components/cart/cartitems';
import Checkout from '../../components/cart/checkout'
import CartHeader from '../../components/cart/cardheader'
import Navbar from '../../components/Navbar'
import NavLinks from '../../components/NavLinks'
import Image from 'next/image';
import useAuth from '../../lib/useAuth';

export default function cart() {
  const { cart, updateCartItem, removeFromCart, clearCart } = useCart();
  console.log(cart)
  const [selected, setSelected] = useState([]);
  const { user, loading } = useAuth();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    customer: '',
    email: '',
    cellphone: '',
    learner:'',
    grade:'',
    class:'',
  });
  const [subtot, setSubtot] = useState(0);
  const [total, setTotal] = useState(0);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [amount, setAmount] = useState('');
  const [processing, setProcessing] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);


    // Send card details to your backend to process the payment
    const response = await fetch('/api/snapscan-card-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cardNumber,
        expiryMonth,
        expiryYear,
        cvv,
        amount: amount * 100, // SnapScan expects amounts in cents
      }),
    });

    const result = await response.json();
    if (result.success) {
      alert('Payment successful!');
    } else {
      alert('Payment failed: ' + result.message);
    }

    setProcessing(false);
  };

  const handleCardInputChange = (e) => {
    const formattedNumber = formatCardNumber(e.target.value);
    setCardNumber(formattedNumber);
  };

  const formatCardNumber = (number) => {
    return number.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ').trim();
  };


  useEffect(() => {
    setSubtot(selected.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2));
    setTotal(
      (
        selected.reduce((a, c) => a + c.price * c.qty, 0) 
      ).toFixed(2)
 
    );
    console.log(cart);
    console.log(user)
  }, [selected]);

  useEffect(() => {
    if (user) {
      setFormData({
        customer: user.displayName || '',
        email: user.email || '',
        cellphone: user.cellphone || '',
      
      });
    }
  }, [user]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const AddCarttoDBHandler = (cart) =>{
    const dbProducts = cart.map((cartItem) =>({
        product:cartItem.item.product,
        productName:cartItem.product.name,
        item:cartItem.item._id,
        quantity:cartItem.quantity,
        cost:cartItem.item.costPrice,
        price:cartItem.item.selling
    }))
      const dbCart = {
        user:user._id,
        total:Number(cartTotal).toFixed(2),
        products:dbProducts
      }
      console.log(dbCart)
  }
  
  return (
    <>
   <Head>
        <title>Your Shopping Cart</title>
        <description>Review your cart before you place your order.</description>
        </Head>
     
       <body className="bg-gray-100 min-h-[100vh]">
      
       <Navbar></Navbar>
       <NavLinks></NavLinks>
       <div className="mx-auto text-center px-4 py-2 ">
      
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
      

<div className="max-w-[1350px] md:w-[100vw] w-full mx-auto">

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
   
   <h1 className="text-2xl text-blue-800 font-bold text-center mt-2 mb-3 ">Continue with your order.</h1>
     <div className="flex flex-col md:flex-row gap-5 ">
<div className=" basis-1/1 lg:basis-5/12 mt-3 flex-col flex ">
<div className="border-border-gray-200 shadow-md p-0 max-w-[500px] mx-auto bg-white rounded-lg">
  <div className="bg-blue-800  rounded-t-lg px-4 py-1">
<h1 className="text-xl text-white uppercase font-bold text-center ">Your Cart</h1></div>
<div className="p-5">
<p className="text-sm text-center tart leading-tight mx-5">Review your selected items below. Adjust quantities or remove items before checkout.</p>
<div className="min-h-[250px] lg:min-h-[450px] font-md mt-2 py-3 rounded-lg shadow-sm">
    <table className="w-[100%] table-fixed border-collapse ">
      <thead className="mt-3">

        <th className="py-1 px-2 mt-3 border-b-gray-700 border text-start text-gray-700 font-semibold w-[50%]" >Product</th>
        <th className="px-1 mt-3 border-b-gray-700 border text-center text-gray-700 font-semibold w-[10%]">Size</th>
        <th className="px-1 mt-3 border-b-gray-700 border text-center text-gray-700 font-semibold w-[15%]">Qty</th>
        <th className="py-1 px-2 mt-3 border-b-gray-700 border text-end text-gray-700 font-semibold w-[20%]">Subtotal</th>
        <th className="py-1 px-2 mt-3 border-b-gray-700 border text-center text-gray-700 font-semibold w-[5%]"></th>
    

      </thead>
      <tbody>
      {cart.map((cartItem) => (
      
          <tr key={cartItem.item.id} className="py-2">
            <td  className="py-2 px-2  text-start text-sm  w-[50%] ">{cartItem.product.name}</td>
<td className="py-2 px-2 text-center leading-tight text-sm w-[10%]">{` ${cartItem.item.size}  `}</td>

<td className=" py-2 w-[15%]"> <input
              type="number"
              className="px-2 py-1 border w-12 border-gray-400 text-center text-sm rounded-lg "
              value={cartItem.quantity}
              onChange={(e) =>
                handleUpdateQuantity(
                 
                  cartItem.item._id,
                  Number(e.target.value)
                )
              }
              min="1"
            /></td>
<td className="py-2 px-2 text-sm w-[20%] ">R {Number(cartItem.item.selling*cartItem.quantity).toFixed(2)}</td>
<td className="py-2 px-1 "> <button onClick={() => handleRemoveItem(cartItem.product.id, cartItem.item.id)} className="bg-red-500 rounded-lg text-xs text-white font-semibold px-2 py-1">
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
      <td className="w-[30%]"></td>
      <th className="w-[30%]   text-xl font-semibold px-4 py-2 text-end">Total</th>
      <th className="w-[30%] text-xl font-semibold px-3 py-2">R {formatAmount(Number(cartTotal).toFixed(2))}</th>
    </tr>
  </tbody>
</table>

   
          </div>
        
         </div> 
          
          
          </div>
          <div className=" basis-1/1 md:basis-7/12 mt-3 flex-col flex">
          
          <div className="border-border-gray-200 shadow-md  mb-3 bg-white rounded-lg">
          <div className="bg-blue-800  rounded-t-lg px-4 py-1">
          <h1 className="text-xl text-white font-bold text-center uppercase">Your Information</h1></div>
       <div className="p-5">
          {user ? (
          <p className="text-sm text-start mb-4 leading-tight mx-5">As a logged-in user, enjoy faster checkout and real-time order tracking. Keep your account info updated for timely deliveries and quick issue resolution.</p>
          ):(
            <p className="text-sm text-start mb-4 leading-tight mx-5">You're not logged in. Log in and update your personal info to enjoy faster checkout and real-time order tracking.</p>
          )}

<p className="text-start font-bold px-3  my-3">Your Information.</p>
         
            <div className="flex flex-col lg:flex-row lg:items-center px-3 mb-3">

            <p className="text-sm text-start lg:basis-1/4 font-semibold mb-3">Name and Surname</p>
            <input className="py-2 px-3 text-sm w-full lg:basis-3/4 border border-gray-200 rounded-md"
            name="customer"
            type="text"
            id="customer"
            value={formData.customer}
            onChange={handleChange}></input>
            </div>
            <div className="flex flex-col lg:flex-row px-3 mb-3 lg:items-center">
            <p className="text-sm text-start lg:basis-1/4 font-semibold mb-3">Cellphone Number</p>
            <input className="py-2 px-3 text-sm  w-full lg:basis-3/4 border border-gray-300 rounded-md"
            name="cellphone"
            id="cellphone"
            value={formData.cellphone}
            onChange={handleChange}
            ></input>
          </div>
        
          
            <div className="flex flex-col lg:flex-row lg:items-center px-3 mb-3">

            <p className="text-sm text-start font-semibold lg:basis-1/4 mb-3">Your Email Address:</p>
            <input className="py-2 text-sm px-3 w-full border lg:basis-3/4 border-gray-300 rounded-md"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            ></input>
            </div>

          <p className="text-start font-bold px-3  my-3">Learner to whom the package must be delivered.</p>
          <div className="flex flex-col lg:flex-row lg:items-center px-3 mb-3">
          <p className="text-sm text-start lg:basis-1/4 font-semibold mb-33">Learners Full Name:</p>
          <input className="py-2 px-2  lg:basis-3/4 text-sm w-full border border-gray-300 rounded-md"
          name="learner"
          id="learner"
          value={formData.learner}
          onChange={handleChange}></input>
          </div>
          <div className="flex flex-col md:flex-row items-center px-3 mb-3">
         
            <div className="basis-1/2 flex flex-col items-center lg:flex-row ">
            <p className="text-sm text-start lg:basis-1/2 font-semibold mb-3">Grade</p>
            <select className="py-2 px-3 text-sm lg:basis-1/2 w-full border border-gray-300 rounded-md"
            id="grade"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            >
            <option></option>
            <option>R</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            </select>
          </div>
          <div className="basis-1/4 w-full flex flex-col items-center lg:flex-row ">
            <p className="text-sm text-start lg:basis-1/2 self-center font-semibold mb-3 px-5">Class</p>
            <input className="py-2 px-3 text-sm w-full lg:basis-1/2 border border-gray-300 rounded-md"></input>
          </div>
          </div>
          <p className="text-start font-bold px-3  my-3">Special Instructions:</p>
          <div className="flex flex-row mt-3 gap-3">
            <div className="w-full flex flex-col items-center lg:flex-row px-3">

            <p className="text-sm text-start lg:basis-1/4 font-semibold mb-4">Special Instructions:</p>
            <textarea 
            className="py-2 px-3 w-full lg:basis-3/4 text-sm leading-tight border border-gray-300 rounded-md"
            rows="6"></textarea>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            <div className="flex flex-col lg:flex-row px-3 mt-3 p-2 gap-2">
              <div className="basis-1/1 lg:basis-1/3 items-center px-3 mt-2"> <button className="py-2 px-5 shadow-md border-b-red-800 text-sm border-r-red-800 border-t-red-100 border-l-red-100 bg-red-500 text-white  rounded-lg w-full mx-auto uppercase font-semibold" onClick={clearCart}>Clear Cart</button></div>
              <div className="basis-1/1 lg:basis-1/3 items-center px-3 mt-2"><a href="/"><button className="py-2 px-5 shadow-md border-b-gray-900  border-r-gray-900 border-t-gray-100 border-l-gray-100 bg-gray-300 text-gray-700  text-sm rounded-lg w-full mx-auto uppercase font-semibold" >Continue Shopping</button></a></div>
             < div className="basis-1/1 lg:basis-1/3 items-center px-3 mt-2">
              <form action="https://www.payfast.co.za/eng/process" method="post">
   <input type="hidden" name="merchant_id" value="10000100">
   <input type="hidden" name="merchant_key" value="46f0cd694581a">
   <input type="hidden" name="amount" value="100.00">
   <input type="hidden" name="item_name" value="Test Product">
   <input type="submit">
</form>  <<button onClick={()=>AddCarttoDBHandler(cart)}
              className="py-2 px-5 shadow-md border-b-blue-950  border-r-blue-950 border-t-blue-400 border-l-blue-400  bg-blue-800 text-white rounded-lg w-full text-sm mx-auto uppercase font-semibold" >Proceed to Payment</button></div>
            </div>
          
          {/* <div className=" basis-1/1 md:basis-3/12 mt-3 flex-col flex">
          <div className="border-border-gray-200 shadow-md p-4 mb-3 bg-white rounded-lg">
          <h1 className="text-2xl text-blue-800 font-bold text-center mt-2 mb-3 ">Payment Details</h1>
         <Image src="/card.png" className="w-[80%] mx-auto" width="400" height="100" alt="card payment"></Image>
          <form onSubmit={handlePayment}>
          <div className="flex flex-col px-3 mb-2">

<p className="text-sm text-start font-semibold mb-2">Name on Card</p>
<input className="py-2 px-3 text-sm w-full border border-gray-200 rounded-md"></input>
</div>
<div className="flex flex-col px-3 mb-2">

<p className="text-sm text-start font-semibold mb-2">Card Number</p>
<input className="py-2 px-3 text-sm w-full border border-gray-200 rounded-md"
  type="text"
  id="cardNumber"
  value={cardNumber}
   onChange={handleCardInputChange}
maxLength="19"
></input>
</div>
<div className="flex flex-row px-3 mb-2 gap-2">

      <div class="basis-1/3 flex flex-col col-md">
      <p className="text-sm text-start font-semibold mb-2">Exp Month (MM)</p>
        
        <input
        className="py-2 px-3 text-sm w-full border border-gray-200 rounded-md"
          type="text"
          id="expiryMonth"
          value={expiryMonth}
          onChange={(e) => setExpiryMonth(e.target.value)}
          required
        />
      </div>

      <div class="basis-1/3 flex flex-col col-md">
      <p className="text-sm text-start font-semibold mb-2">Exp Year (YYYY)</p>
        <input
         className="py-2 px-3 text-sm w-full border border-gray-200 rounded-md"
          type="text"
          id="expiryYear"
          value={expiryYear}
          onChange={(e) => setExpiryYear(e.target.value)}
          required
        />
      </div>

      <div class="basis-1/3 flex flex-col col-md">
      <p className="text-sm text-start font-semibold mb-2">CVV</p>
        <input
         className="py-2 px-3 text-sm w-full border border-gray-200 rounded-md"
          type="text"
          id="cvv"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          required
        />
      </div>
      </div>
      <div className="flex flex-row px- mt-3 mb-3 gap-2">
      <div class="basis-1/2 flex flex-col col-md">
      <p className="text-lg text-start font-semibold mb-2">Amount:</p>
      </div>
      <div class="basis-1/2 flex flex-col col-md">
      <p className="text-lg text-end font-semibold mb-2">R {formatAmount(Number(cartTotal).toFixed(2))} </p>
   </div>
   </div>
      <button className="py-2 px-5 mx-auto w-[60%] m mb-3 bg-blue-500 text-white mt-2 rounded-lg " type="submit" disabled={processing}>
        {processing ? 'Processing...' : 'Pay Now'}
      </button> */}
    {/* </form>
            
            </div>
      </div> */}


</>
      )}
    
   

   </div>


</div>


    </body>
</>
  )
} 
