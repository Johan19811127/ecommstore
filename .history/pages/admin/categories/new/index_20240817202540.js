import Adminlayout from "@/components/admin/Layout";
import { useState } from "react";
import * as Icons from "react-icons/gi";

export default function IconSelector() {
    const [formData, setFormData] = useState({
        name:'',
        description: '',
        icon: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
          icon: selectedIcon
        });
      };
    
    
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(null);

  const iconKeys = Object.keys(Icons).filter((icon) =>
    icon.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleIconSelect = (iconName) => {
    setSelectedIcon(iconName);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setMessage('Category created successfully!');
        setFormData({ name: '', description: '', setSelectedIcon[]: '' });
      } else {
        setMessage('Failed to create user: ' + result.error);
      }
    } catch (error) {
      setMessage('An error occurred: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Adminlayout>
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Add a Category</h2>
      <div className="border-t border-gray-600 my-4"></div>
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700" htmlFor="description">
          Description
        </label>
        <textarea
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="6"
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-3">
      <label className="block text-sm font-medium text-gray-700">
      Icon
      </label>
      {selectedIcon === null && (
      <div className=" text-sm text-gray-700 mb-4">
    Please select an icon from the list below.
     </div>
    )}
      <input
        type="text"
        placeholder="Search for an icon"
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
      />
      </div>
      <div className="grid grid-cols-12 gap-2 max-h-64 overflow-y-auto">
        {iconKeys.map((iconKey) => {
          const IconComponent = Icons[iconKey];
          return (
            <div
              key={iconKey}
              onClick={() => handleIconSelect(iconKey)}
              className={`cursor-pointer p-2 border ${
                selectedIcon === iconKey ? "border-blue-500 bg-blue-100" : "border-gray-300"
              } rounded hover:bg-gray-100`}
            >
              <IconComponent size={24} className="mx-auto text-gray-700" />

            </div>
          );
        })}
      </div>
      <button
        onClick={handleSubmit}
        className="mt-6 w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors"
      >
        Save Icon
      </button>
    </div>
    </Adminlayout>
  );
}
