import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

export default function FilterBox() {
  const navigate = useNavigate(); 
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSubmit = () => {
    console.log("Selected items:", selectedItems);
    
  };

  const handleToggleSelection = (text) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(text)
        ? prevSelectedItems.filter((item) => item !== text)
        : [...prevSelectedItems, text]
    );
  };

  const menuButtons = [
    { text: "Fantasy" },
    { text: "Science Fiction" },
    { text: "History" },
    { text: "Dystopian" },
    { text: "Historical Fiction" },
    { text: "Mystery/Thriller" },
    { text: "Fiction" },
    { text: "Graphic Novels" },
    { text: "Non-Fiction" },
    { text: "Poetry" },
    { text: "Romance" },
    { text: "0-2 Years old" },
    { text: "2-8 Years old" },
    { text: "6-9 Years old" },
    { text: "8-12 Years old" },
    { text: "12-18 Years old" },
    { text: "Popular" },
    { text: "Newest" },
  ];

  return (
    <div className="relative p-6 border-4 border-darkBlue backdrop-blur-md bg-opacity-60 bg-gray-800 rounded-xl">
      <div className="grid grid-cols-3 gap-4">
        {menuButtons.map((button, index) => (
          <label key={index} className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="h-6 w-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              checked={selectedItems.includes(button.text)}
              onChange={() => handleToggleSelection(button.text)}
            />
            <span className="text-darkBlue text-xl">{button.text}</span>
          </label>
        ))}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="absolute right-4 bottom-4 border-4 border-darkBlue text-darkBlue px-6 py-3 rounded-2xl"
      >
        Submit
      </button>
    </div>
  );
}
