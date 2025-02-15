// components/Sidebar.js
import { LuList , LuHeartHandshake  ,LuBox, LuUser, LuMailPlus ,LuLayoutDashboard  } from "react-icons/lu";
import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-80 min-h-screen -mt-2 -mb-2 -ms-2 drop-shadow-lg bg-gray-100 border border-r-2  flex flex-col print:hidden">
      {/* Sidebar Header */}
      <div className="p-4 bg-gray-900">
        <p className="text-sm text-white">Monte Vista Primary School</p>
        <h2 className="text-xl font-bold text-yellow-400">Back Office</h2>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4">
        <p classname="text-lg font-bold mb-4 pb-4 text-center">MAIN MENU</p>
        <ul className="space-y-3 divide-y divide-solid ">
          <li>
            <Link href="/" className="flex items-center px-2 py-2 text-gray-800 text-md font-semibold hover:bg-gray-300 rounded-md">
              
                <span> <LuLayoutDashboard    className="w-[20px] h-[20px] mr-3"/></span>
                <span className="ml-2">Dashboard</span>
             
            </Link>
          </li>
          <li>
            <Link href="/projects" className="flex items-center px-2 py-2 text-md font-medium text-gray-800 hover:bg-gray-300  rounded-md">
             
                <span><LuBox className="w-[20px] h-[20px] mr-2"/></span>
                <span className="ml-2 text-gray-800">Products</span>
           
            </Link>
          </li>
          <li>
            <Link href="/projects" className="flex items-center px-2 py-2 text-md font-medium text-gray-800 hover:bg-gray-300  rounded-md">
             
                <span><LuList className="w-[20px] h-[20px] mr-2"/></span>
                <span className="ml-2 text-gray-800">Categories</span>
           
            </Link>
          </li>
          <li>
            <Link href="/projects" className="flex items-center px-2 py-2 text-md font-medium text-gray-800 hover:bg-gray-300  rounded-md">
             
                <span><LuHeartHandshake className="w-[20px] h-[20px] mr-2"/></span>
                <span className="ml-2 text-gray-800">Suppliers</span>
           
            </Link>
          </li>
          <li>
            <Link href="/projects" className="flex items-center px-2 py-2 text-md font-medium text-gray-800 hover:bg-gray-300  rounded-md">
             
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
