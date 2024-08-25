// pages/categories.js

import Adminlayout from '@/components/admin/Layout';
import DynamicIcon from '@/components/DynamicIcon';
import Link from 'next/link';
import { useEffect, useState } from 'react';


export default function Categories() {
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/category');
        const data = await response.json();
        if (data.success) {
          setCategories(data.data);
          console.log(categories)
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Adminlayout>
    <div className="max-w-6xl mx-auto p-6">
        <div className="flex flex-row items-center mb-4">
            <div className="basis-1/2 ">
      <h1 className="text-2xl font-bold mb-4 ">Categories</h1>
      </div>
      <div className="basis-1/2 text-end">
      <Link href="/admin/categories/new" className="text-sm text-white bg-blue-500 py-2 px-3 font-bold shadow-sm rounded-lg ml-auto mr-5">ADD A CATEGORY</Link>
      </div>
      </div>
      {categories.length > 0 ? (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="border border-gray-300">
            <tr>
            <th className="px-6 py-3 border border-bottom-gray-300 bg-gray-200 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Icon</th>
              <th className="px-6 py-3 border border-bottom-gray-300 bg-gray-200 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 border border-bottom-gray-300 bg-gray-200 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Description</th>
              <th className="px-2 py-3 border border-bottom-gray-300 bg-gray-200 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"></th>
              <th className="px-2 py-3 border border-bottom-gray-300 bg-gray-200 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
             
              <tr key={category._id} className="border border-gray-300">
                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
              < DynamicIcon iconName={category.icon} ></DynamicIcon>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">{category.name}</td>
                <td className="px-6 py-4 word-wrap text-sm text-gray-700 px-5 text-justify leading-tight">{category.description}</td>
                <td className="px-2 py-4 word-wrap text-sm text-gray-700 px-2 text-justify"><Link href={`/admin/categories/edit/${category._id}`} className="bg-gray-300 hover:bg-gray-700 font-semibold shadow-md hover:shadow-none text-slate-700 hover:text-white text-sm px-3 py-2 rounded-lg">EDIT</Link></td>
                <td className="px-2 py-4 word-wrap text-sm text-gray-700 px-2 text-justify"><Link href={`/admin/categories/delete/${category._id}`} className=" bg-gray-300 hover:bg-red-500 font-semibold shadow-md hover:shadow-none text-slate-700 hover:text-white text-sm px-3 py-2 rounded-lg">DELETE</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>):(
        <p className="text-default text-gray-700 text-center pt-3 mt-3">No categories are currently available. Please add categories by clicking on the button above.</p>

        
    </Adminlayout>
  );
}
