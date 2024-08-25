// components/ProductForm.js
import { useEffect, useState } from 'react';
import { storage } from '../../../../firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from 'axios';
import Adminlayout from '@/components/admin/Layout';


const ProductForm = () => {
  let sizes = {}
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    sku: '',
    slug: '',
    group: '',
    creditor: '',
    sizes: sizes,
    status: 'Active',
    images: [],
  });
  const [categories, setCategories] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
 const [suppliers, setSuppliers] = useState([]);
 const[size, setSize] = useState({
  size:'',
  selling:'',
  cost:'',

});


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/category');
        const data = await response.json();
        if (data.success) {
          setCategories(data.data);
          console.log(categories)
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await fetch('/api/supplier');
        const data = await response.json();
        if (data.success) {
          setSuppliers(data.data);
          console.log(suppliers)
        }
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    };

    fetchSuppliers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const changeSize = (e) => {
    const { name, value } = e.target;
    setSize





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
    <Adminlayout>
    <form onSubmit={handleSubmit} className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-md">
    <h2 className="text-2xl font-semibold mb-4 text-gray-700">Add a Products</h2>
    <div className="border-t border-gray-600 my-4"></div>
      <div className=" flex flex-row items-center mb-2">
        <div className="basis-2/12 ">
        <label className="block text-sm font-medium text-gray-700 mx-5">Name</label>
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
        <label className="block text-sm font-medium text-gray-700 mx-5 text-center">SKU</label>
        </div>
        <div className="basis-3/12 ">
        <input
          type="text"
          name="sku"
          value={formData.sku}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
  
        />
        </div>
      </div>
      <div className=" flex flex-row items-center mb-2">
      <div className="basis-2/12 ">
        <label className="block text-sm font-medium text-gray-700 mx-5">Description</label>
        </div>
        <div className="basis-10/12 ">
        <textarea
          name="description"
          rows="6"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
       
        />
        </div>
      </div>
      <div className=" flex flex-row items-center mb-4">
        <div className="basis-2/12 ">
        <label className="block text-sm font-medium text-gray-700 mx-5">Category</label>
        </div>
        <div className="basis-4/12 ">
        <select
          type="text"
          name="group"
          value={formData.group}
          onChange={handleInputChange}
          className="form-select w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          required
        >
        <option></option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>{category.name}</option>
        ))}
        </select>
      </div>
      <div className="basis-2/12 ">
        <label className="block text-sm font-medium text-gray-700 mx-5 text-center">Supplier</label>
        </div>
        <div className="basis-4/12 ">
        <select
         
          name="creditor"
          value={formData.creditor}
          onChange={handleInputChange}
          className="form-select w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
        
        >
          <option></option>
          {suppliers.map((supplier) => (
          <option key={supplier._id} value={supplier._id}>{supplier.name}</option>
        ))}
          </select>
        </div>
      </div>
    
      <div className="flex flex-row">
      
   <div className="basis-1/2 pe-5" > 
      <div className="mb-4">
        <label className="block text-xl font-medium text-gray-700 mx-5">Variations</label>
        {formData.sizes.length < 1 ? (
        
        <p className="text-sm px-5 mb-2">You can load as many variances as is needed </p>):(<p className="text-sm px-5 mb-2 ">Please load at least one variance for this product.</p>)
      }
        
           <div key={index} className="mb-2">
          <div className="flex flex-row  items-center">
            <div className="basis-1/3">
            <label className="block text-sm font-medium text-gray-700 mx-5 ">Size / Color </label>
            </div>
            <div className="basis-2/3">
         
            <input
              type="text"
              name="size"
              value={size.size}
              onChange={(e) => handleSizeChange(index, e)}
              placeholder="Size"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 mb-1"
              required
            />
            </div>
            </div>
            <div className="flex flex-row  items-center">
            <div className="basis-1/3">
            <label className="block text-sm font-medium text-gray-700 mx-5 ">Selling Price</label>
            </div>
            <div className="basis-2/3">
            <input
              type="number"
              name="selling"
              value={size.selling}
              onChange={(e) => handleSizeChange(index, e)}
              placeholder="Selling Price"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 mb-1"
              required
            />
            </div></div>
            <div className="flex flex-row  items-center">
            <div className="basis-1/3">
            <label className="block text-sm font-medium text-gray-700 mx-5 ">Cost Price </label>
            </div>
            <div className="basis-2/3">
            <input
              type="number"
              name="cost"
              value={size.cost}
              onChange={(e) => handleSizeChange(index, e)}
              placeholder="Cost"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 mb-1"
              required
            />
            </div></div>
    <button type="button" 
    onClick={setSize}
    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"></button>
            
          </div>
    <div className=" flex flex-row  min-h-[200px] w-100">
        {formData.sizes.map((size) => (  
      

<div className="px-4 py-2 bg-blue-700 rounded-lg text-white text-sm">{size.size}</div>
          ))}
          </div>
      </div>
      </div>  

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
    </Adminlayout>
  );
};

export default ProductForm;
