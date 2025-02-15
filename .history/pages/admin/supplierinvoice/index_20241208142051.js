import Adminlayout from '@/components/admin/Layout';
import { useEffect, useState } from 'react';
import mongoose from 'mongoose';
import useAuth from '@/lib/useAuth';
import { LuSchool , LuMail , LuPhone, LuMailPlus  } from "react-icons/lu";
import Image from "next/image";

export default function InvoicePage() {
  const [order, setOrder] = useState(null);
  const { user, loading } = useAuth(); 

    const [suppliers, setSuppliers] = useState([]);
    const [selectedSupplier, setSelectedSupplier] = useState('');
    const [products, setProducts] = useState([]);
    const [items, setItems] = useState([])

    const [selectedProduct, setSelectedProduct] = useState('');
    const [rows, setRows] = useState([{ id: 1, productId: '', productName: '', size: '', qty: 0, lastCost: 0, total: 0, onHand: 0, sizes: [] }]);
 const [itemDetails, setItemDetails]= useState([])

const [detailedItems, setDetailedItems]= useState([])
const  [supplier, setSupplier] = useState(null)

const [docno , setDocno]= useState("")
const [docdate, setDocDate] = useState(() => {
  const today = new Date();
  return today.toISOString().split('T')[0];
});
const numberOfLines  = rows.length
const [orders, setOrders] = useState([])


const fetchItemDetails = async () => {
  try {
    const response = await fetch('/api/transaction/costqty');
    const idet = await response.json();
    if (idet.success) {
      setItemDetails(idet.data); // 
      console.log(idet.data)
    }
  } catch (error) {
    console.error('Error fetching product or calculating price range:', error);
  }
};


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
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/product');
        const data = await response.json();
        if (data.success) {
          setProducts(data.data);
          
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [])

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('/api/items');
        const data = await response.json();
        if (data.success) {
          setItems(data.data);
          console.log(items);
          await fetchItemDetails();
         const fulldet = items.map(item => {
              const transaction = itemDetails.find(t => t._id === item._id);
              return {
                ...item,
                totalOnHand: transaction ? transaction.totalOnHand : 0,
                costPrice: transaction ? transaction.costPrice : 0
              };
            });
            setDetailedItems(fulldet)
          };
          console.log(detailedItems)
        
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, [])




  const handleAddItem = () => {
    setItems([...items, { stockItem: '', quantity: 0, costPrice: 0 }]);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };


  const handleSupplierChange = (e) => {
    const selectedSupplier = suppliers.find(
      (supp) => supp._id === e.target.value
    );
    setSupplier(selectedSupplier);
  };


  
 
    const printPurchaseOrder = () => {
      window.print();
    };
  
    const addRow = () => {
      setRows([...rows, { id: rows.length + 1,productId:'', productName: '', size: '', qty: 0, cost: 0, total: 0, onHand: 0, sizes: [] }]);
    };
  
    const getTotalSum = () => {
      return rows.reduce((sum, row) => sum + row.total, 0);
    };
  
    const handleSubmit = async(event) => {
      event.preventDefault();
      console.log('Form details:', rows  );

      if (!supplier){
        alert("Please choose a supplier ")
return

      }

      if(!docno){
        alert("Please add the Supplier's invoice number")
        return
      }

      if(!docdate){
        alert("Please enter the invoice date")
        return
      }

      // Data Validation
  let hasError = false;
  rows.forEach((row, index) => {
    if (!row.product || !row.item || row.qty <= 0 || row.cost <= 0) {
      hasError = true;
      alert(`Please fill all fields correctly for line ${index + 1}`);
    }
  });

  if (hasError) return; // Prevent submission if there's any error

  const supplierInv = {
    transactType:"Supplier Invoice",
    party: supplier.name,
    enteredBy:user.email,  // Just pass the supplier ID
    docNumber: docno,              // Pass as plain variables, not wrapped in curly braces
    transactDate: docdate,          // Pass as plain variables
    rows: rows                // Pass rows directly
  };

  try {
    const response = await fetch('/api/transaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(supplierInv),
    });

    const result = await response.json();
    if (response.ok) {
      alert('Invoice submitted successfully!');
    } else {
      alert(`Error: ${result.message}`);
    }
  } catch (error) {
    console.error('Error submitting invoice:', error);
    alert('An error occurred while submitting the invoice.');
  }
};


 // Function to handle product change for a specific line
