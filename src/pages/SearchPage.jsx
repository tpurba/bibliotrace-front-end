import React from "react"
import NavBar from "../components/NavBar"

const Search = () => {
    return (
        <div className="w-screen h-screen bg-white flex flex-col">
          <NavBar useDarkTheme={true} showTitle={true}/>
          <h1 className="text-2xl font-bold">Search Page</h1>
          <p>Welcome! This is the Search Page.</p>
        </div>
    )
}

export default Search;