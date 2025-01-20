import React, { useState, useEffect } from "react";


const SearchResult = ({ imageUrl, title, author, genre, series }) => {
    const [image, setImage] = useState()

    const bookTitle = <p id='book-title'>{title}</p>
    const bookAuthor = <p id='book-author'>{author}</p>
    const bookGenre = <p id='book-genre'>{genre}</p>
    const bookSeries = <p id='book-series'>{series}</p>

    useEffect(() => {
        const fetchImage = async () => {
            if (imageUrl === 'Unknown') {
                return
            }

            try {
                const response = await fetch('https://cors-anywhere.herokuapp.com/' + imageUrl)
                if (response.ok) {
                    const blob = await response.blob()
                    const objectURL = URL.createObjectURL(blob)
                    console.log(objectURL)
                    setImage(objectURL)
                }
            } catch (e) {
                console.log(e)
            }
        }
        fetchImage()
    }, []) // Effect only runs once during component rendering

    return (
        <div className="flex h-fit border-x-2 border-x-[#110057] border-b-2 border-b-[#110057] bg-[#F7F5F9]">
            <div className="h-24 flex items-center justify-center px-3 border-r-slate-50 border-r-2 w-20 text-transparent">
                {(imageUrl != 'Unknown') ? <img src={image} className="w-16 m-2" alt="Cover Thumbnail"></img> : null}
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