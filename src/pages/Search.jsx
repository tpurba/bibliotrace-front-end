import React, { useState, useEffect } from "react"
import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar.jsx"
import Filter from "../assets/filter.svg?react"
import Next from "../assets/next.svg?react"
import Prev from "../assets/prev.svg?react"
import SearchResult from "../components/SearchResult.jsx"
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import FilterBox from "../components/FilterBox.jsx";
const Search = () => {
  const location = useLocation()
  const rowHeight = 160
  const headerHeight = 450
  const [showFilter, setShowFilter] = useState(false);
  const [rowCount, setRowCount] = useState(0)
  const [pageOffset, setPageOffset] = useState(0)
  const [isLoading, setLoading] = useState(false)
  const [searchInput, setSearchInput] = useState(location.state?.initSearchInput ?? '') // Arch idea: use the initSearchInput as a text-based passthrough for searches by Genre, Age group, date range, etc...
  // Maybe the string can be like "||GENRE:fantasy||" or "||AGE:board||" or "||DATE_START:01/02/0003 DATE_END:04/05/0006||" or "||IDENTIFIER:searchstring||" 
  const [inputQuery, setInputQuery] = useState('')
  const [searchResults, setSearchResults] = useState([{
    key: 'helloSearch', 
    selfLink: 'none', 
    title: '',
    author: '',
    isbn: 'none',
    genre: '',
    series: ''
  }])

  const conductSearch = () => {
    if (searchInput == '') {
      return
    }

    setLoading(true)

    fetch(`https://www.googleapis.com/books/v1/volumes?q={${searchInput}}&maxResults=40`)
    .then((result) => result.json())
    .then((response) => {
      const bookItems = response.items || []
      const bookResults = bookItems.map((item) => { return convertBooksObjToBook(item) })
      // console.log(bookResults)
      setSearchResults(bookResults)
      setPageOffset(0)
      setInputQuery(searchInput)
      setLoading(false)
    })
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      conductSearch()
    }
  }

  const convertBooksObjToBook = (bookObj) => {
    // console.log(bookObj)
    return {
      selfLink: bookObj.selfLink,
      isbn: bookObj.volumeInfo.industryIdentifiers[0].identifier,
      title: bookObj.volumeInfo.title ?? 'Unknown',
      author: (bookObj.volumeInfo.authors != null && bookObj.volumeInfo.authors.length > 0) ? bookObj.volumeInfo.authors[0] : 'Unknown',
      genre: bookObj.volumeInfo.categories ?? ['unkonwn'],
      series: 'Not Available'
    }
  }

  // Function to calculate the number of rows that can fit
  const calculateRowCount = () => {
    const availableHeight = window.innerHeight - headerHeight;
    const count = Math.max(5, Math.floor(availableHeight / rowHeight));
    setRowCount(count);
  };

  // Effect that runs once at initialization
  useEffect(() => {
    if (searchInput != '') {
      conductSearch()
    }

    calculateRowCount(); // Initial calculation
    window.addEventListener('resize', calculateRowCount);

    // Clean up the listener on unmount
    return () => {
      window.removeEventListener('resize', calculateRowCount);
    };
  }, []);  

  const incrementPage = () => {
    if ((pageOffset + rowCount) < searchResults.length - 1) {
      setPageOffset(pageOffset + rowCount)
    }
  }

  const decrementPage = () => {
    if (pageOffset - rowCount < 0) {
      setPageOffset(0)
    } else {
      setPageOffset(pageOffset - rowCount)
    }
  }

  const handleFilterPress = () => {
    console.log("Buttons been pressed");
    setShowFilter(!showFilter)
  };

  return (
    <div className="w-screen pb-5 search-bg flex flex-col items-center" style={{ minHeight: "100vh" }}>
      <NavBar useDarkTheme={true} showTitle={false} bgColor={'none'} />
      <h1 className="mt-16 text-5xl">Bibliotrace 3.0</h1>
      <div className="h-16 my-6 flex w-7/12 justify-center"> {/* Search Bar */}
        <input className="m-2 px-3 w-10/12 border-2 border-[#110057] rounded-2xl" type="text" placeholder="Search For Books" value={searchInput} onInput={e => setSearchInput(e.target.value)} onKeyDown={handleKeyDown}></input>
        <button className="flex items-center m-2 border-[#110057] border-2 bg-white rounded-2xl" onClick={conductSearch}>
          {isLoading ? <LoadingSpinner size={'3rem'}/> : "Go!"}
        </button>
      </div>
      <div className="w-10/12"> {/* Search Results Table */}
        <div className="w-full flex justify-between my-4"> {/* Buttons Above Results */}
          <button className="bg-transparent border-none " onClick={handleFilterPress}>
            <Filter />
          </button>
          <p className="flex items-center">{(inputQuery != '') ? `Showing search results for "${inputQuery}"` : ""}</p>
          <div className="w-10"></div> {/* placeholder to put above p element in the center */}
        </div>
        {showFilter && (
          <FilterBox 
            onClose={() => setShowFilter(false)} 
          />
        )}
        <div className=""> {/* Results Table */}
          <div className="h-10 flex justify-between bg-[#110057] text-white text-center items-center rounded-t-2xl"> {/* Table Header */}
            <div className="h-10 flex items-center justify-center px-3 border-r-slate-50 border-r-2 w-28 text-transparent">
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
          {Array.from({ length: rowCount }, (_, index) => {
            const targetIndex = index + pageOffset
            if (targetIndex >= searchResults.length) {
              return null
            }
            const bookData = searchResults[index + pageOffset]
            return bookData ? (
              <SearchResult 
                key={bookData.selfLink}
                isbn={bookData.isbn}
                title={bookData.title} 
                author={bookData.author} 
                genre={bookData.genre} 
                series={bookData.series}/>
              ) : null
          })}
        </div>
        <div className="flex align-middle items-center justify-center py-4"> {/* Pagination Buttons */}
          <button className="bg-transparent flex flex-col items-center" onClick={decrementPage}>
            <Prev />
            <p className="">Previous</p>
          </button>
          <p className="h-12">Showing {pageOffset + 1}-{Math.min(pageOffset + rowCount, searchResults.length)} of {searchResults.length}</p>
          <button className="bg-transparent flex flex-col items-center" onClick={incrementPage}>
            <Next />
            <p className="">Next</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Search;