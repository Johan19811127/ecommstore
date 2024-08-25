// pages/products/[id].js
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Image from 'next/image';

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
    <div className="container mx-auto mt-8 lg:w-[1200px] p-4">
      <div className="grid md:grid-cols-2 gap-8">
        <div className=" p-4 rounded-lg">
          <Image
            src={product.images[0]} // Ensure this is a correct URL or array
            alt={product.name}
            width={500}
            height={500}
            className="object-cover rounded-lg"
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>
       
<p className="mt-4 mb-1 uppercase text-slate-800 font-bold">Item Description:</p>
          <p className=" text-gray-600">{product.description}</p>
          {product.sizes && product.sizes.length === 1 && (
            
            <><div className="mt-4  rounded-lg">

<p className="mt-4 mb-1 uppercase text-slate-800 font-bold">Pricing and Stock on Hand:</p>
              <p className="text-default "> Size: <span className="text-lg font-semibold ml-20 antialiased uppercase">{product.sizes[0].size}</span> </p>
              <p className="text-default "> Price: <span className="text-lg font-semibold ml-20 uppercase">R {Number(product.sizes[0].selling).toFixed(2)}</span> </p>
              <p className="text-default "> In Stcok: <span className="text-lg font-semibold ml-5 uppercase"> {product.sizes[0].quantity}</span> </p>
            </div></>
          )}

          <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
