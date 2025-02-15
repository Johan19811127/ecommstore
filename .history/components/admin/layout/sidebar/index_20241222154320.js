// components/Sidebar.js
import { LuList , LuHeartHandshake  ,LuBox, LuUser, LuBanknote ,LuLayoutDashboard, LuBarChart2, LuSettings,LuLogOut   } from "react-icons/lu";
import Link from 'next/link';
import Image from "next/image";

export default function Sidebar() {
  return (
    <aside className="w-75 min-h-screen -mt-2 -mb-2 -ms-2 shadow-lg bg-white border border-r-2 border-r-gray-300  flex flex-col print:hidden">
      {/* Sidebar Header */}
      <div className="p-5 border border-b-gray-300 border-b-2">
        <Image src="/Badge.png" width="40" height="50"  alt="school logo" className="mx-auto"></Image>
        <p className="text-sm uppercase text-center font-bold">Monte Vista Primary School</p>
        <h2 className="text-xl font-bold text-center uppercase">Back Office</h2>
        <p className="text-sm font-bold text-center">MAIN MENU</p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4">
        
        <ul className=" divide-y divide-solid ">
        <li className="m-0">
            <Link href="/" className="flex items-center px-2 py-2 text-gray-900 text-md font-semibold hover:bg-gray-300 rounded-md">
              
                <span> <LuLayoutDashboard    className="w-[20px] h-[20px] mr-3"/></span>
                <span className="ml-2">Dashboard</span>
             
            </Link>
          </li>
          <li className="m-0">
            <Link href="/projects" className="flex items-center px-2 py-2 text-md font-semibold text-gray-900 hover:bg-gray-300  rounded-md">
             
                <span><LuBox className="w-[20px] h-[20px] mr-2"/></span>
                <span className="ml-2 text-gray-900">Products</span>
           
            </Link>
          </li>
          <li className="m-0">
            <Link href="/projects" className="flex items-center px-2 py-2 text-md font-semibold text-gray-900 hover:bg-gray-300  rounded-md">
             
                <span><LuList className="w-[20px] h-[20px] mr-2"/></span>
                <span className="ml-2 text-gray-900">Categories</span>
           
            </Link>
          </li>
          <li className="m-0">
            <Link href="/projects" className="flex items-center px-2 py-2 text-md font-semibold text-gray-900 hover:bg-gray-300  rounded-md m-0">
             
                <span><LuHeartHandshake className="w-[20px] h-[20px] mr-2"/></span>
                <span className="ml-2 text-gray-900">Suppliers</span>
           
            </Link>
          </li>
          <li className="m-0">
            <Link href="/projects" className="flex items-center px-2 py-2 text-md font-semibold text-gray-800 hover:bg-gray-300  rounded-md m-0">
             
                <span><LuUser className="w-[20px] h-[20px] mr-2"/></span>
                <span className="ml-2 text-gray-900">Users</span>
           
            </Link>
          </li>
          <li className="m-0">
            <Link href="/projects" className="flex items-center px-2 py-2 text-md font-semibold text-gray-800 hover:bg-gray-300  rounded-md m-0">
             
                <span><LuBanknote className="w-[20px] h-[20px] mr-2"/></span>
                <span className="ml-2 text-gray-900">Sales</span>
           
            </Link>
          </li>
          <li className="m-0">
            <Link href="/projects" className="flex items-center px-2 py-2 text-md font-semibold text-gray-800 hover:bg-gray-300  rounded-md m-0">
             
                <span><LuBarChart2 className="w-[20px] h-[20px] mr-2"/></span>
                <span className="ml-2 text-gray-900">Reports</span>
           
            </Link>
          </li>
          <li className="m-0">
            <Link href="/projects" className="flex items-center px-2 py-2 text-md font-semibold text-gray-800 hover:bg-gray-300  rounded-md m-0">
             
                <span><LuSettings className="w-[20px] h-[20px] mr-2"/></span>
                <span className="ml-2 text-gray-900">Settings</span>
           
            </Link>
          </li>
   
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border border-t-gray-300">
        <Link href="/logout" className="flex items-center px-2 py-2 text-md font-semibold text-gray-800 hover:bg-gray-300  rounded-md m-0">
    
           
        <span><LuLogOut  className="w-[20px] h-[20px] mr-2"/></span>
            <span className="ml-3">Logout</span>
  
        </Link>
      </div>
    </aside>
  );
}
