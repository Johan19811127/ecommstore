// components/SupplierForm.js

import Adminlayout from '@/components/admin/Layout';
import { useState } from 'react';


export default function SupplierForm() {
  const [formData, setFormData] = useState({
    accno:'',
    name: '',
    phone: '',
    email: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
   bank: '',
    accname: '',
    acctype: '',
    accno: '',
    branch:'',
    creditLimit:'',
    creditTerms:'',
    status: 'Active',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission (e.g., sending data to an API)
    console.log(formData);
  };

  return (
 <Adminlayout>

  <div className=""
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Supplier Form</h2>
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700" htmlFor="accno">
            Account No
          </label>
          <input
            type="text"
            name="accno"
            value={formData.accno}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="col-span-3">
        <label className="block md:flex text-sm font-medium text-gray-700" htmlFor="name">
          Supplier Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block md:flex w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      </div>
      <div className="grid grid-cols-6 gap-4">
      <div className="mb-4 col-span-2">
        <label className="block text-sm font-medium text-gray-700" htmlFor="phone">
          Phone Number
        </label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div className="mb-4 col-span-4">
        <label className="block text-sm font-medium text-gray-700" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
</div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700" htmlFor="street">
          Street Address
        </label>
        <input
          type="text"
          name="street"
          value={formData.street}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="grid grid-cols-6 gap-4 ">
      <div className="mb-4 col-span-3">
        <label className="block text-sm font-medium text-gray-700" htmlFor="city">
          City
        </label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700" htmlFor="state">
            State
          </label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700" htmlFor="postalCode">
            Postal Code
          </label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      <div className="grid grid-cols-6 gap-4 mb-4">
      <div className="mb-4 col-span-4">
        <label className="block text-sm font-medium text-gray-700" htmlFor="country">
          Country
        </label>
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4 col-span-2">
        <label className="block text-sm font-medium text-gray-700" htmlFor="contact">
        Contact Person
        </label>
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      </div>
      <label className="block text-lg mb-2 font-medium text-gray-700" >
            Banking Details:
          </label>
      <div className="grid grid-cols-2 gap-4 mb-2">
      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="bank">
        Name of Bank
        </label>
        <input
          type="text"
          name="bank"
          value={formData.bank}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      
        <div >
          <label className="block text-sm font-medium text-gray-700" htmlFor="accname">
          Account in the name of:
          </label>
          <input
            type="text"
            name="state"
            value={formData.accname}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
</div>
<div className="grid grid-cols-8 gap-4 mb-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700" htmlFor="acctype">
           Account Type
          </label>
          <select
            type="text"
            name="acctype"
            value={formData.postalCode}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ><option ></option>

<option>Cheque</option>
<option>Savings</option>
<option>Transactional</option>
</select>

        </div>
        <div className="mb-4 col-span-4">
        <label className="block text-sm font-medium text-gray-700" htmlFor="bankacc">
        Account Number
        </label>
        <input
          type="text"
          name="bankacc"
          value={formData.bankacc}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div className="mb-4 col-span-2">
        <label className="block text-sm font-medium text-gray-700" htmlFor="branch">
        Branch Code
        </label>
        <input
          type="text"
          name="branch"
          value={formData.bankacc}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>


      </div>


      <label className="block text-lg font-medium text-gray-700 mb-2" >
            Credit Information
          </label>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="creditLimit">
            Credit Limit
          </label>
          <input
            type="number"
            name="creditLimit"
            value={formData.creditLimit}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="creditTerms">
            Credit Terms
          </label>
          <input
            type="string"
            name="creditterms"
            value={formData.creditTerms}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

     

      <button
        type="submit"
        className="w-full px-10 py-2 bg-blue-900 text-white font-semibold rounded-md shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75"
      >
        Submit
      </button>
    </form>
    </Adminlayout>
  );
}
4