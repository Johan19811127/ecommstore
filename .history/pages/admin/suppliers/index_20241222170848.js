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
                      <table className=>
                        <thead className="border border-b-gray-300 ">
                            <th className="w-[5%] font-medium text-md py-1 px-3"></th>
                            <th className="w-[35%] font-medium text-md py-1 px-3">Name</th>
                            <th className="w-[10%] font-medium text-md py-1 px-3">Contact</th>
                            <th className="w-[15%] font-medium text-md py-1 px-3">Phone Number</th>
                            <th className="w-[20%] font-medium text-md py-1 px-3">Email</th>
                            <th className="w-[10%] font-medium text-md py-1 px-3">Edit</th>
                        </thead>
                      </table>
                    </div>
                </div>
            
        </Adminlayout>
    </div>
  )
}
