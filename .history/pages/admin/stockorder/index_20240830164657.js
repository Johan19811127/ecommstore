import { useState } from 'react';

export default function OrderPage() {
  const [supplier, setSupplier] = useState('');
  const [items, setItems] = useState([{ stockItem: '', quantity: 0, price: 0 }]);

  const handleAddItem = () => {
    setItems([...items, { stockItem: '', quantity: 0, price: 0 }]);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // API call to submit the order
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">Place a Stock Order</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Supplier</label>
          <input
            type="text"
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Items</h2>
          {items.map((item, index) => (
            <div key={index} className="mb-4 grid grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Stock Item"
                value={item.stockItem}
                onChange={(e) => handleItemChange(index, 'stockItem', e.target.value)}
                className="border-gray-300 rounded-md shadow-sm"
              />
              <input
                type="number"
                placeholder="Quantity"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                className="border-gray-300 rounded-md shadow-sm"
              />
              <input
                type="number"
                placeholder="Price"
                value={item.price}
                onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                className="border-gray-300 rounded-md shadow-sm"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddItem}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Add Item
          </button>
        </div>
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md">
          Submit Order
        </button>
      </form>
    </div>
  );
}