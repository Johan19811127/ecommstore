import { useEffect, useState, useRef } from 'react';
import { storage } from '../../../../firebase'; // Make sure this is configured correctly
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
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
  const [suppliers, setSuppliers] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [size, setSize] = useState({
    size: '',
    selling: '',
    cost: '',
  });
  const [sizes, setSizes] = useState([]);
  const [images, setImages] = useState([]);
  const imageFilesRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [imgload, setImgload] = useState(false);
  const [sizload, setSizload] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/category');
        const data = await response.json();
        if (data.success) {
          setCategories(data.data);
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

  const handleSizeChange = (e) => {
    const { name, value } = e.target;
    setSize({ ...size, [name]: value });
  };

  const handleAddSize = () => {
    setSizload(true);
    const updatedSizes = [...sizes, size];
    setSizes(updatedSizes);
    setFormData({ ...formData, sizes: updatedSizes });
    setSize({ size: '', selling: '', cost: '' });
    setSizload(false);
  };

  const handleImageChange = (e) => {
    setImageFiles(Array.from(e.target.files));
  };

  const newImages = async () => {
    setImgload(true);
    try {
      const imageUrls = await Promise.all(
        imageFiles.map(async (file) => {
          const storageRef = ref(storage, `products/${file.name}`);
          await uploadBytes(storageRef, file);
          return await getDownloadURL(storageRef);
        })
      );
      const updatedImages = [...images, ...imageUrls];
      setImages(updatedImages);
      setFormData({ ...formData, images: updatedImages });
      imageFilesRef.current.value = null;
      setImgload(false);
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Product created successfully!');
        setFormData({
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
        setSizes([]);
        setImages([]);
        setImageFiles([]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <Adminlayout>
    <form onSubmit={handleSubmit} className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Add a Product</h2>
      <div className="border-t border-gray-600 my-4"></div>
      <div className="flex flex-row items-center mb-2">
        <div className="basis-2/12">
          <label className="block text-md font-medium text-gray-700 mx-5">Name</label>
        </div>
        <div className="basis-6/12">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>
       
      </div>
      <div className="flex flex-row items-center mb-2">
        <div className="basis-2/12">
          <label className="block text-md font-medium text-gray-700 mx-5">Description</label>
        </div>
        <div className="basis-10/12">
          <textarea
            name="description"
            rows="6"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
      </div>
      <div className="flex flex-row items-center mb-4">
        <div className="basis-2/12">
          <label className="block text-md font-medium text-gray-700 mx-5">Category</label>
        </div>
        <div className="basis-4/12">
          <select
            name="group"
            value={formData.group}
            onChange={handleInputChange}
            className="form-select w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            required
          >
            <option></option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="basis-2/12">
          <label className="block text-md font-medium text-gray-700 mx-5 text-center">Supplier</label>
        </div>
        <div className="basis-4/12">
          <select
            name="creditor"
            value={formData.creditor}
            onChange={handleInputChange}
            className="form-select w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          >
            <option></option>
            {suppliers.map((supplier) => (
              <option key={supplier._id} value={supplier._id}>
                {supplier.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-row">
        <div className="basis-1/2 pe-5">
          <div className="mb-4">
            <label className="block text-xl font-medium text-gray-700 mx-5">Variations</label>
            {formData.sizes.length < 1 ? (
              <p className="text-md px-5 mb-5">You can load as many variances as needed.</p>
            ) : (
              <p className="text-md px-5 mb-5">Please load at least one variance for this product.</p>
            )}

            <div className="mb-2">
              <div className="flex flex-row items-center">
                <div className="basis-1/3">
                  <label className="block text-md font-medium text-gray-700 mx-5">Size / Color</label>
                </div>
                <div className="basis-2/3">
                  <input
                    type="text"
                    name="size"
                    value={size.size}
                    onChange={handleSizeChange}
                    placeholder="Size"
                    className="w-full px-3 py-2 text-md border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 mb-1"
                 
                  />
                </div>
              </div>
              <div className="flex flex-row items-center">
                <div className="basis-1/3">
                  <label className="block text-md font-medium text-gray-700 mx-5">Selling Price</label>
                </div>
                <div className="basis-2/3">
                  <input
                    type="number"
                    name="selling"
                    value={size.selling}
                    onChange={handleSizeChange}
                    placeholder="Selling Price"
                    className="w-full px-3 py-2 border text-md border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 mb-1"
                 
                  />
                </div>
              </div>
              <div className="flex flex-row items-center">
                <div className="basis-1/3">
                  <label className="block text-md font-medium text-gray-700 mx-5">Cost Price</label>
                </div>
                <div className="basis-2/3">
                  <input
                    type="number"
                    name="cost"
                    value={size.cost}
                    onChange={handleSizeChange}
                   
                    className="w-full px-3 py-2 border text-md border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 mb-1"
                  />
                </div>
              </div>
              <div className="text-center flex-flex-row my-3">
                <button
                  type="button"
                  onClick={handleAddSize}
                  className="w-100 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                >
                {sizload ? 'Adding Variant...' : 'Add Variant'}  
                </button>
              </div>
            </div>
            <p className="text-sm font-medium my-1 text-center">This product includes the following variants:</p>
            <div className="flex flex-row min-h-[200px] text-center">
             
              {formData.sizes.map((s) => (
                <div key={s.size} className="px-4 py-2 bg-blue-700 rounded-lg text-white text-md h-9 mx-1">
                  {s.size}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="basis-1/2 pe-5">
          <label className="block text-xl font-medium text-gray-700 mx-5">Pictures</label>
          {images.length > 1 ? (
            <p className="text-md px-5 mb-5">You can load up to 6 images per product.</p>
          ) : (
            <p className="text-md px-5 mb-5">Please load at least one picture for this product.</p>
          )}

          {/* Images */}
          <div className="mb-4">
            <div className="flex flex-row items-center">
              <div className="basis-2/3 px-3">
              <input
  type="file"
  accept="image/*"
  ref={imageFilesRef} // Assign ref to the input
  onChange={handleImageChange}
  className="w-[100%] px-3 py-2 text-md border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
/>
<
              <div className="basis-1/3">
                <button
                  type="button"
                  onClick={newImages}
                  className="w-[100%] bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                >
                  {imgload ? 'Adding Image...' : 'Add Image'} 
                </button>
              </div>
            </div>
          </div>
          <div className="container flex flex-row flex-wrap mx-auto gap-3">
            {images.map((image, index) => (
              <div key={index} className="basis-1/4 aspect-[4/5] rounded-lg w-[100%] flex-none align-items-center justify-content-center">
                <Image src={image} alt={formData.name} width="400" height="500" />
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
      <div className="mb-4">
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
           {loading ? 'Adding Product... Please wait' : 'Create Product'} 
        </button>
      </div>
     
    </form>
  </Adminlayout>
  );
};

export default ProductForm;
