import NavBar from "../components/NavBar";
import tailwindConfig from "../../tailwind.config";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import defaultBook from "../assets/generic-book.png?react";
import BulkQrAndISBNDump from "../modals/BulkQrAndISBNDump";
import ErrorModal from "../modals/ErrorModal.jsx";

const MAX_LINE_WIDTH_CH = 30; // this can be refactored into a function that dynamically scales max line width based on window size

export default function AddScannedBooks() {
  const [thumbnail, setThumbnail] = useState(defaultBook);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn_list, setIsbn_list] = useState(""); // this stores what comes back from the db
  const [isbn, setIsbn] = useState(""); // this stores what the user types in
  const [primary_genre, setPrimaryGenre] = useState("");
  const [audience, setAudience] = useState("");
  const [pages, setPages] = useState("");
  const [series_name, setSeries_name] = useState("");
  const [series_number, setSeries_number] = useState("");
  const [publish_date, setPublish_date] = useState("");
  const [short_description, setShort_description] = useState("");
  const [location, setLocation] = useState("");
  const [language, setLanguage] = useState("");
  const [qr, setQr] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [bulkModalShow, setBulkModalShow] = useState(false);
  const [successType, setSuccessType] = useState("");
  const isbnInputRef = useRef(null);
  const qrInputRef = useRef(null);
  const [locations, setLocations] = useState([]);
  const [genres, setGenres] = useState([]);
  const [audiences, setAudiences] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    isbnInputRef.current.focus();

    async function getLocations() {
      const locationList = await JSON.parse(Cookies.get("locationList"));
      setLocations(locationList);
    }
    async function getGenres() {
      const genreList = Cookies.get("genreList").split(",");
      setGenres(genreList);
    }
    async function getAudiences() {
      const audienceList = Cookies.get("audienceList").split(",");
      setAudiences(audienceList);
    }
    getLocations();
    getGenres();
    getAudiences();
  }, []);

  useEffect(() => {
    if (error) {
      isbnInputRef.current.blur();
      qrInputRef.current.blur();
    }
  }, [error]);

  async function getBookInformationFromIsbn(e) {
    e.preventDefault();
    setError("");
    setSuccessType(false);
    if (!isbn) {
      setError("Please enter an ISBN number.");
      isbnInputRef.current.focus();
      return;
    }

    setPrimaryGenre("");
    setAudience("");
    setLocation("");

    const jwt = Cookies.get("authToken");
    const response = await fetch(`http://localhost:8080/api/inventory/get/${isbn}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    if (response.ok) {
      const book = (await response.json()).object;
      console.log(book);
      setTitle(book.book_title);
      setAuthor(book.author);
      setIsbn_list(book.isbn_list);
      setPages(book.pages);
      setPublish_date(book.publish_date);
      setShort_description(book.short_description);
      setImageUrl(book.img_callback);
      setLanguage(book.language);
      await getCoverThumbnail(isbn);
      console.log("Book successfully imported");
      qrInputRef.current.focus();
    } else {
      if (response.status === 401) {
        navigate("/login");
      }
      setError(`${JSON.parse(await response.text()).message}`);
    }
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

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccessType(false);
    if (!qr) {
      setError("Please enter a QR code.");
      qrInputRef.current.focus();
      return;
    }
    const jwt = Cookies.get("authToken");
    const jwtData = JSON.parse(Cookies.get("jwtData"));

    // these fields should already be included from the ISBN call
    // fields that can be modified by the user should check to see if something is still in the state variable
    const bookData = {
      book_title: title.length > 0 ? title : null,
      author: author.length > 0 ? author : null,
      isbn: isbn_list,
      pages: pages,
      publish_date: publish_date,
      short_description: short_description,
      img_callback: imageUrl,
      campus: jwtData.userRole.campus,
      language: language,
    };

    // these fields are required for the API
    if (qr !== "") bookData.qr = qr;
    if (primary_genre !== "") bookData.primary_genre = primary_genre;
    if (audience !== "") bookData.audience = audience;
    if (location !== "") bookData.location_id = location;

    // these fields are optional
    if (series_name !== "") bookData.series_name = series_name;
    if (series_number !== "") bookData.series_number = series_number;

    const response = await fetch("http://localhost:8080/api/inventory/insert", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(bookData),
    });
    if (response.ok) {
      const message = JSON.parse(await response.text()).message;
      if (message.includes("update")) {
        setSuccessType("update");
      } else if (message.includes("create")) {
        setSuccessType("create");
      } else {
        setSuccessType("unknown");
      }
    } else {
      if (response.status === 401) {
        navigate("/login");
      }
      setError(`${JSON.parse(await response.text()).message}`);
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
        <h1 className="text-center my-10 text-black font-rector pb-20 text-5xl">Add New Books</h1>
        <div className="flex flex-row pb-20">
          <section className="p-20 flex-1 flex flex-col">
            <h4>ISBN Number</h4>
            <form
              className="flex rounded-xl items-center"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  getBookInformationFromIsbn(e);
                }
              }}
            >
              <input
                className="self-center border-2 w-full p-4 m-2 mx-0 rounded-lg text-2xl"
                type="text"
                placeholder="Start Scanning Here"
                ref={isbnInputRef}
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
              />
              <button
                className="m-4"
                onClick={(e) => {
                  getBookInformationFromIsbn(e);
                }}
              >
                Grab Book Information
              </button>
            </form>

            <h4>QR Code</h4>
            <form
              className="flex rounded-xl items-center"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSubmit(e);
                }
              }}
            >
              <input
                className="self-center border-2 w-full p-4 m-2 mx-0 rounded-lg text-2xl"
                type="text"
                placeholder="Scan Above, Then Scan Here"
                ref={qrInputRef}
                value={qr}
                onChange={(e) => setQr(e.target.value)}
              />
              <button
                className="m-4"
                onClick={(e) => {
                  onSubmit(e);
                }}
              >
                Add To Inventory
              </button>
            </form>
            <p>1. Use the scanner to scan a book's ISBN Number, usually on the back.</p>
            <p>2. Verify the information in the details to the right, updating it as needed.</p>
            <p>3. Click the QR code field above then scan a new QR code in.</p>
            <p>
              4. Scanning the new code should add the book, click the Add to Inventory button if it
              doesn't.
            </p>
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
                Last Scanned Book:
              </h4>

              <div className="flex flex-row ">
                <section className="p-5 basis-1/2 flex-grow flex justify-center items-center">
                  <img className="max-h-72 w-auto" src={thumbnail}></img>
                </section>
                <div className="p-5 py-10 basis-1/2 flex-grow flex flex-col justify-evenly text-lg">
                  <form
                    method="post"
                    onSubmit={(e) => {
                      onSubmit(e);
                    }}
                    className="flex flex-col"
                  >
                    <label>
                      Title:{" "}
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. The Great Gatsby"
                        style={{
                          width: `${Math.min(MAX_LINE_WIDTH_CH, title ? title.length + 3 : 20)}ch`,
                        }}
                      />
                    </label>
                    <label>
                      Author:{" "}
                      <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="e.g. Herman Melville"
                        style={{
                          width: `${Math.min(
                            MAX_LINE_WIDTH_CH,
                            author ? author.length + 3 : 20
                          )}ch`,
                        }}
                      />
                    </label>
                    <label>
                      Primary Genre:{" "}
                      <select
                        value={primary_genre}
                        onChange={(e) => setPrimaryGenre(e.target.value)}
                      >
                        <option value="" disabled>
                          -- Choose an option --
                        </option>
                        {genres.map((genre) => {
                          return <option value={genre}>{genre}</option>;
                        })}
                      </select>
                    </label>
                    <label>
                      Audience:{" "}
                      <select value={audience} onChange={(e) => setAudience(e.target.value)}>
                        <option value="" disabled>
                          -- Choose an option --
                        </option>
                        {audiences.map((audience) => {
                          return <option value={audience}>{audience}</option>;
                        })}
                      </select>
                    </label>
                    <label>
                      Page Count:{" "}
                      <input
                        type="number"
                        value={pages}
                        onChange={(e) => setPages(e.target.value)}
                        placeholder="e.g. 480"
                        style={{
                          width: `${Math.min(MAX_LINE_WIDTH_CH, pages ? pages.length + 3 : 9)}ch`,
                        }}
                      />
                    </label>
                    <label>
                      Series Name:{" "}
                      <input
                        type="text"
                        value={series_name}
                        onChange={(e) => setSeries_name(e.target.value)}
                        placeholder="e.g. Harry Potter"
                        style={{
                          width: `${Math.min(
                            MAX_LINE_WIDTH_CH,
                            series_name ? series_name.length + 3 : 15
                          )}ch`,
                        }}
                      />
                    </label>
                    <label>
                      Series Number:{" "}
                      <input
                        type="number"
                        value={series_number}
                        onChange={(e) => setSeries_number(e.target.value)}
                        placeholder="e.g. 1"
                        style={{
                          width: `${Math.min(
                            MAX_LINE_WIDTH_CH,
                            series_number ? series_number.length + 3 : 6
                          )}ch`,
                        }}
                      />
                    </label>
                    <label>
                      Publish Date:{" "}
                      <input
                        type="number"
                        value={publish_date}
                        onChange={(e) => setPublish_date(e.target.value)}
                        placeholder="e.g. 2024"
                        style={{
                          width: `${Math.min(
                            MAX_LINE_WIDTH_CH,
                            publish_date ? publish_date.length + 3 : 10
                          )}ch`,
                        }}
                      />
                    </label>
                    <label>
                      Short Description:{" "}
                      <textarea
                        value={short_description}
                        onChange={(e) => setShort_description(e.target.value)}
                        placeholder="e.g. You're a wizard, Harry!"
                        style={{
                          width: "100%",
                          height: "5rem",
                        }}
                      />
                    </label>
                    <label>
                      Location:
                      <select
                        value={location}
                        onChange={(e) => {
                          console.log(e.target.value);
                          setLocation(e.target.value);
                        }}
                      >
                        <option value="" disabled>
                          -- Choose an option --
                        </option>
                        {locations.map((location_obj) => {
                          return (
                            <option value={location_obj.id}>{location_obj.location_name}</option>
                          );
                        })}
                      </select>
                    </label>
                    <br></br>

                    <button type="submit">Update Book Details</button>
                    {successType === "create" ? (
                      <p className="text-green-500">Book successfully created!</p>
                    ) : successType === "update" ? (
                      <p className="text-green-500">Book successfully updated!</p>
                    ) : successType === "unknown" ? (
                      <p className="text-green-500">Book successfully modified!</p>
                    ) : null}
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div id="error-modal">
          {error ? (
            <ErrorModal
              id="error-modal"
              tabIndex="-1"
              description={"Error"}
              message={error}
              onExit={() => {
                setError("");
              }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
