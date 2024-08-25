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
      <h1 className="text-2xl font-bold mb-6">Categories</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-500">
          <thead>
            <tr>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Icon</th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"></th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="border border-gray-500">
            {categories.map((category) => (
             
              <tr key={category._id} className="border border-gray-600">
                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
              < DynamicIcon iconName={category.icon} ></DynamicIcon>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-default font-medium text-gray-700">{category.name}</td>
                <td className="px-6 py-4 word-wrap text-default text-gray-700 px-5 text-justify">{category.description}</td>
                <td className="px-6 py-4 word-wrap text-default text-gray-700 px-5 text-justify"><Link href={`/admin/categories/edit/${category._id}`} className="bg-blue-500 font-bold text-white text-sm px-5 py-2 rounded-lg">EDIT</Link></td>
                <td className="px-6 py-4 word-wrap text-default text-gray-700 px-5 text-justify"><Link href={`/admin/categories/delete/${category._id}`} className="bg-red-500 font-bold text-white text-sm px-5 py-2 rounded-lg">DELETE</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </Adminlayout>
  );
}