//  const handleProductChange = async (index, productId) => {
//   const updatedLines = [...lines];
//   updatedLines[index].selectedProduct = productId;

//   if (productId) {
//     // Fetch sizes for the selected product
//     const response = await fetch(`/api/items/${productId}`);
//     const data = await response.json();
//     updatedLines[index].sizes = data.items; // Assuming items contain size information
//   } else {
//     // Reset sizes if no product is selected
//     updatedLines[index].sizes = [];
//   }

//   setLines(updatedLines);
// };

// Function to handle size change for a specific line
const handleSizeChange = (index, size) => {
  const updatedLines = [...lines];
  updatedLines[index].selectedSize = size;
  setLines(updatedLines);
};

   
function filterItemsByProd(items, productId) {
  // Return only the items where 'name' matches the 'nameFilter'
  return items.filter(item => item.product === productId);
}
   
   
    const handleProductChange = (index, value) => {
      const product = products.find(pro => pro._id === value); // Match product by ID
      const newRows = [...rows];
 
      const prodItems = filterItemsByProd(detailedItems,product._id)
      
      if (product) {
        newRows[index].product = product; // Store product ID
        newRows[index].productId = product._id;
        newRows[index].productName = product.name; // Store product name
        newRows[index].lastCost =  0; // Set default cost price
        newRows[index].sizes = prodItems; // Store sizes array
        newRows[index].size = []; // Reset the size field when a product is selected
        newRows[index].onHand = 0; // Reset stock on hand
      } else {
        // Reset if no product is found
        newRows[index].productId = '';
        newRows[index].productName = '';
        newRows[index].lastCost = '';
        newRows[index].sizes = [];
      }
    
      setRows(newRows); // Update state
    };
    const handleChange = (index, field, value) => {
      const newRows = [...rows];
      newRows[index][field] = value !== undefined ? value : '';
  
      if (field === 'size') {
        const selectedSize = newRows[index].sizes.find(siz => siz.size === value);
        if (selectedSize) {
          newRows[index].item = selectedSize
          newRows[index].cost = selectedSize.costPrice.toFixed(2);
          newRows[index].qty =  1;
          newRows[index].total = newRows[index].qty * newRows[index].cost;
        } else {
          newRows[index].size = []
          newRows[index].cost = (0).toFixed(2);
          newRows[index].qty = 0;
          newRows[index].total = 0;
        }
      }
  
      if (field === 'qty' ||  field === 'cost') {
        newRows[index].total = newRows[index].qty * newRows[index].cost;
      }

   
  
      setRows(newRows);
    };

    const handleBlur  = (index , value)=>{
      const OldRows = [...rows];
      OldRows[index].cost = (value).toFixed(2);
      setRows(OldRows);

    }
  



  return (
    <Adminlayout>
    <div className="max-w-4xl mx-auto mt-10 bg-white  rounded-lg">
    <div className="flex flex-row justify-around items-center pb-3">
            <div className="basis-3/8 justify-between items-center">
            <Image src="/Badge.png" width={150} height={200} alt="Monte Vista Badge" className="mx-5 my-2"></Image>
            </div>
            <div className="basis-5/8 py-0 ">
            <div className="flex flex-col">
           <h1 className="text-xl font-bold me-5 mb-2 text-gray-800">SUPPLIER INVOICE/GOODS RECEIVED</h1>
           <h2 className="text-2xl font-bold  mb-2 text-slate-800">Monte Vista Primary School</h2>
           <div className="flex flex-row items-center me-5 text-slate-800">
            <div className="basis-1/8">
          <LuSchool className="w-[25px] h-[25px] mr-3"/>
          </div>
          <div className="basis-7/8">
           <p className="text-md text-end">7 Huising Avenue, Monte Vista , 7460</p>
           </div>
            </div>
            <div className="flex flex-row items-center text-slate-800">
            <div className="basis-1/8">
            <LuMail   className="w-[25px] h-[25px] mr-3"/>
          </div>
          <div className="basis-7/8 ">
           <p className="text-md text-end">clothingstore@montevistaps.co.za</p>
           </div>
            </div>
            <div className="flex flex-row items-center">
            <div className="basis-1/8">
          <LuPhone   className="w-[25px] h-[25px] mr-3"/>
          </div>
          <div className="basis-7/8 ">
           <p className="text-md text-end me-3">021 558 4637</p>
           </div>
            </div>
            </div>
          </div>
            </div>
      
      <div className="m-5 ">
      <form onSubmit={handleSubmit}>
      <div className="flex flex-row">
      <div className="basis-1/2  px-5">
       
       
     <div className="flex flex-row items-center content-center">
<div className="basis-1/4">
        <label className="block text-md  mb-2 text-gray-700" htmlFor="name">
         Supplier:
        </label>
        </div>
        <div className="basis-3/4">
        <select
              name="creditor"
              onChange={handleSupplierChange}
              className="form-select w-full px-3 text-md py-1 mb-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            >
              <option></option>
              {suppliers.map((sup) => (
                <option key={sup._id} value={sup._id}>
                  {sup.name}
                </option>
              ))}
            </select>
            </div>
            </div>
 {supplier && (
  <>
  <div className="flex flex-row mb-2">
       
        <div className="basis-1/3"><p className="block text-sm text-gray-700  mb-2">Address:</p></div>
        <div className="basis-2/3">
          <p className="block text-sm text-gray-700 px-3 leading-tight">{supplier.street}</p>
          <p className="block text-sm text-gray-700 px-3 leading-tight">{supplier.city}</p>
          <p className="block text-sm text-gray-700 px-3 leading-tight mb-2">{supplier.postalCode}</p>
          </div>
          </div>
          <div className="flex-row flex ">
            <div className="basis-1/4">    <LuMail   className="w-[25px] h-[25px] mr-3"/></div>
            <div className="basis-2/3">
          <p className="block text-sm  px-3 text-gray-700  mb-2">{supplier.phone}</p>
          </div>
          </div>
          <div className="flex flex-row">
            <div className="basis-1/3"> <p className="block text-sm text-gray-700  mb-2">Email:</p></div>
<div className="basis-2/3">
          <p className="block text-sm  px-3 text-gray-700 " >{supplier.email}</p>
          </div>
        </div>
      
      </>
      )}


       
        </div>
        <div className="basis-1/2 px-4 items-start content-start py-3">

        <div className="flex flex-row items-start content-start">
          <div className="basis-1/3">

<label className="block text-sm  mb-2 text-gray-700 mr-5" htmlFor="name">
 Invoice Number:
</label>
</div>
<div className="basis-2/3">
<input  className="form-select text-md w-full px-3 ml-3 py-1 mb-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
type="text"
value={docno}
onChange={(e)=>setDocno(e.target.value)}/>
    </div>
    </div>
        

        <div className="flex flex-row items-center content-center">
        <div className="basis-1/3">

<label className="block text-sm  mb-2 text-gray-700 mr-5" htmlFor="name">
 Invoice Date:
</label>
</div>
<div className="basis-2/3">
<input  className="form-select w-full text-md px-3 ml-3 py-1 mb-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
type="date"
value={docdate}
onChange={(e)=>setDocDate(e.target.value)}/>
    </div>
    </div>
    <div className="flex flex-row items-center content-center">
        <div className="basis-1/3">

<label className="block text-sm  mb-2 text-gray-700 mr-5" htmlFor="name">
 Order Number:
</label>
</div>
<div className="basis-2/3">
<select
  className="form-select text-sm w-full px-3 ml-3 py-1 mb-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
  value={order}
  onChange={(e) => setOrder(e.target.value)} // Corrected this line
>
  <option></option>
  {orders.map((ord) => (
    <option key={ord._id} value={ord._id}>
      {ord.number}
    </option>
  ))}
</select>
    </div>
    </div>
   
       
        </div>
        </div>
        <div className="border border-t-slate-300 my-3 "></div>
       
        <div className="mb-4">
          <div className="flex flex-row">
            <div className="basis-3/4 items-center content-center ">
          <h2 className="text-lg px-5 font-semibold  text-start  text-gray-700 mb-2">Received Items</h2>
          </div>
          <div className="basis-1/4 content-center items-center">
          <button type="button" className=" bg-gray-200 py-2 font-semibold px-5 mx-auto text-gray-900 mb-3 rounded-md " onClick={addRow}>Add Line</button>
          </div>
          </div>
          <div className="min-h-[300px] w-full">
          <table className="w-full table-fixed mb-4 ">
            <thead className="bg-gray-600 text-gray-800 font-medium w-full">
              <th className="w-[5%] border border-gray-200 text-white font-medium text-md p-3"></th>
              <th className="w-[35%] border border-gray-200 text-white font-medium text-md text-start p-3">Product</th>
              <th className="w-[10%] border border-gray-200  text-white font-medium text-md p-3">Variant</th>
              <th className="w-[10%] border border-gray-200 text-white font-medium text-md p-3">Qty</th>
              <th className="w-[15%] border border-gray-200 text-white font-medium text-md py-3 px-4 text-end">Cost Price</th>
              <th className="w-[15%] border border-gray-200 text-white font-medium text-md py-3 px-4 text-end">Subtotal</th>
            </thead>
            <tbody >
   
         
            {rows.map((row, index) => (
            <tr  className="h-auto">
              <td className="border border-gray-300 text-center py-1 text-md">{index + 1}</td>
         
              <td  className="border border-gray-300  text-center py-1">

           
<select
  className="form-select text-sm w-full text-gray-700 rounded-md focus:outline-none"
  value={row.productId ? row.productId : ''} // Use productId instead of productName for the value
  onChange={(e) => handleProductChange(index, e.target.value)} // Call the correct handler
>
  <option value="">Select Product</option>
  {products.map((product, idx) => (
    <option key={idx} value={product._id}>
      {product.name}
    </option>
  ))}
</select>
                          </td>
                          <td  className="border border-gray-300 text-center py-1">
                            <select className="form-select text-sm w-full  text-gray-700  text-center rounded-md focus:outline-none "
                              value={row.size}
                              onChange={(e) => handleChange(index, 'size', e.target.value)}
                            >
                              <option value="">Select Size</option>
                              {row.sizes.map((siz, idx) => (
                                <option key={idx} value={siz.size}>{siz.size}</option>
                              ))}
                            </select>
                          </td>
                          <td  className="border border-gray-300  py-1">
                            <input className="form-select text-sm w-full  text-center text-gray-700  rounded-md focus:outline-none "
                              type="number"
                              min="0"
                              max="99999999"
                              value={row.qty || 0}
                              onChange={(e) => handleChange(index, 'qty', parseFloat(e.target.value))}
                            />
                          </td>
                          <td  className="border border-gray-300 font-medium text-end py-1">
                            <input className="select text-sm w-full text-end text-gray-700 px-4 rounded-md focus:outline-none "
                             
                              value={row.cost || 0}
                              type="number"
                              min="0"
                              max="99999999"
                              onChange={(e) => handleChange(index, 'cost', parseFloat(e.target.value))}
                              onBlur = {(e) => handleBlur(index, parseFloat(e.target.value))}
                            />
                          </td>
                          <td  className="border border-gray-300 font-medium text-end py-1">
                            <input className="form-select text-sm w-full text-end text-gray-700 px-4 rounded-md focus:outline-none "
                              type="text"
                              tabIndex="-1"
                              value={`R ${row.total.toFixed(2)}`}
                              disabled
                            />
                          </td>
                  
            </tr>
          ))}
   </tbody>
          </table  >
          </div>
         <table className="w-full mb-12">
          <tbody>
                      <tr>
                        <td className="w-1/2"></td>
                        <td  className="w-1/4 text-center text-gray-600 text-lg font-bold"><h3 className="formheadtext pt-3">Order Total</h3></td>
                        <td className="w-1/4  "><input className="total text-end bg-white text-gray-600 text-lg font-bold pt-3 border-t border-t-gray-600 border-b-[3px] border-double border-b-gray-600 px-4"
                          type="text"
                          tabIndex="-1"
                          value={`R ${getTotalSum().toFixed(2)}`}
                          disabled
                        /></td>
                      </tr>
                    </tbody>
                  </table>
              
            
             
          <div className="flex flex-row gap-6 invoice-btn-section clearfix d-print-none">
            <div className="basis-1/2 px-5 ">
              <button onClick={printPurchaseOrder} type="button" className="btn btn-lg btn-print">
                <i className="fa fa-print"></i> Print Invoice
              </button>
              </div>
              <div className="basis-1/2 px-5 mb-6">
              <button type="submit" className="px-4 py-2 bg-yellow-400 text-gray-600 rounded-md font-bold text-md w-full text-center border border-b-yellow-600 border-t-yellow-200 border-l-yellow-200 border-r-yellow-600 drop-shadow-sm">
                SUBMIT INVOICE
        </button>
            </div>
            </div>
        
   
         
       
     
      </div>
      </form>
    </div>
    </div>
    </Adminlayout>
  );
}