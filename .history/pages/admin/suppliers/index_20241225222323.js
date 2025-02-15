import Adminlayout from '/components/admin/Layout';
import { useEffect, useState } from 'react';
import mongoose from 'mongoose';
import { HiUserGroup } from 'react-icons/hi';
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
      }, [search, suppliers]);

  return (
    <div>
        <Adminlayout>

                <div className="flex flex-col items-center justify-items-center h-full">
                    <div className="bg-white rounded-md border border-gray-300 drop-shadow-md w-[90%] min-h-[80vh] mt-5 ">
                      <div className="bg-blue-900 h-24 px-4 flex flex-row justify-center items-center">
                        <div className="flex fglex"
                      <HiUserGroup className="w-[60px] h-[60px] text-white basis-1/8"/>
                      <div className="basis-7/8 items-start flex flex-1 flex-row">
                      <h1 className="text-xl text-white font-bold">Suppliers</h1>
                      </div>
                      
                     </div>
                    <div className="flex  flex-col md:flex-row p-3 gap-3 items-center justify-center">
                      <button className="button bg-blue-700 text-white rounded-lg border-t-blue-400 border-s-blue-400 border border-b-blue-900 border-e-blue-900 font-bold py-2 px-5 basis-1/1 lg:basis-1/4"><Link href="/admin/suppliers/addnew">ADD NEW SUPPLIER</Link></button>
                      <button className="button bg-yellow-500 text-gray-900 rounded-lg border-t-yellow-200 border-s-yellow-200 border border-b-yellow-700 border-e-yellow-700 font-bold py-2 px-5 basis-1/1 lg:basis-1/4"><Link href="/admin/supplierinvoice">NEW SUPPLIER INVOICE</Link></button>
                      </div>
                      <div className="flex flex-row p-3">
                        <p className="basis-1/4">Search</p>
                        <input className="basis-3/4 py-2 px-3 rounded border border-gray-300"
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="search"/>
                      </div>
                      <table className="w-full">
                        <thead className="border border-b-gray-300 mb-2">
                            <th className="w-[5%] font-semibold text-md py-1 px-2"></th>
                            <th className="w-[25%] font-semibold text-md py-1 px-2 text-start">Name</th>
                            <th className="w-[20%] font-semibold text-md py-1 px-2 text-start">Contact</th>
                            <th className="w-[15%] font-semibold text-md py-1 px-2 text-start">Phone Number</th>
                            <th className="w-[20%] font-semibold text-md py-1 px-2 text-start">Email</th>
                            <th className="w-[10%] font-semibold text-md py-1 px-2">Edit</th>
                        </thead>
                        <tbody className="mt-3 divider-gray-300 ">
                        {filteredData.map((supplier, idx) => (
                            <tr className="py-2 border border-b-gray-300">
<td className="text-sm px-2 py-1 text-gray-900">{idx +1}</td>
<td className="text-sm px-2 py-1 text-gray-900">{supplier.name}</td>
<td className="text-sm px-2 py-1 text-gray-900">{supplier.contact}</td>
<td className="text-sm px-2 py-1 text-gray-900">{supplier.phone}</td>
<td className="text-sm px-2 py-1 text-gray-900">{supplier.email}</td>
<td className="text-sm px-2 py-1 text-gray-900 text-center"><Link href="/admin/suppliers/edit/{supplier._id}" className="py-1 px-3 bg-blue-700 mx-auto text-white font-semibold text-sm uppercase rounded-sm">EDIT</Link> </td>
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
