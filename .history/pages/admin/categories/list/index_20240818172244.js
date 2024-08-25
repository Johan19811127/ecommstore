// pages/categories.js

import DynamicIcon from '@/components/DynamicIcon';
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
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Categories</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Icon</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
             
              <tr key={category._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.name}</td>
                <td className="px-6 py-4 word-wrap text-sm text-gray-500 px-5">{category.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              < DynamicIcon iconName=
                </td>>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
