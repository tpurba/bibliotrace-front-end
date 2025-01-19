import React, { useState, useEffect } from "react"
import NavBar from "../components/NavBar"
import Filter from "../assets/filter.svg?react"
import Next from "../assets/next.svg?react"
import Prev from "../assets/prev.svg?react"
import SearchResult from "../components/SearchResult"

const Search = () => {
  const rowHeight = 100;
  const headerHeight = 450;
  const [rowCount, setRowCount] = useState(0);




  // Function to calculate the number of rows that can fit
  const calculateRowCount = () => {
    const availableHeight = window.innerHeight - headerHeight;
    const count = Math.max(5, Math.floor(availableHeight / rowHeight));
    setRowCount(count);
  };

  // Set up the resize listener
  useEffect(() => {
    calculateRowCount(); // Initial calculation
    window.addEventListener('resize', calculateRowCount);

    // Clean up the listener on unmount
    return () => {
      window.removeEventListener('resize', calculateRowCount);
    };
  }, []);

  
  // <div
  //           key={index}
  //           style={{
  //             height: `${rowHeight}px`,
  //             borderBottom: '1px solid #ddd',
  //             display: 'flex',
  //             alignItems: 'center',
  //             justifyContent: 'center',
  //           }}
  //         >
  //           Row {index + 1}
  //         </div>






  return (
    <div className="w-screen pb-5 search-bg flex flex-col items-center">
      <NavBar useDarkTheme={true} showTitle={false} />
      <h1 className="mt-16 text-5xl">BiblioTrace 3.0</h1>
      <div className="h-16 my-6 flex w-7/12 justify-center"> {/* Search Bar */}
        <input className="m-2 px-3 w-10/12 border-2 border-[#110057] rounded-2xl" type="text" placeholder="Search For Books"></input>
        <button className="m-2 border-[#110057] border-2 bg-white rounded-2xl" onClick={() => {}}>Go!</button>
      </div>
      <div className="w-10/12"> {/* Search Results Table */}
        <div className="w-full flex justify-between my-4"> {/* Buttons Above Results */}
          <button className="bg-transparent border-none">
            <Filter />
          </button>
          <p className="flex items-center">Showing search results for "Harry Potter"</p>
          <div className="w-10"></div> {/* placeholder to put above p element in the center */}
        </div>
        <div className=""> {/* Results Table */}
          <div className="h-10 flex justify-between bg-[#110057] text-white text-center items-center rounded-t-2xl"> {/* Table Header */}
            <div className="h-10 flex items-center justify-center px-3 border-r-slate-50 border-r-2 w-20 text-transparent">
              <h3>Cover</h3>
            </div>
            <div className="h-10 flex items-center justify-center px-3 border-r-slate-50 border-r-2 w-1/3">
              <h3>Title</h3>
            </div>
            <div className="h-10 flex items-center justify-center px-3 border-r-slate-50 border-r-2 w-1/5">
              <h3>Author</h3>
            </div>
            <div className="h-10 flex items-center justify-center px-3 border-r-slate-50 border-r-2 w-1/5">
              <h3>Genre</h3>
            </div>
            <div className="h-10 flex items-center justify-center px-3 w-1/5">
              <h3>Series</h3>
            </div>
          </div>
          {Array.from({ length: rowCount }, (_, index) => (
          <SearchResult title={"Harry Potter and the Sorceror's Stone"} author={"J.K. Rowling"} genre={"Fantasy"} series={"Harry Potter #1"}/>
        ))}
        </div>
        <div className="flex align-middle items-center justify-center py-4"> {/* Pagination Buttons */}
          <button className="bg-transparent flex flex-col items-center">
            <Prev />
            <p className="">Previous</p>
          </button>
          <p className="h-12">Showing 1-{rowCount} of 37</p>
          <button className="bg-transparent flex flex-col items-center">
            <Next />
            <p className="">Next</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Search;