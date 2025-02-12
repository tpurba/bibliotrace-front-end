import { useNavigate } from "react-router-dom";
import React, {useEffect, useState } from "react";

export default function FilterBox({onClose, prevSelectedItems=[] }) {
  const navigate = useNavigate(); 
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    setSelectedItems(prevSelectedItems); // Set initial preselected items on mount
  }, [prevSelectedItems]);

  const handleSubmit = () => {
    console.log("Selected items:", selectedItems);
    onClose(selectedItems); // Pass selected filters back to parent
  };

  const handleToggleSelection = (text) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(text)
        ? prevSelectedItems.filter((item) => item !== text)
        : [...prevSelectedItems, text]
    );
  };

  const categories = [
    {
      title: "Genres",
      items: ["Fantasy", "Science Fiction", "Historical Fiction", "Mystery/Thriller", "Dystopian", "Romance"],
    },
    {
      title: "Age Groups",
      items: [
        "Board Books\n(0-2 Years)",
        "Picture Books\n(2-8 Years)",
        "Early Chapter Books\n(6-9 Years)",
        "Middle Grade\n(8-12 Years)",
        "Young Adult\n(12-18 Years)",
      ],
    },
    {
      title: "Other",
      items: ["Fiction", "Non-Fiction", "Poetry", "Graphic Novels", "History", "Popular", "Newest"],
    },
  ];

  return (
    <div className="relative p-6 border-4 border-darkBlue backdrop-blur-3xl bg-opacity-100 bg-gray-900 rounded-xl">
      <div className="grid grid-cols-3 gap-6">
        {categories.map((category, colIndex) => (
          <div key={colIndex} className="flex flex-col">
            <h2 className="text-xl text-darkBlue font-bold mb-2">{category.title}</h2>
            {category.items.map((text, index) => (
              <label key={index} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="h-6 w-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                checked={selectedItems.includes(text)}
                onChange={() => handleToggleSelection(text)}
              />
              <span className="text-darkBlue text-xl">{text}</span>
            </label>
            ))}
          </div>

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
