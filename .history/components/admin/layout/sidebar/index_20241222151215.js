// components/Sidebar.js
import { LuList , LuHeartHandshake  ,LuBox, LuUser, LuMailPlus ,LuLayoutDashboard  } from "react-icons/lu";
import Link from 'next/link';
import Image from "next/image";

export default function Sidebar() {
  return (
    <aside className="w-80 min-h-screen -mt-2 -mb-2 -ms-2 shadow-lg bg-white border border-r-2 border-r-gray-300  flex flex-col print:hidden">
      {/* Sidebar Header */}
      <div className="p-5">
        <Image src="/Badge.png" width="60" height="70"  alt="school logo" className="mx-auto"></Image>
        <p className="text-sm uppercase text-center">Monte Vista Primary School</p>
        <h2 className="text-2xl font-bold text-center uppercase">Back Office</h2>
        <p className="text-lg font-bold mb-3 pb-4 text-center">MAIN MENU</p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4">
        
        <ul className=" divide-y divide-solid ">
        <li className="m-0">
            <Link href="/" className="flex items-center px-2 py-2 text-gray-800 text-md font-semibold hover:bg-gray-300 rounded-md">
              
                <span> <LuLayoutDashboard    className="w-[20px] h-[20px] mr-3"/></span>
                <span className="ml-2">Dashboard</span>
             
            </Link>
          </li>
          <li className="m-0">
            <Link href="/projects" className="flex items-center px-2 py-2 text-md font-medium text-gray-800 hover:bg-gray-300  rounded-md">
             
                <span><LuBox className="w-[20px] h-[20px] mr-2"/></span>
                <span className="ml-2 text-gray-800">Products</span>
           
            </Link>
          </li>
          <li className="m-0">
            <Link href="/projects" className="flex items-center px-2 py-2 text-md font-medium text-gray-800 hover:bg-gray-300  rounded-md">
             
                <span><LuList className="w-[20px] h-[20px] mr-2"/></span>
                <span className="ml-2 text-gray-800">Categories</span>
           
            </Link>
          </li>
          <li className="m-0">
            <Link href="/projects" className="flex items-center px-2 py-2 text-md font-medium text-gray-800 hover:bg-gray-300  rounded-md m-0">
             
                <span><LuHeartHandshake className="w-[20px] h-[20px] mr-2"/></span>
                <span className="ml-2 text-gray-800">Suppliers</span>
           
            </Link>
          </li>
          <li className="m-0">
            <Link href="/projects" className="flex items-center px-2 py-2 text-md font-medium text-gray-800 hover:bg-gray-300  rounded-md m-0">
             
                <span><LuUser className="w-[20px] h-[20px] mr-2"/></span>
                <span className="ml-2 text-gray-800">Users</span>
           
            </Link>
          </li>
          <li>
            <Link href="/reports"className="flex items-center p-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md">
            
                <span>📊</span>
                <span className="ml-3">Reports</span>
            
            </Link>
          </li>
          <li>
            <Link href="/settings" className="flex items-center p-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md">
           
                <span>⚙️</span>
                <span className="ml-3">Settings</span>
         
            </Link>
          </li>
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 bg-gray-900">
        <Link href="/logout" className="flex items-center p-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md">
    
            <span>🔒</span>
            <span className="ml-3">Logout</span>
  
        </Link>
      </div>
    </aside>
  );
}
