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
                </
                <div className="flex flex-col items-center justify-center p-5">
                    <div className="bg-white rounded-md border border-gray-300 drop-shadow-md w-[80%]">
                        A list of all your suppliers
                    </div>
                </div>
            
        </Adminlayout>
    </div>
  )
}
