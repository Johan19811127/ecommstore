import { useState } from "react";
import * as Icons from "react-icons/all";

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
    <div>
      <h2>Select an Icon for Your Category</h2>
      <input
        type="text"
        placeholder="Search for an icon"
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <div className="grid grid-cols-4 gap-4 max-h-64 overflow-y-auto">
        {iconKeys.map((iconKey) => {
          const IconComponent = Icons[iconKey];
          return (
            <div
              key={iconKey}
              onClick={() => handleIconSelect(iconKey)}
              className={`cursor-pointer p-2 border ${
                selectedIcon === iconKey ? "border-blue-500" : "border-gray-300"
              } rounded hover:bg-gray-100`}
            >
              <IconComponent size={24} />
              <p className="text-xs text-center mt-1">{iconKey}</p>
            </div>
          );
        })}
      </div>
      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Save Icon
      </button>
    </div>
  );
}