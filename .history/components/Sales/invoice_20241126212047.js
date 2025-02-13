// components/Invoice.js
import React from "react";

const Invoice = ({ invoice }) => {
  const { companyName, companyAddress, invoiceDate, invoiceNumber, items } = invoice;

  const calculateTotal = () =>
    items.reduce((total, item) => total + item.quantity * item.price, 0);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg border rounded-md">
      <header className="flex justify-between items-center border-b pb-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">{companyName}</h1>
          <p className="text-sm text-gray-500">{companyAddress}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Invoice Date: {invoiceDate}</p>
          <p className="text-sm text-gray-500">Invoice #: {invoiceNumber}</p>
        </div>
      </header>

      <table className="w-full table-auto text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4">Item</th>
            <th className="py-2 px-4">Quantity</th>
            <th className="py-2 px-4">Price</th>
            <th className="py-2 px-4">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="py-2 px-4">{item.name}</td>
              <td className="py-2 px-4">{item.quantity}</td>
              <td className="py-2 px-4">{item.price.toFixed(2)}</td>
              <td className="py-2 px-4">
                {(item.quantity * item.price).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <footer className="mt-6 flex justify-end">
        <div>
          <p className="text-lg font-semibold">
            Total: ${calculateTotal().toFixed(2)}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Invoice;