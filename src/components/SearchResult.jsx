import React, { useState, useEffect } from "react"
import defaultBook from '../assets/generic-book.png'

const SearchResult = ({ imageUrl, title, author, genre, series }) => {
    const [image, setImage] = useState(defaultBook)

    const bookTitle = <p id='book-title' className="text-center">{title}</p>
    const bookAuthor = <p id='book-author' className="text-center">{author}</p>
    const bookGenre = <p id='book-genre' className="text-center">{genre}</p>
    const bookSeries = <p id='book-series' className="text-center">{series}</p>

    useEffect(() => {
        const fetchImage = async () => {
            if (imageUrl === 'Unknown') {
                return
            }

            try {
                const response = await fetch('https://cors-anywhere.herokuapp.com/' + imageUrl) // TODO: Swap this out with backend API calls or use a blob objectURL from upstream.
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
        <div className="flex justify-between h-fit border-x-2 border-x-[#110057] border-b-2 border-b-[#110057] bg-[#FFFFFF] bg-opacity-90 text-xl">
            <div className="h-40 flex items-center justify-center px-3 border-r-slate-50 border-r-2 w-28 text-transparent">
                <img src={image} className="w-28 m-2" alt="Cover Thumbnail"></img>
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