import Adminlayout from '/components/admin/Layout';
import { useEffect, useState } from 'react';
import mongoose from 'mongoose';

import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
 

import Link from 'next/link';
DataTable.use(DT);

export default function Suppliers() {
    const [suppliers, setSuppliers] = useState([]);
    const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
 

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

      useEffect(() => {
        setFilteredData(
          suppliers.filter((item) =>
            Object.values(item)
              .join(" ")
              .toLowerCase()
              .includes(search.toLowerCase())
          )
        );
      }, [search, data]);

  return (
    <div>
        <Adminlayout>
            <div className="w-full p-3 border border-b-gray-300 bg-white shadow-md ">
                <p className="text-md font-bold text-gray-900 text-center uppercase "> All Suppliers</p>
                </div>
                <div className="flex flex-col items-center justify-items-center h-full">
                    <div className="bg-white rounded-md border border-gray-300 drop-shadow-md w-[80%] min-h-[80vh] mt-5 p-5">
                      <div class
                      <table columns={columns} className="w-full">
                        <thead className="border border-b-gray-300 mb-2">
                            <th className="w-[5%] font-semibold text-md py-1 px-2"></th>
                            <th className="w-[25%] font-semibold text-md py-1 px-2 text-start">Name</th>
                            <th className="w-[20%] font-semibold text-md py-1 px-2 text-start">Contact</th>
                            <th className="w-[15%] font-semibold text-md py-1 px-2 text-start">Phone Number</th>
                            <th className="w-[20%] font-semibold text-md py-1 px-2 text-start">Email</th>
                            <th className="w-[10%] font-semibold text-md py-1 px-2">Edit</th>
                        </thead>
                        <tbody className="mt-3 divider-gray-300 ">
                        {suppliers.map((supplier, idx) => (
                            <tr>
<td className="text-sm px-2 py-1 text-gray-900">{idx +1}</td>
<td className="text-sm px-2 py-1 text-gray-900">{supplier.name}</td>
<td className="text-sm px-2 py-1 text-gray-900">{supplier.contact}</td>
<td className="text-sm px-2 py-1 text-gray-900">{supplier.phone}</td>
<td className="text-sm px-2 py-1 text-gray-900">{supplier.email}</td>
<td className="text-sm px-2 py-1 text-gray-900"><Link href="/admin/suppliers/edit/{supplier._id}" className="py-1 px-3 bg-blue-500 text-white font-semibold text-sm uppercase rounded-sm">EDIT</Link> </td>
                            </tr>
  
  ))}
  </tbody>
                      </table>

                    </div>
                </div>
            
        </Adminlayout>
    </div> 
  )
}
