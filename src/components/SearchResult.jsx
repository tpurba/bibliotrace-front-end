import React from "react";


const SearchResult = ({ imageUrl, title, author, genre, series }) => {
    const bookTitle = <p id='book-title'>{title}</p>
    const bookAuthor = <p id='book-author'>{author}</p>
    const bookGenre = <p id='book-genre'>{genre}</p>
    const bookSeries = <p id='book-series'>{series}</p>

    return (
        <div className="flex h-fit border-x-2 border-x-[#110057] border-b-2 border-b-[#110057] bg-[#F7F5F9]">
            <div className="h-24 flex items-center justify-center px-3 border-r-slate-50 border-r-2 w-20 text-transparent">
                <img src='/src/assets/harry-potter.jpg' className="w-16 m-2"></img>
            </div>
            <div className="flex items-center justify-center px-3 border-r-slate-50 border-r-2 w-1/3">
                {bookTitle}
            </div>
            <div className="flex items-center justify-center px-3 border-r-slate-50 border-r-2 w-1/5">
                {bookAuthor}
            </div>
            <div className="flex items-center justify-center px-3 border-r-slate-50 border-r-2 w-1/5">
                {bookGenre}
            </div>
            <div className="flex items-center justify-center px-3 w-1/5">
                {bookSeries}
            </div>
        </div>
    )


}

export default SearchResult