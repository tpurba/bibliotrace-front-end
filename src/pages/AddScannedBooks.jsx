import NavBar from "../components/NavBar";
import tailwindConfig from "../../tailwind.config";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import defaultBook from "../assets/generic-book.png?react";
import BulkQrAndISBNDump from "../modals/BulkQrAndISBNDump";

export default function AddScannedBooks() {
  const [thumbnail, setThumbnail] = useState(defaultBook);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn_list, setIsbn_list] = useState("");
  const [primary_genre, setPrimaryGenre] = useState("");
  const [audience, setAudience] = useState("");
  const [pages, setPages] = useState("");
  const [series, setSeries] = useState("");
  const [publish_date, setPublish_date] = useState("");
  const [short_description, setShort_description] = useState("");
  const [location, setLocation] = useState("");
  const [bulkModalShow, setBulkModalShow] = useState(false);
  const isbnInputRef = useRef(null);
  const qrInputRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    isbnInputRef.current.focus();
  }, []);

  async function scanBook(e) {
    if (e.key !== "Enter") {
      return;
    }
    e.preventDefault()

    const qr_code = e.target.value;
    if (qr_code == null || qr_code == "") {
      return;
    }

    const jwtDataString = Cookies.get("jwtData");
    if (jwtDataString == null) {
      navigate("/login");
    }
    const jwtDataObject = JSON.parse(jwtDataString);
    const campus = jwtDataObject.userRole.campus;

    console.log("scanning: ", qr_code);
    const jwt = Cookies.get("authToken");
    try {
      const response = await fetch(`http://localhost:8080/api/inventory/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          isbn_list,
          title,
          author,
          primary_genre,
          audience,
          series,
          publish_date,
          short_description,
          
        }),
      });
      if (response.ok) {
        // TODO: set the Title, Author, Series, and Location from the returned value
      } else {
        setTitle(`Error Occurred: ${await response.text()}`);
        setAuthor("See the logs");
      }
    } catch (error) {
      setTitle(`Error Occurred: ${error.message}`);
      setAuthor("See the logs");
    }

    e.target.value = "";
    if (response.status == 200) {
      const book = await response.json();
      console.log(book);
      setTitle(book.title);
      setAuthor(book.author);

      const isbn = "9780747532699";
      await getCoverThumbnail(isbn);
    } else {
      setTitle(`Error occurred: ${await response.text()}`);
      console.log(response);
    }
  }

  async function getBookInformation(e) {
    e.preventDefault();
  }

  async function getCoverThumbnail(isbn) {
    const jwt = Cookies.get("authToken");
    const response = await fetch(`http://localhost:8080/api/search/cover/${isbn}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    if (response.ok) {
      const blob = await response.blob();
      if (blob.size >= 100) {
        const objectURL = URL.createObjectURL(blob);
        setThumbnail(objectURL);
      }
    } else {
      if (response.status === 401) {
        navigate("/login");
      }
      setThumbnail(defaultBook);
    }
  }

  return (
    <div className="h-lvh">
      <svg
        className="-z-10 absolute left-0 top-0"
        width="100vw"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          className="fill-lightBlue"
          d="
            M-0.5,12
            C7,10 12,14 17,16
            C22,18 27,14 32,12
            C37,10 42,14 47,16
            C52,18 57,14 62,12
            C67,10 72,14 77,16
            C82,18 87,14 92,12
            C97,10 102,14 107,16
            C110,17.5 114,16 117,14
            C120,12 124,10 127,11
            L132,11
            L132,0
            L0,0
            Z"
          transform="rotate(0, 50, 50) scale(1, 2)"
        />
      </svg>
      <NavBar
        useDarkTheme={true}
        showTitle={true}
        bgColor={tailwindConfig.theme.colors.lightBlue}
        textColor={tailwindConfig.theme.colors.black}
        homeNavOnClick="/admin"
      />

      <div className="flex flex-col justify-between h-5/6">
        <h1 className="text-center my-10 text-black font-rector pb-20 text-5xl">
          Add New Books
        </h1>
        <div className="flex flex-row pb-20">
          <section className="p-20 flex-1 flex flex-col">
            <h4>ISBN Number</h4>
            <form
              className="flex rounded-xl items-center"
              onSubmit={(e) => {
                getBookInformation(e);
              }}
            >
              <input
                className="self-center border-2 w-full p-4 m-2 mx-0 rounded-lg text-2xl"
                type="text"
                placeholder="Start Scanning Here"
                ref={isbnInputRef}
              />
              <button className="m-4">Grab Book Information</button>
            </form>

            <h4>QR Code</h4>
            <form
              className="flex rounded-xl items-center"
              onSubmit={(e) => {
                scanBook(e);
              }}
            >
              <input
                className="self-center border-2 w-full p-4 m-2 mx-0 rounded-lg text-2xl"
                type="text"
                placeholder="Scan Above, Then Scan Here"
                ref={qrInputRef}
              />
              <button className="m-4">Add To Inventory</button>
            </form>

            <p>1. Use the scanner to scan a book's ISBN Number, usually on the back.</p>
            <p>2. Verify the information in the details to the right, updating it as needed.</p>
            <p>3. Click the QR code field above then scan a new QR code in.</p>
            <p>4. Scanning the new code should add the book, click the Add to Inventory button if it doesn't.</p>
            <button
              className="w-fit mt-4"
              onClick={() => {
                setBulkModalShow(true);
              }}
            >
              Scanner Data Dump
            </button>
            {bulkModalShow && (
              <BulkQrAndISBNDump
                id="bulk-add-modal"
                title="Bulk Add Scan Dump"
                onExit={() => {
                  setBulkModalShow(false);
                }}
                operationType="add"
              />
            )}
          </section>

          <section className="p-20 flex-1">
            <div className="border-2 border-darkBlue rounded-md min-h-56 h-full">
              <h4 className="bg-lightBlue text-center text-black text-2xl p-2">
                Book Selected:
              </h4>
              {title != null && author != null ? (
                <div className="flex flex-row ">
                  <section className="p-5 basis-1/2 flex-grow flex justify-center items-center">
                    <img className="h-72 w-auto" src={thumbnail}></img>
                  </section>
                  <div className="p-5 py-20 basis-1/2 flex-grow flex flex-col justify-evenly text-lg">
                    <form method="post" onSubmit={() => {}} className="flex flex-col">
                      <label>
                        ISBN List:
                        <input
                          type="text"
                          value={isbn_list}
                          onChange={(e) => setIsbn_list(e.target.value)}
                          placeholder="e.g.,(123456, 123457)"
                        />
                      </label>

                      <label>
                        Title:
                        <input
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="e.g., Harry Potter"
                        />
                      </label>

                      <label>
                        Author:
                        <input
                          type="text"
                          value={author}
                          onChange={(e) => setAuthor(e.target.value)}
                          placeholder="e.g., Takuns the best"
                        />
                      </label>

                      <label>
                        Primary Genre:
                        <select
                          value={primary_genre}
                          onChange={(e) => setPrimaryGenre(e.target.value)}
                        >
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

                      <label>
                        Audience:
                        <select
                          value={audience}
                          onChange={(e) => setAudience(e.target.value)}
                        >
                          <option value="" disabled>
                            -- Choose an option --
                          </option>
                          <option value="Board (0-2)">Board (0-2)</option>
                          <option value="Picture (2-8)">Picture (2-8)</option>
                          <option value="Early Chapter (6-9)">Early Chapter (6-9)</option>
                          <option value="Middle Grade (8-12)">Middle Grade (8-12)</option>
                          <option value="Young Adult (12-18+)">
                            Young Adult (12-18+)
                          </option>
                          <option value="Advanced (16+)">Advanced (16+)</option>
                        </select>
                        <p>Selected Value: {audience || "None"}</p>
                      </label>

                      <label>
                        Page Count:
                        <input
                          type="number"
                          value={pages}
                          onChange={(e) => setPages(e.target.value)}
                          placeholder="eg. 240"
                        />
                      </label>

                      <label>
                        Series:
                        <input
                          type="text"
                          value={series}
                          onChange={(e) => setSeries(e.target.value)}
                          placeholder="eg. Harry Potter"
                        />
                      </label>

                      <label>
                        Publish Date:
                        <input
                          type="number"
                          value={publish_date}
                          onChange={(e) => setPublish_date(e.target.value)}
                          placeholder="eg. 2024"
                        />
                      </label>
                      
                      <label>
                        Short Description or Synopsis:
                        <input
                          type="text"
                          value={short_description}
                          onChange={(e) => setShort_description(e.target.value)}
                          placeholder="eg. Your a wizard Harry"
                        />
                      </label>
                      <button type="submit">Update Book Details</button>
                    </form>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
