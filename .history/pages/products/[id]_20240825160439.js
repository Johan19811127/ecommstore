// pages/products/[id].js
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import NavLinks from '@/components/NavLinks';
import Navbar from '@/components/Navbar';
import ImageCarousel from '@/components/Products/Images';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      // Fetch product details from the API
      fetch(`/api/product/${id}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setProduct(data.data); // Access the product data correctly
          } else {
            console.error('Product not found');
          }
        })
        .catch(err => console.error('Error fetching product details:', err));
    }
  }, [id]);

  const getPrice = (_id) => {
    const priceRange = priceRanges.find(price => price._id === _id);
    if (priceRange) {
      const { minAmount, maxAmount } = priceRange;
      if (minAmount < maxAmount) {
        return `From R ${Number(minAmount).toFixed(2)}`;
      } else {
        return `R ${Number(minAmount).toFixed(2)}`;
      }
    } else {
      return 'Loading...';
    }
  };


  // Log product outside of useEffect to see the updated state
  console.log(product);

  if (!product) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="h-screen w-screen bg-gray-100 ">  
    <Navbar></Navbar>
    <NavLinks></NavLinks>
    <div className="container bg-white mx-auto mt-8 lg:w-[1200px] p-4 rounded-lg p-5">
      <div className="grid md:grid-cols-2 gap-3">
        <div className=" p-4 rounded-lg">
          <ImageCarousel></ImageCarousel>
        </div>

        <div className="px-5">
          <h1 className="text-4xl font-bold text-blue-800">{product.name}</h1>
       
<p className="mt-5 mb-5 uppercase text-blue-900 font-bold ">Item Description:</p>
          <p className=" text-gray-700 leading-tight text-justify">{product.description}</p>
          {product.sizes && product.sizes.length === 1 && (
            
            <><div className="mt-4  rounded-lg">

<p className="mt-4 mb-1 uppercase text-blue-900 font-bold">Pricing and Stock on Hand:</p>
              <p className="align-middle		font-medium text-gray-700"> Size: <span className="text-lg font-bold ml-11 text-blue-900  antialiased uppercase">{product.sizes[0].size}</span> </p>
              <p className="align-middle	font-medium	 text-gray-700"> Price: <span className="text-lg font-bold ml-9 text-blue-900 antialiased uppercase">R {Number(product.sizes[0].selling).toFixed(2)}</span> </p>
              <p className="align-middle	font-medium	text-gray-700"> In Stock: <span className="text-lg font-bold ml-4 text-blue-900 antialiased uppercase"> {product.sizes[0].quantity}</span> </p>
            </div></>
          )}

          <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
</div>
  );
}
