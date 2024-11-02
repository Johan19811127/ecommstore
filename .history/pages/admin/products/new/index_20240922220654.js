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
        {/* Other form fields */}
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
