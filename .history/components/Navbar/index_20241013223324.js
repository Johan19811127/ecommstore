import React from 'react';
import Link from 'next/link';
import { HiShoppingCart } from "react-icons/hi2";
import { LuMessageSquare } from "react-icons/lu";
import Image from 'next/image';
import useAuth from '@/lib/useAuth';




const Navbar = () => {
  const { user, loading } = useAuth(); 
  return (

    <nav className="bg-white shadow-md">
      
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Left part with logo and name */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
          
              <Image
                src="/Badge.png"
                alt="Logo"
                width="50"
                className="h-10 w-10 -my-2"
              />
              <span className="text-xl font-bold text-gray-800">
                Monte Vista
              </span>
        
          </Link>
        </div>

        {/* Right part with cart, login, and user details */}
        <div className="flex items-center space-x-2  md:space-x-4">
        <Link href="/cart"  className="text-blue-800 hover:text-blue-400">
           
           < LuMessageSquare className="w-7 h-7 mx-2 "/>
             
           </Link>
          <Link href="/cart"  className="text-blue-800 hover:text-blue-400">
           
          <HiShoppingCart  className="w-7 h-7 mx-2 "/>
            
          </Link>

          {user ? (
            <div className="flex items-center space-x-2">
              <span className=" hidden md:inline md:text-md text-blue-700 mr-4">{user.email}</span>
              <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login"  className="bg-blue-500 text-white  px-3 py-1 rounded hover:bg-blue-600">
              
                Login
            
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;