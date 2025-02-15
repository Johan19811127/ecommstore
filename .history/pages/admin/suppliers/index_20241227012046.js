import Adminlayout from '/components/admin/Layout';
import { useEffect, useState } from 'react';
import mongoose from 'mongoose';
import { LuHeartHandshake } from 'react-icons/lu';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
 

import Link from 'next/link';
DataTable.use(DT);

export default function Suppliers() {
    const [suppliers, setSuppliers] = useState([]);
    const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
 const [noOfSup, setNoOfSup] = useState([])
 
  const noOfSup = filteredData.count()

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
                    <div className="bg-white rounded-md flex flex-col w-[90%] min-h-[80vh] my-auto ">
                      <div className="bg-blue-900 h-24 px-4 flex flex-row justify-center items-center gap-3 ">
                        <div className="flex flex-col basis-1/8 px-5">
                      <LuHeartHandshake className="w-[60px] h-[60px] text-white basis-2/12"/></div>
                      <div className="basis-10/12 items-start flex flex-1 flex-col">
                      <h1 className="text-xl text-white font-md">Suppliers</h1>
                      <p className="text-white text-sm leading-tight">You can manage suppliers by adding, editing, or deleting their details. Use the search bar to filter the supplier list by any attribute, such as name or contact information. Additionally, you can access supplier invoices to efficiently add stock to your inventory.</p>
                      </div>
                      
                     </div>
                  <div className="py-3 px-5 flex flex-1 flex-col">
                      <div className="flex flex-row p-3 items-center justify-center">
                        <p className="basis-1/12 p-3">Search</p>
                        <input className="basis-3/12 py-2 px-3 rounded border border-gray-400"
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="search"/>
                   <div className="basis-1/1 lg:basis-4/12 flex flex-col "></div>
                      <div className="flex  flex-col md:flex-row basis-4/12 px-2 gap-5 flex-1 items-center justify-center">
                      <button className="button bg-blue-700 text-white rounded-lg border-t-blue-400 border-s-blue-400 border border-b-blue-900 border-e-blue-900 font-bold py-2 px-5 basis-1/1 lg:basis-1/2"><Link href="/admin/suppliers/addnew">ADD SUPPLIER</Link></button>
                      <button className="button bg-yellow-500 text-gray-900 rounded-lg border-t-yellow-200 border-s-yellow-200 border border-b-yellow-700 border-e-yellow-700 font-bold py-2 px-5 basis-1/1 lg:basis-1/2"><Link href="/admin/supplierinvoice">SUPPLIER INVOICES</Link></button>
                      </div>
                      </div>
                      <table className="w-full ">
                        <thead className="border border-b-gray-300  bg-blue-900 text-white mb-2">
                            <th className="w-[5%] font-semibold text-md py-1 px-2 text-center">No</th>
                            <th className="w-[25%] font-semibold text-md py-1 px-2 text-start border border-white">Name</th>
                            <th className="w-[20%] font-semibold text-md py-1 px-2 text-start border border-white">Contact</th>
                            <th className="w-[15%] font-semibold text-md py-1 px-2 text-start border border-white">Phone Number</th>
                            <th className="w-[20%] font-semibold text-md py-1 px-2 text-start border border-white">Email</th>
                            <th className="w-[10%] font-semibold text-md py-1 px-2">Edit</th>
                        </thead>
                        <tbody className="mt-3 divider-gray-300 ">
                        {filteredData.map((supplier, idx) => (
                            <tr className="py-2 border border-b-gray-300">
<td className="text-sm px-2 py-1 text-gray-900 text-center">{idx +1}</td>
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
                    <div className="flex-flex-col bg-white w-full p-5">
                      <div className="flex basis-1/3">
                      
                    </div>
  <div className="flex basis-1/3">
                      <p className="text-sm ">Monte Vista Primary School</p>
                      </div>           
                      <div className="flex flex-col basis-1/3">
                      <p className="basis-1/2 text-sm">No of Suppliers showing:</p>
                      <p className="basis-1/2 text-sm">{noOfSup}</p>
                      </div>       
                        </div>

                </div>
            </div>
        </Adminlayout>
    </div> 
  )
}
