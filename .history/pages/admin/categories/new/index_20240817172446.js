import Adminlayout from "@/components/admin/Layout";
import { useState } from "react";
import * as Icons from "react-icons/gi";

export default function IconSelector() {
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

  const handleSubmit = () => {
    console.log("Selected icon:", selectedIcon);
    // Save the selected icon to your database
  };

  return (
    <Adminlayout>
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add a Category</h2>
      <input
        type="text"
        placeholder="Search for an icon"
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
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
