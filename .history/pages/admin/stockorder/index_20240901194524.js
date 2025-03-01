
import { useState, useEffect } from 'react';

import HomeIcon from '@mui/icons-material/Home';
import PhoneIcon from '@mui/icons-material/Phone';
import DraftsIcon from '@mui/icons-material/Drafts';
import PersonIcon from '@mui/icons-material/Person';
import html2canvas from 'html2canvas';
import Adminlayout from '@/components/admin/Layout';

const PurchaseOr = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [rows, setRows] = useState([{ id: 1, productName: '', size: '', qty: 0, lastCost: 0, total: 0, onHand: 0, sizes: [] }]);

  // useEffect(() => {
  //   // Fetch suppliers from Firestore
  //   // const fetchSuppliers = async () => {
  //   //   const suppliersSnapshot = await firestore.collection('suppliers').get();
  //   //   const suppliersList = suppliersSnapshot.docs.map(doc => ({
  //   //     id: doc.id,
  //   //     ...doc.data()
  //   //   }));
  //   //   setSuppliers(suppliersList);
  //   // };
  //   // fetchSuppliers();
  // }, []);

  // useEffect(() => {
  //   // Fetch items from Firestore
  //   const fetchItems = async () => {
  //     const itemsSnapshot = await firestore.collection('items').get();
  //     const itemsList = itemsSnapshot.docs.map(doc => ({
  //       ...doc.data(),
  //       id: doc.id,
  //     }));
  //     setItems(itemsList);
  //   };
  //   fetchItems();
  // }, []);

  // useEffect(() => {
  //   if (selectedSupplier) {
  //     // Fetch products from the selected supplier
  // //     const fetchProducts = async () => {
  // //       const productsSnapshot = await firestore.collection('products')
  // //         .where('supplier', 'in', [selectedSupplier.name, ''])
  // //         .get();
  // //       const productsList = productsSnapshot.docs.map(doc => ({
  // //         id: doc.id,
  // //         ...doc.data()
  // //       }));
  // //       setProducts(productsList);
  // //     };
  // //     fetchProducts();
  // //   }
  // // }, [selectedSupplier]);

  const handleSupplierChange = (e) => {
    const supplier = suppliers.find(sup => sup.id === e.target.value);
    setSelectedSupplier(supplier);
    setProducts([]); // Reset products when supplier changes
    setSelectedProduct(null); // Reset selected product when supplier changes
    const newRows = rows.map(row => ({ ...row, productName: '', size: '', onHand: 0, lastCost: 0, total: 0, sizes: [] }));
    setRows(newRows); // Reset rows when supplier changes
  };

  const handleProductChange = (index, value) => {
    const product = products.find(pro => pro.name === value);
    const newRows = [...rows];
    if (product) {
      newRows[index].productName = product.name;
      newRows[index].lastCost = product.lastcost || 0; // Ensure lastCost is set if available
      setSelectedProduct(product);

      // Fetch sizes for the selected product
      const filteredItems = items.filter(item => item.productId === product.name);
      newRows[index].sizes = filteredItems;
      newRows[index].size = '';
      newRows[index].onHand = 0;
    } else {
      newRows[index].productName = '';
      newRows[index].lastCost = 0;
      setSelectedProduct(null);
      newRows[index].sizes = [];
    }
    setRows(newRows);
  };

  const handleChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value !== undefined ? value : '';

    if (field === 'size') {
      const selectedSize = newRows[index].sizes.find(size => size.id === value);
      if (selectedSize) {
        newRows[index].lastCost = Number(selectedSize.lastcost).toFixed(2) || 0;
        newRows[index].onHand = selectedSize.onHand || 0;
      } else {
        newRows[index].lastCost = 0;
        newRows[index].onHand = 0;
      }
    }

    if (field === 'qty' || field === 'lastCost') {
      newRows[index].total = newRows[index].qty * newRows[index].lastCost;
    }

    setRows(newRows);
  };

  const printPurchaseOrder = () => {
    window.print();
  };

  const addRow = () => {
    setRows([...rows, { id: rows.length + 1, productName: '', size: '', qty: 0, lastCost: 0, total: 0, onHand: 0, sizes: [] }]);
  };

  const getTotalSum = () => {
    return rows.reduce((sum, row) => sum + row.total, 0);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form details:', rows);
  };

  return (
    <>
    <Adminlayout>
    <div className="max-w-4xl mx-auto mt-10 bg-white p-4 rounded-lg">
    
                <div className="text-center py-2">
                
                      <h1 cklass>Purchase Order</h1>
                    </div>
              
              <div className="invoice-titel">
                <div className="flex flex-row">
                  <div className="basis-1/2">
                    <div className="invoice-number">
                      <h3>Invoice Number: #45613</h3>
                    </div>
                  </div>
                  <div className="basis-1/2">
                    <div className="invoice-date">
                      <h3 className="text-start">Invoice Date: {new Date().toLocaleDateString()}</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="invoice-info" style={{ padding: "5px 40px" }}>
                <div className="flex flex-row">
                  <div className="basis-1/2">
                    <div className="invoice-number text-start ms-2">
                      <h3 className="formheadtext">Supplier Details</h3>
                      <div className="flex flex-row">
                 
                          <div className="basis-1/3">
                            <p className="my-0">Supplier:</p>
                          </div>
                          <div className="basis-2/3">
                            <select className="form-select supsel" onChange={handleSupplierChange} value={selectedSupplier ? selectedSupplier.id : ''}>
                              <option value="">Supplier</option>
                              {suppliers.map(supplier => (
                                <option key={supplier.id} value={supplier.id}>
                                  {supplier.name}
                                </option>
                              ))}
                            </select>
                          </div>
                      
                        {selectedSupplier && (
                          <div className="m-0 p-0">
                            <div className="row m-0 p-0">
                              <div className="col-2 text-center">
                                <p className="field py-0 my-0"><HomeIcon /></p>
                              </div>
                              <div className="col-10">
                                <p className="field py-0 my-0">{selectedSupplier.address}</p>
                              </div>
                            </div>
                            <div className="row m-0 p-0">
                              <div className="col-2 text-center">
                                <p className="field py-0 my-0"><PhoneIcon /></p>
                              </div>
                              <div className="col-10">
                                <p className="field py-0 my-0">{selectedSupplier.telephone}</p>
                              </div>
                            </div>
                            <div className="row m-0 p-0">
                              <div className="col-2 text-center">
                                <p className="field py-0 my-0"><DraftsIcon /></p>
                              </div>
                              <div className="col-10">
                                <p className="field py-0 my-0">{selectedSupplier.email}</p>
                              </div>
                            </div>
                            <div className="row m-0 p-0">
                              <div className="col-2 pe-2 text-center">
                                <p className="field py-0 my-0"><PersonIcon />:</p>
                              </div>
                              <div className="col-10">
                                <p className="field py-0 my-0">{selectedSupplier.contact}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 mb-30">
                    <div className="invoice-number text-start ms-2">
                      <h3 className="formheadtext">Invoice Details</h3>
                      <div className="flex-row flex">
                        <div className="basis-1/6"></div>
                        <div className="basis-5/6">
                          <p className="field py-0 my-1">Monte Vista Primary School</p>
                        </div>
                      </div>
                      <div className="flex flex-row">
                        <div className="basis-1/6 pe-2 text-center field"><HomeIcon /></div>
                        <div className="basis-5/6">
                          <p className="field py-0 my-0">9 Huising Avenue, Monte Vista, 7460</p>
                        </div>
                      </div>
                      <div className="flex flex-row">
                        <div className="basis-1/6 pe-2 text-center field"><PhoneIcon /></div>
                        <div className="basis-5/6">
                          <p className="field py-0 my-0">(021) 558 4637</p>
                        </div>
                      </div>
                      <div className="flex flex-row">
                        <div className="basis-1/6 pe-2 text-center field"><DraftsIcon /></div>
                        <div className="basis-5/6 text-left">
                          <p className="field pt-0 mt-0">clothingstore@montevistaps.co.za</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-summary">
                <div className="row mt-3 pb-2">
                  <div className="col-9 text-start ps-2">
                    <h3 className="formheadtext">Product Details</h3>
                    <p className="small text-start">Please Note: Only products from the listed supplier or those without a specified supplier are available for selection.</p>
                  </div>
                  <div className="col-2">
                    <button type="button" className="greybutton" style={{ margin: '0px' }} onClick={addRow}>Add Line</button>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table invoice-table">
                    <thead className="bg-active">
                      <tr>
                        <th style={{ width: '35%' }}>Product</th>
                        <th style={{ width: '15%' }}>Size</th>
                        <th className="text-center" style={{ width: '10%' }}>Qty</th>
                        <th className="text-center" style={{ width: '15%' }}>Cost</th>
                        <th className="text-right" style={{ width: '20%' }}>Totals</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row, index) => (
                        <tr key={row.id}>
                          <td>
                            <select className="form-select por"
                              value={row.productName}
                              onChange={(e) => handleProductChange(index, e.target.value)}
                            >
                              <option value="">Select Product</option>
                              {products.map((product, idx) => (
                                <option key={idx} value={product.name}>{product.name}</option>
                              ))}
                            </select>
                          </td>
                          <td>
                            <select className="form-select por"
                              value={row.size}
                              onChange={(e) => handleChange(index, 'size', e.target.value)}
                            >
                              <option value="">Select Size</option>
                              {row.sizes.map((size, idx) => (
                                <option key={idx} value={size.id}>{size.value}</option>
                              ))}
                            </select>
                          </td>
                          <td>
                            <input className="form-control text-center por"
                              type="number"
                              min="0"
                              max="99999999"
                              value={row.qty || 0}
                              onChange={(e) => handleChange(index, 'qty', parseFloat(e.target.value))}
                            />
                          </td>
                          <td>
                            <input className="form-control text-end por"
                              type="number"
                              value={row.lastCost}
                              readOnly
                            />
                          </td>
                          <td>
                            <input className="form-control text-end por"
                              type="text"
                              tabIndex="-1"
                              value={`R ${row.total.toFixed(2)}`}
                              disabled
                            />
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td colSpan="4" className="text-end fw-bold"><h3 className="formheadtext pt-3">Order Total</h3></td>
                        <td className="text-right fw-bold "><input className="total text-end pt-3"
                          type="text"
                          tabIndex="-1"
                          value={`R ${getTotalSum().toFixed(2)}`}
                          disabled
                        /></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="invoice-informeshon">
                <div className="row">
                  <div className="col-md-12 col-sm-12">
                    <div className="terms-and-condistions mb-30">
                      <h3 className="inv-title-1">Terms and Conditions</h3>
                      <p className="mb-0" style={{ fontWeight: '400', fontSize: '12px', textAlign: 'justify', lineHeight: '1' }}>This purchase order must be accepted within seven (7) days by confirming in writing via email, including the expected delivery date, which must be updated every fourteen (14) days until delivery. Please specify the cost per unit and total value in your confirmation and must include all cost relating to the order. Payment will be made as per the agreed terms, and final paperwork must be submitted at least seventy-two (72) hours before delivery. By accepting this order, the supplier agrees to provide goods/services free from defects, subject to inspection by the buyer. Liability is limited to the purchase price, and the supplier indemnifies the buyer against claims from defects. The order may be canceled under specified conditions. Returns are accepted for non-conforming goods within the stated period. Neither party is liable for delays due to force majeure. This order is governed by South African law and constitutes the entire agreement, with amendments requiring mutual written consent.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="invoice-btn-section clearfix d-print-none">
              <button onClick={printPurchaseOrder} className="btn btn-lg btn-print">
                <i className="fa fa-print"></i> Print Invoice
              </button>
              <button id="invoice_download_btn" className="btn btn-lg btn-download btn-theme">
                <i className="fa fa-download"></i> Download Invoice
              </button>
            </div>
            </Adminlayout>
            </>
  
  );
};

export default PurchaseOr;
