import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import NavBar from "../components/NavBar";

export default function ManageGenresTags() {
  //TODO: SET THESE AS REACT VARIABLES INSTEAD OF STORING THEM IN COOKIES
  const [genres, setGenres] = useState(["Adventure", "Mystery"]);
  const [tags, setTags] = useState(["Picture Book", "YA", "New"]);
  const [genreToAdd, setGenreToAdd] = useState("");
  const [tagToAdd, setTagToAdd] = useState("");

  useEffect(() => {
    // setGenres();
    // setTags();
  }, []);

  async function handleAddGenre() {
    //fetch call to add genreToAdd
    try {
      const response = fetch("https://localhost:8080/api/inventory/genre", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${Cookies.get("authToken")}` },
        body: JSON.stringify({ genre_name: genreToAdd }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.log(data.message);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function handleRemoveGenre(genre) {
    //fetch call to remove genre
    try {
      const response = fetch("https://localhost:8080/api/inventory/genre", {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${Cookies.get("authToken")}` },
        body: JSON.stringify({ genre_name: genre }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.log(data.message);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function handleAddTag() {
    //fetch call to add tagToAdd
    try {
      const response = fetch("https://localhost:8080/api/inventory/tag", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${Cookies.get("authToken")}` },
        body: JSON.stringify({ tag_name: tagToAdd }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.log(data.message);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function handleRemoveTag(tag) {
    //fetch call to remove tag
    try {
      const response = fetch("https://localhost:8080/api/inventory/tag", {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${Cookies.get("authToken")}` },
        body: JSON.stringify({ tag_name: tag }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.log(data.message);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <NavBar useDarkTheme={true} showTitle={true} showNavButtons={true}></NavBar>
      <h1>Edit Genres/Tags</h1>
      <div className="flex flex-row space-around">
        <section id="genres-container" className="border">
          <ul>
            {genres.map((genre) => {
              return (
                <li className="flex flex-row flex-nowrap">
                  <p>{genre}</p>
                  <button onClick={(genre) => handleRemoveGenre(genre)}>Remove</button>
                </li>
              );
            })}
          </ul>

          <input
            type="text"
            placeholder="Genre Name"
            name="genre-name"
            onChange={(e) => setGenreToAdd(e.target.value)}
          ></input>
          <button onClick={handleAddGenre}>Add Genre</button>
        </section>

        <section id="tags-container" className="border">
          <ul className="">
            {tags.map((tag) => {
              return (
                <li className="flex flex-row flex-nowrap">
                  <p>{tag}</p>
                  <button onClick={(tag) => handleRemoveTag(tag)}>Remove</button>
                </li>
              );
            })}
          </ul>
          <input
            type="text"
            placeholder="Tag Name"
            name="tag-name"
            onChange={(e) => setTagToAdd(e.target.value)}
          ></input>
          <button onClick={handleAddTag}>Add Tag</button>
        </section>
      </div>
    </>
  );
}
