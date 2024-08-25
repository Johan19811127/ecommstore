import React, { useEffect, useState } from 'react';
import { FaBaseballBatBall } from "react-icons/fa6";
import { GiSchoolBag } from "react-icons/gi";
import { FaSocks } from "react-icons/fa6";
import { BiFemale } from "react-icons/bi";
import { GiTie } from "react-icons/gi";
import { GiMonclerJacket } from "react-icons/gi";
import Image from 'next/image';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [priceRanges, setPriceRanges] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/product');
        const data = await response.json();
        if (data.success) {
          setProducts(data.data);
          fetchPriceRanges(data.data); // Fetch price ranges after setting products
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []); // Add dependency array to run this effect only once

  const fetchPriceRanges = async (products) => {
    try {
      const response = await fetch('/api/product/minmax');
      const mindata = await response.json();
      if (mindata.success) {
        setPriceRanges(mindata.data); // Assuming `mindata.data` contains the price range
      }
    } catch (error) {
      console.error('Error fetching product or calculating price range:', error);
    }
  };

  const getPrice()

  return (
    <div className="container mx-auto lg:w-[1200px] p-4">
      <h1 className="text-3xl font-bold tet-center uppercase mb-3 mt-7 text-blue-900 text-center">OUR PRODUCTS</h1>
      <p className="text-md leading-tight text-blue-900 text-justify mb-5 md:text-center">Browse our complete collection of all products or filter our products by choosing a category below</p>
      
      <div className="container flex flex-row w-auto mx-auto">
        <div className="basis-1/6 px-3 py-5 ml-auto justify-content-center align-items-center">
          <FaBaseballBatBall className="w-16 h-16 text-blue-900 mx-auto" />
          <p className="text-md mt-3 font-bold text-blue-900 uppercase text-center">SPORTSWEAR</p>
        </div>
        <div className="basis-1/6 px-3 py-5 justify-content-center align-items-center">
          <GiSchoolBag className="w-16 h-16 text-blue-900 mx-auto" />
          <p className="text-md mt-3 font-bold text-blue-900 uppercase text-center">BAGS AND COOLERS</p>
        </div>
        <div className="basis-1/6 px-3 py-5 justify-content-center align-items-center">
          <FaSocks className="w-16 h-16 text-blue-900 mx-auto" />
          <p className="text-md mt-3 font-bold text-blue-900 uppercase text-center">SOCKS</p>
        </div>
        <div className="basis-1/6 px-3 py-5 justify-content-center align-items-center">
          <BiFemale className="w-16 h-16 text-blue-900 mx-auto" />
          <p className="text-md mt-3 font-bold text-blue-900 uppercase text-center">GIRLS UNIFORM</p>
        </div>
        <div className="basis-1/6 px-3 py-5 justify-content-center align-items-center">
          <GiMonclerJacket className="w-16 h-16 text-blue-900 mx-auto" />
          <p className="text-md mt-3 font-bold text-blue-900 uppercase text-center">JACKETS</p>
        </div>
        <div className="basis-1/6 px-3 py-5 justify-content-center align-items-center">
          <GiTie className="w-16 h-16 text-blue-900 mx-auto" />
          <p className="text-md mt-3 font-bold text-blue-900 uppercase text-center">Accessories</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-2 align-items-center">
        {products.map((product) => {
          const priceRange = priceRanges[product._id];
          return (
            <div key={product._id} className="container m-1 border rounded-xl">
              <div className="container bg-slate-200 flex aspect-square items-center content-center">
                {product.images && product.images[1] && (
                  <Image src={product.images[1]} alt={product.name} width="400" height="400" />
                )}
              </div>
              <div className="container px-3 py-2">
                <p className="text-xl font-bold my-2 font-sans antialiased uppercase">{product.name}</p>
                <div className="text-md font-medium py-1 px-5 text-end">
                  {priceRange && priceRange.minSellingPrice !== null && priceRange.maxSellingPrice !== null
                    ? `${priceRange.minSellingPrice} - ${priceRange.maxSellingPrice}`
                    : 'Loading...'}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}