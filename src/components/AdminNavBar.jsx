import React, { useState } from "react";
import NavBar from "./NavBar.jsx";

const AdminNavBar = ({ useDarkTheme, showTitle, bgColor, textColor }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = () => {
    console.log("HOME.jsx searchInput: " , searchInput);
    navigate("/search", { state: { initSearchInput: searchInput }});
  };

  //event 
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  };

  return (
<div className="relative w-full bg-[#110057] h-32 px-4">
      {/* Navigation Icon and Title */}
      <div className="flex items-center space-x-4">
        <NavBar useDarkTheme={false} showTitle={false} bgColor={"#110057"} textColor={"#FFFFFF"} />
      </div>

      {/* Search Bar */}
      <div className="mt-6 flex w-1/2 justify-start">
        <h1 className="text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-white lg:ml-80 md:ml-20 sm:ml-10">Bibliotrace 3.0</h1>
      </div>
      <div className="mt-6 flex w-1/2 justify-start">
        <input
          className="m-2 ml-32 px-3 w-10/12 max-w-4xl border-2 border-[#a49bc6] rounded-2xl placeholder-[#a49bc6] placeholder:font-bold"
          type="text"
          placeholder="Search"
          value={searchInput}
          onInput={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="m-2 border-[#110057] border-2 bg-white rounded-2xl font-bold text-[#a49bc6]"
          onClick={handleSearch}
        >
          Go!
        </button>
      </div>
    </div>
  );
};

export default AdminNavBar;