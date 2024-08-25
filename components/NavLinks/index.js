import React, { useState } from 'react';
import Link from 'next/link';

const NavLinks = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
    <nav className="bg-blue-900 shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-center items-center">
      
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/products" className="text-white hover:text-gray-900">
            Products
          </Link>
          <Link href="/terms" className="text-white hover:text-gray-900">
          Terms and Conditions
          </Link>
          <Link href="/delivery" className="text-white hover:text-gray-900">
            Delivery Process
          </Link>
          <Link href="/contact" className="text-white hover:text-gray-900">
         Contact Us
          </Link>
        </div>

        {/* Right part with cart, login, and user details */}
    

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/products" className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md">
           
                Products
            
            </Link>
            <Link href="/terms" className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md">
            
                Terms and Conditions
            
            </Link>
            <Link href="/delivery" className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md">
           
                Delivery Process
          
            </Link>
            <Link href="/contact" className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md">
             
                Contact Us
            
            </Link>
          </div>
        </div>
      )}

    </nav>
           <div className=" text-blue-900 py-3">
           <div className="overflow-hidden whitespace-nowrap">
             <div className="animate-scroll text-default leading-tight font-semibold">
              Welcome to the brand new online clothing store for Monte Vista Primary School. One of the big improvements is the ability to log in and save your information. In order to place an order you have to be logged in .    
             </div>
           </div>
         </div>
         </>
  );
};

export default NavLinks