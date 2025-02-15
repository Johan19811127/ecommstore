import Adminlayout from '@/components/admin/Layout';
import { useEffect, useState } from 'react';
import mongoose from 'mongoose';

import React from 'react'

export default function Suppliers() {
    const [suppliers, setSuppliers] = useState([]);
    

    useEffect(() => {
        const fetchSuppliers = async () => {
          try {
            const response = await fetch('/api/supplier');
            const data = await response.json();
            if (data.success) {
              setSuppliers(data.data);
            }
          } catch (error) {
            console.error('Error fetching suppliers:', error);
          }
        };
    
        fetchSuppliers();
      }, []);
  return (
    <div>
        <Adminlayout>
            <div className="w-full p-3 border border-b-gray-300 bg-white shadow-md ">
                <p className="text-md font-bold text-gray-900 text-center uppercase "> All Suppliers</p>
                </div>
                <div className="flex flex-col items-center justify-items-center h-full">
                    <div className="bg-white rounded-md border border-gray-300 drop-shadow-md w-[80%] mt-5 p-5">
                      <table className="w-full">
                        <thead className="border border-b-gray-300 mb-2">
                            <th className="w-[5%] font-medium text-md py-1 px-3"></th>
                            <th className="w-[25%] font-medium text-md py-1 px-2 text-start">Name</th>
                            <th className="w-[20%] font-medium text-md py-1 px-2 text-start">Contact</th>
                            <th className="w-[15%] font-medium text-md py-1 px-2 text-start">Phone Number</th>
                            <th className="w-[20%] font-medium text-md py-1 px-3 text-start">Email</th>
                            <th className="w-[10%] font-medium text-md py-1 px-3">Edit</th>
                        </thead>
                        {suppliers.map((supplier, idx) => (
                            <tr>
<td className="text-sm px-2 py-1">{idx +1}</td>
<td>{supplier.name}</td>
<td>{supplier.contact}</td>
<td>{supplier.phone}</td>
<td>{supplier.email}</td>
<td></td>
                            </tr>
  
  ))}
                      </table>

                    </div>
                </div>
            
        </Adminlayout>
    </div>
  )
}
