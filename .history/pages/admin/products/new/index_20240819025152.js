// components/ProductForm.js
import { useState } from 'react';
import { storage } from '../../../../firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from 'axios';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    sku: '',
    slug: '',
    category: '',
    supplier: '',
    sizes: [{ size: '', cost: 0, selling: 0, quantity: 0, onOrder: 0 }],
    status: 'Active',
    images: [],
  });

  const [imageFiles, setImageFiles] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSizeChange = (index, e) => {
    const { name, value } = e.target;
    const newSizes = formData.sizes.map((size, i) => 
      i === index ? { ...size, [name]: value } : size
    );
    setFormData({ ...formData, sizes: newSizes });
  };

  const handleImageChange = (e) => {
    setImageFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const imageUrls = await Promise.all(
        imageFiles.map(async (file) => {
          const storageRef = ref(storage, `products/${file.name}`);
          await uploadBytes(storageRef, file);
          return await getDownloadURL(storageRef);
        })
      );

      const updatedFormData = { ...formData, images: imageUrls };

      await axios.post('/api/products', updatedFormData);

      alert('Product created successfully!');
      setFormData({
        name: '',
        description: '',
        sku: '',
        slug: '',
        category: '',
        supplier: '',
        sizes: [{ size: '', cost: 0, selling: 0, quantity: 0, onOrder: 0 }],
        status: 'Active',
        images: [],
      });
      setImageFiles([]);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-md">
      <div className=" flex flex-row items-center mb-4">
        <div className="basis-2/12 ">
        <label className="block text-gray-700 font-bold mb-2 mx-5">Name</label>
        </div>
        <div className="basis-6/12 ">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          required
        />
      </div>
      <div className="basis-1/12 ">
        <label className="block text-gray-700 font-bold mb-2 mx-5">SKU</label>
        </div>
        <div className="basis-3/12 ">
        <input
          type="text"
          name="sku"
          value={formData.sku}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          required
        />
        </div>
      </div>
      <div className=" flex flex-row items-center mb-4">
      <div className="basis-2/12 ">
        <label className="block text-gray-700 font-bold mb-2">Description</label>
        <div className="basis-2/12 ">
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          required
        />
      </div>
      
      {/* SKU, Slug, Category, Supplier */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">SKU</label>
        
      </div>
      
   

      {/* Sizes */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Sizes</label>
        {formData.sizes.map((size, index) => (
          <div key={index} className="mb-2">
            <input
              type="text"
              name="size"
              value={size.size}
              onChange={(e) => handleSizeChange(index, e)}
              placeholder="Size"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 mb-1"
              required
            />
            <input
              type="number"
              name="cost"
              value={size.cost}
              onChange={(e) => handleSizeChange(index, e)}
              placeholder="Cost"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 mb-1"
              required
            />
            <input
              type="number"
              name="selling"
              value={size.selling}
              onChange={(e) => handleSizeChange(index, e)}
              placeholder="Selling Price"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 mb-1"
              required
            />
            <input
              type="number"
              name="quantity"
              value={size.quantity}
              onChange={(e) => handleSizeChange(index, e)}
              placeholder="Quantity"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 mb-1"
              required
            />
            <input
              type="number"
              name="onOrder"
              value={size.onOrder}
              onChange={(e) => handleSizeChange(index, e)}
              placeholder="On Order"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>
        ))}
      </div>

      {/* Status */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Preorder">Preorder</option>
        </select>
      </div>

      {/* Images */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Images (up to 6)</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ProductForm;