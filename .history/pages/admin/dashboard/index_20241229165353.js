import Adminlayout from '/components/admin/Layout';
import { useEffect, useState } from 'react';
import mongoose from 'mongoose';
import { LuHeartHandshake } from 'react-icons/lu';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
 

import Link from 'next/link';
DataTable.use(DT);

export default function Dashboard() {
    const [suppliers, setSuppliers] = useState([]);
    const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const noOfSup = filteredData.length

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
<div className="p-5">
<h1 className="text-3xl text-center font-bold">DASHBOARD</h1>
<div className="grid grid-cols-1  lg:grid-cols-4 w-full gap-5">
  <div className="card p-7 bg-white rounded-lg border border-gray-400 shadow-md w-full h-[170px] items-center justify-center">
    <h2 className="text-"
  </div>

</div>


</div>
</Adminlayout>
</div>
  )

}