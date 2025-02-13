// components/Invoice.js
// components/A4Invoice.js
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const A4Invoice = ({ invoice }) => {
  const invoiceRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
    documentTitle: `Invoice_${invoice.invoiceNumber}`,
  });

  const calculateTotal = () =>
    invoice.items.reduce((total, item) => total + item.quantity * item.price, 0);

  return (
    <div className="flex flex-col items-center p-6">
      {/* Print Button */}
      <button
        onClick={handlePrint}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Download Invoice as PDF
      </button>

      {/* Invoice Content */}
      <div
        ref={invoiceRef}
        className="bg-white p-8 border rounded-md shadow-md"
        style={{ width: "210mm", minHeight: "297mm" }} // A4 dimensions
      >
        {/* Header */}
        <header className="mb-8 border-b pb-4">
          <div className="flex flex-row justify-between items-center">
            <div className="basis-1/2">
            <Image src="/"
            </div>
            <div>
              <h1 className="text-2xl font-bold">{invoice.companyName}</h1>
              <p className="text-sm text-gray-600">{invoice.companyAddress}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Date: {invoice.invoiceDate}</p>
              <p className="text-sm text-gray-600">Invoice #: {invoice.invoiceNumber}</p>
            </div>
          </div>
        </header>

        {/* Items Table */}
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border py-2 px-4 text-left text-sm font-medium">Item</th>
              <th className="border py-2 px-4 text-right text-sm font-medium">Quantity</th>
              <th className="border py-2 px-4 text-right text-sm font-medium">Price</th>
              <th className="border py-2 px-4 text-right text-sm font-medium">Total</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="border py-2 px-4 text-sm">{item.name}</td>
                <td className="border py-2 px-4 text-right text-sm">{item.quantity}</td>
                <td className="border py-2 px-4 text-right text-sm">
                  ${item.price.toFixed(2)}
                </td>
                <td className="border py-2 px-4 text-right text-sm">
                  ${(item.quantity * item.price).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer */}
        <footer className="mt-8 flex justify-end">
          <div>
            <p className="text-lg font-bold">Total: ${calculateTotal().toFixed(2)}</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default A4Invoice;