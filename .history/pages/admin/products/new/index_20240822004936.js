// components/ProductForm.js
import { useEffect, useState } from 'react';
import { storage } from '../../../../firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from 'axios';
import Adminlayout from '@/components/admin/Layout';
import Image from 'next/image';


const ProductForm = () => {
  
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    sku: '',
    slug: '',
    group: '',
    creditor: '',
    sizes: [],
    status: 'Active',
    images: [],
  });
  const [categories, setCategories] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
 const [suppliers, setSuppliers] = useState([]);
 const [sizeload, setSizeLoad]=useState('');
 const[size, setSize] = useState({
  size:'',
  selling:'',
  cost:'',

});

const [sizes, setSizes] = useState([]);
const [images , setImages] = useState([]);


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
    setSize({ ...size, [name]: value });
  };


const addsize = (e) => {
  setSizeLoad(true);
const allSizes = [sizes, ... size];
setSizes(allSizes);
console.log(sizes);
setFormData({ ...formData, sizes: sizes , images:images });
setSize({...size,[name]: ''});

}


















  const handleSizeChange = (index, e) => {
    const { name, value } = e.target;
    const newSizes = sizes.map((size, i) => 
      i === index ? { ...size, [name]: value } : size
    );
    setFormData({ ...formData, sizes: newSizes , images:images });
  };

  const handleImageChange = (e) => {
    setImageFiles(Array.from(e.target.files));
  };

  const  newImages =  async (e) =>{
    try {
      const imageUrls = await Promise.all(
        imageFiles.map(async (file) => {
          const storageRef = ref(storage, `products/${file.name}`);
          await uploadBytes(storageRef, file);
          return await getDownloadURL(storageRef);

        })
      );
      const addimages = [...images , imageUrls]
      setImages(addimages)
      console.log(images)
      setFormData({ ...formData, sizes: sizes , images:images });
      set

  }catch (error) {
    console.error("Error creating images:", error);
  }
}

  const handleSubmit = async (e) => {
    e.preventDefault();

   

      const updatedFormData = { ...formData, images: images };
      try {
      await axios.post('/api/product', updatedFormData);
     
      alert('Product created successfully!');
      setFormData({
        name: '',
        description: '',
        sku: '',
        slug: '',
        group: '',
        creditor: '',
        sizes: [{ size: '', cost: 0, selling: 0, }],
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
        
           <div className="mb-2">
          <div className="flex flex-row  items-center">
            <div className="basis-1/3">
            <label className="block text-sm font-medium text-gray-700 mx-5 ">Size / Color </label>
            </div>
            <div className="basis-2/3">
         
            <input
              type="text"
              name="size"
              value={size.size}
              onChange={changeSize}
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
              onChange={changeSize}
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
              onChange={changeSize}
              placeholder="Cost"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 mb-1"
              required
            />
            </div></div>
            <div className="text-center flex-flex-row my-3">
    <button type="button" 
    onClick={addsize}
    className="w-100 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"> {sizeload ? 'Adding Variant...' : 'Add Variant'}</button>
            </div>
          </div>
    <div className=" flex flex-row min-h-[200px] text-center">
      <p className="text-sm my-1 text-center">This product include the following variants:</p>
        {formData.sizes.map((s) => (  
      

<div key={s.size} className="px-4 py-2 bg-blue-700 rounded-lg text-white text-sm">{s.size}</div>
          ))}
          </div>
      </div>
      </div>  
      <div className="basis-1/2 pe-5" >
      <label className="block text-xl font-medium text-gray-700 mx-5">Pictures</label>
        {images.length > 1 ? (
        
        <p className="text-sm px-5 mb-2">You can load up to 6 images per product </p>):(<p className="text-sm px-5 mb-2 ">Please load at least one picture for this product.</p>)
      }
        
 

      {/* Images */}
      <div className="mb-4">
       <div className="flex flex-row">
        <div className="basis-3/4 px-3">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
        /></div>
        <div className="basis-1/4 ">
        <button  
        type="button"
        onClick={newImages}
        className="w-100 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Add Image</button>
        </div>
        </div>
      </div>
      <div className="container flex flex-row w-[80%] mx-auto gap-3">

         {images.map((image) => (
          <div className="basis-1/3 aspect-[4/5] rounded-lg w-[100%] items-cemter justify-center">
          <Image src={image} alt={formData.name} width="400" height="500"></Image>
          </div>
        ))}








       
      </div>
      </div>
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
