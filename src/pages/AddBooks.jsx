import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBooks = () => {
  const [id, setId] = useState("");
  const [isbn_list, setIsbn_list] = useState("");
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [primary_genre, setPrimaryGenre] = useState("");
  const [audience, setAudience] = useState("");
  const [pages, setPages] = useState("");
  const [series_number, setSeries_number] = useState("");
  const [publish_date, setPublish_date] = useState("");
  const [short_description, setShort_description] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    // Prevent the browser from reloading the page
    event.preventDefault();

    const formData = new FormData();
    formData.append("id", id);
    formData.append("isbn_list", isbn_list);
    formData.append("name", name);
    formData.append("author", author);
    formData.append("primary_genre", primary_genre);
    formData.append("audience", audience);
    formData.append("pages", pages);
    formData.append("series_number", series_number);
    formData.append("publish_date", publish_date);
    formData.append("short_description", short_description);
    if (image) formData.append("image", image);

    // Log each key-value pair in the FormData
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    console.log(formData);

    try {
      //TODO figure out what the fetch should be here
      const response = await fetch("/api/add-book", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Book added successfully!");
      } else {
        if (response.status === 401) {
          navigate("/login");
        }
        console.error("Failed to add book.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div>
      <h1>add books</h1>
      <form method="post" onSubmit={handleSubmit}>
        <label>
          1. Enter id:
          <input
            type="number"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="e.g.,12345"
          />
        </label>
        <hr />

        <label>
          2. Enter isbn_list:
          <input
            type="text"
            value={isbn_list}
            onChange={(e) => setIsbn_list(e.target.value)}
            placeholder="e.g.,(123456, 123457)"
          />
        </label>
        <hr />

        <label>
          3. Enter book name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Harry Potter"
          />
        </label>
        <hr />

        <label>
          4. Enter author:
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="e.g., Takuns the best"
          />
        </label>
        <hr />

        <label>
          5. Choose primary genre:
          <select value={primary_genre} onChange={(e) => setPrimaryGenre(e.target.value)}>
            <option value="" disabled>
              -- Choose an option --
            </option>
            <option value="Advanced">Advanced</option>
            <option value="Action/Adventure">Action/Adventure</option>
            <option value="Dystopian">Dystopian</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Fiction">Fiction</option>
            <option value="Graphic Novel">Graphic Novel</option>
            <option value="History Fiction">History Fiction</option>
            <option value="Mystery/Thriller">Mystery/Thriller</option>
            <option value="Non-Fiction">Non-Fiction</option>
            <option value="Paranormal">Paranormal</option>
            <option value="Poetry">Poetry</option>
            <option value="Romance">Romance</option>
            <option value="Science Fiction">Science Fiction</option>
            <option value="Spanish">Spanish</option>
          </select>
          <p>Selected Value: {primary_genre || "None"}</p>
        </label>
        <hr />

        <label>
          6. Choose audience:
          <select value={audience} onChange={(e) => setAudience(e.target.value)}>
            <option value="" disabled>
              -- Choose an option --
            </option>
            <option value="Board (0-2)">Board (0-2)</option>
            <option value="Picture (2-8)">Picture (2-8)</option>
            <option value="Early Chapter (6-9)">Early Chapter (6-9)</option>
            <option value="Middle Grade (8-12)">Middle Grade (8-12)</option>
            <option value="Young Adult (12-18+)">Young Adult (12-18+)</option>
            <option value="Advanced (16+)">Advanced (16+)</option>
          </select>
          <p>Selected Value: {audience || "None"}</p>
        </label>

        <hr />

        <label>
          7. Enter pages:
          <input
            type="number"
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            placeholder="eg. 240"
          />
        </label>
        <hr />

        <label>
          8. Enter series_number:
          <input
            type="text"
            value={series_number}
            onChange={(e) => setSeries_number(e.target.value)}
            placeholder="eg. 1"
          />
        </label>
        <hr />

        <label>
          9. Enter publish date:
          <input
            type="number"
            value={publish_date}
            onChange={(e) => setPublish_date(e.target.value)}
            placeholder="eg. 2024"
          />
        </label>
        <hr />

        <label>
          10. Enter short description:
          <input
            type="text"
            value={short_description}
            onChange={(e) => setShort_description(e.target.value)}
            placeholder="eg. Your a wizard Harry"
          />
        </label>
        <hr />

        <label>
          11. Enter image callback:
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </label>
        <hr />
        <button type="submit">Submit form</button>
      </form>
    </div>
  );
};

export default AddBooks;
