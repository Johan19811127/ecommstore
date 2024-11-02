import React, { useEffect, useState } from 'react';
import { FaBaseballBatBall } from "react-icons/fa6";
import { GiSchoolBag } from "react-icons/gi";
import { FaSocks } from "react-icons/fa6";
import { BiFemale } from "react-icons/bi";
import { GiTie } from "react-icons/gi";
import { GiMonclerJacket } from "react-icons/gi";
import Image from 'next/image';
import Link from 'next/link';


export default function Products() {
  const [products, setProducts] = useState([]);
  const [priceRanges, setPriceRanges] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/product');
        const data = await response.json();
        if (data.success) {
          setProducts(data.data);
          fetchPriceRanges(); // Fetch price ranges after setting products
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []); // Add dependency array to run this effect only once

  const fetchPriceRanges = async () => {
    try {
      const response = await fetch('/api/product/minmax');
      const mindata = await response.json();
      if (mindata.success) {
        setPriceRanges(mindata.data); // Assuming `mindata.data` contains the price range
        console.log(mindata.data)
      }
    } catch (error) {
      console.error('Error fetching product or calculating price range:', error);
    }
  };

  const getPrice = (_id) => {
    const priceRange = priceRanges.find(price => price._id === _id);
    if (priceRange) {
      const { minSellingPrice, maxSellingPrice } = priceRange;
      if (minSellingPrice < maxSellingPrice) {
        return `<spasnFrom R ${Number(minSellingPrice).toFixed(2)}`;
      } else {
        return `R ${Number(minSellingPrice).toFixed(2)}`;
      }
    } else {
      return 'Loading...';
    }
  };

  return (
    <div className="container mx-auto lg:w-[1200px] p-4">
  <h1 className="text-xl md:text-3xl font-bold text-center uppercase mb-3 mt-7 text=gray-800">OUR PRODUCTS</h1>
  <p className="text-md leading-tight text=gray-800 text-justify mb-5 md:text-center">Browse our complete collection of all products or filter our products by choosing a category below</p>

  <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-5 mt-4 mx-auto content-center items-center">
    <div className="w-full px-3 py-3 ml-auto content-center items-center border border-gray-300 rounded-lg">
      <FaBaseballBatBall className="w-8 md:w-10 h-8 md:h-10 text=gray-800 mx-auto" />
      <p className="text-sm md:text-md mt-3 font-semibold md:font-bold text=gray-800 uppercase text-center">SPORTSWEAR</p>
    </div>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-4 align-items-center">
    {products.map((product) => (
      <div key={product._id} className="container m-1 border-b border-slate-200 shadow-md rounded-xl">
        <Link href={`/products/${product._id}`}>
          <div className="container bg-slate-100 flex items-center justify-center rounded-t-xl border border-b-slate-200">
            <div className="relative w-full aspect-[4/5]"> {/* Ensuring a consistent aspect ratio */}
              {product.images && product.images[0] && (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="drop-shadow-xl rounded-t-xl"
                />
              )}
            </div>
          </div>
          <div className="container px-5 py-5">
            <p className="text-lg lg:text-xl font-semibold antialiased lg:text-center leading-tight uppercase text=gray-700">{product.name}</p>
            <p className="text-2xl font-semibold text=red-600 antialiased text-end">
              {getPrice(product._id)}
            </p>
            <p className="text-sm text-gray-500 antialiased text-center">Click for more information</p>
          </div>
        </Link>
      </div>
    ))}
  </div>
</div>
  )
}
