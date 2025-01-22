import React, { useState, useEffect } from "react"
import NavBar from "../components/NavBar"
import Filter from "../assets/filter.svg?react"
import Next from "../assets/next.svg?react"
import Prev from "../assets/prev.svg?react"
import SearchResult from "../components/SearchResult"

const Search = () => {
  const rowHeight = 100
  const headerHeight = 450
  const [rowCount, setRowCount] = useState(0)
  const [searchInput, setSearchInput] = useState('')
  const [inputQuery, setInputQuery] = useState('')
  const [searchResults, setSearchResults] = useState([{
    key: 'helloSearch', 
    selfLink: 'none', 
    imgLink: 'Unknown', 
    title: '',
    author: 'Search Above!',
    isbn: 'none',
    genre: '',
    series: ''
  }])
  const [pageOffset, setPageOffset] = useState(0)
  
  const conductSearch = () => {
    console.log(`search includes ${searchInput}`)
    fetch(`https://www.googleapis.com/books/v1/volumes?q={${searchInput}}&maxResults=40`)
    .then((result) => result.json())
    .then((response) => {
      const bookItems = response.items || []
      const bookResults = bookItems.map((item) => { return convertBooksObjToBook(item) })
      console.log(bookResults)
      setSearchResults(bookResults)
      setPageOffset(0)
      setInputQuery(searchInput)
    })
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      conductSearch()
    }
  };

  const convertBooksObjToBook = (bookObj) => {
    console.log(bookObj)
    return {
      selfLink: bookObj.selfLink,
      imgLink: bookObj.volumeInfo.imageLinks?.smallThumbnail ?? 'Unknown',
      title: bookObj.volumeInfo.title ?? 'Unknown',
      author: (bookObj.volumeInfo.authors != null && bookObj.volumeInfo.authors.length > 0) ? bookObj.volumeInfo.authors[0] : 'Unknown',
      isbn: bookObj.volumeInfo.industryIdentifiers,
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

  // Set up the resize listener
  useEffect(() => {
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

  return (
    <div className="w-screen pb-5 search-bg flex flex-col items-center" style={{ minHeight: "100vh" }}>
      <NavBar useDarkTheme={true} showTitle={false} />
      <h1 className="mt-16 text-5xl">BiblioTrace 3.0</h1>
      <div className="h-16 my-6 flex w-7/12 justify-center"> {/* Search Bar */}
        <input className="m-2 px-3 w-10/12 border-2 border-[#110057] rounded-2xl" type="text" placeholder="Search For Books" value={searchInput} onInput={e => setSearchInput(e.target.value)} onKeyDown={handleKeyDown}></input>
        <button className="m-2 border-[#110057] border-2 bg-white rounded-2xl" onClick={conductSearch}>Go!</button>
      </div>
      <div className="w-10/12"> {/* Search Results Table */}
        <div className="w-full flex justify-between my-4"> {/* Buttons Above Results */}
          <button className="bg-transparent border-none">
            <Filter />
          </button>
          <p className="flex items-center">{(inputQuery != '') ? `Showing search results for "${inputQuery}"` : ""}</p>
          <div className="w-10"></div> {/* placeholder to put above p element in the center */}
        </div>
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
                imageUrl={bookData.imgLink} 
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