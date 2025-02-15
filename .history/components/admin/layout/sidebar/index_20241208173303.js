// components/Sidebar.js
import { LuSchool , LuMail , LuPhone, LuMailPlus ,LuLayoutDashboard  } from "react-icons/lu";
import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen -mt-2 -mb-2 -ms-2 drop-shadow-lg bg-gray-100 border border-r-2  text-white flex flex-col print:hidden">
      {/* Sidebar Header */}
      <div className="p-4 bg-gray-900">
        <p className="text-sm text-white">Monte Vista Primary School</p>
        <h2 className="text-xl font-bold">Back Office</h2>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link href="/" className="flex items-center p-2 text-medium font-medium hover:bg-gray-300 rounded-md">
              
                <span> <LuLayoutDashboard    className="w-[25px] h-[25px] mr-3"/></span>
                <span className="ml-3">Dashboard</span>
             
            </Link>
          </li>
          <li>
            <Link href="/projects" className="flex items-center p-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md">
             
                <span>📁</span>
                <span className="ml-3">Projects</span>
           
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
