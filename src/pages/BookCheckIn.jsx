import NavBar from "../components/NavBar";
import tailwindConfig from "../../tailwind.config";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import defaultBook from "../assets/generic-book.png?react";

export default function CheckIn() {
  const [thumbnail, setThumbnail] = useState(defaultBook);
  const [title, setTitle] = useState("Scan a book to see its details checked out");
  const [author, setAuthor] = useState(" ");
  const [series, setSeries] = useState("");
  const [location, setLocation] = useState("");
  const inputRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const focusInput = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    focusInput(); // Initial focus on mount

    // Listen for clicks and keypresses to refocus the input
    document.addEventListener("click", focusInput);
    document.addEventListener("keydown", focusInput);

    // Cleanup event listeners on unmount
    return () => {
      document.removeEventListener("click", focusInput);
      document.removeEventListener("keydown", focusInput);
    };
  }, []);

  async function scanBook(e) {
    if (e.key !== "Enter") {
      return;
    }

    const qr_code = e.target.value;
    if (qr_code == null || qr_code == "") {
      return;
    }

    setTitle(null);
    setAuthor(null);
    setThumbnail(defaultBook);
    setSeries("");
    setLocation("");

    const jwtDataString = Cookies.get("jwtData");
    if (jwtDataString == null) {
      navigate("/login");
    }
    const jwtDataObject = JSON.parse(jwtDataString);
    const campus = jwtDataObject.userRole.campus;

    console.log("scanning: ", qr_code);
    const jwt = Cookies.get("authToken");
    try {
      const response = await fetch(`http://localhost:8080/api/inventory/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          qr_code,
          campus,
        }),
      });
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
          className="fill-peachPink"
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
        bgColor={tailwindConfig.theme.colors.peachPink}
        textColor={tailwindConfig.theme.colors.black}
        homeNavOnClick="/admin"
      />

      <div className="flex flex-col justify-between h-5/6">
        <h1 className="text-center my-10 text-black font-rector pb-20 text-5xl">
          Book Check Out
        </h1>
        <div className="flex flex-row pb-20">
          <section className="p-20 flex-1 flex flex-col">
            <input
              className="self-center w-full mb-10 border-2 border-black text-black p-4 rounded-lg text-2xl"
              type="text"
              onKeyDown={(e) => scanBook(e)}
              placeholder="Start Scanning"
              ref={inputRef}
            />

            <p>1. Use the scanner to scan a book's QR code on the back.</p>
            <p>2. Look for the book's information to pop up on the right.</p>
            <p>3. If the book matches, you're all done! The book is yours to keep.</p>
          </section>

          <section className="p-20 flex-1">
            <div className="border-2 border-darkBlue rounded-md min-h-56 h-full">
              <h4 className="bg-peachPink  text-center text-black text-2xl p-2">
                Checked Out:{" "}
              </h4>
              {title != null && author != null ? (
                <div className="flex flex-row ">
                  <section className="p-5 basis-1/2 flex-grow flex justify-center items-center">
                    <img className="h-72 w-auto" src={thumbnail}></img>
                  </section>
                  <div className="p-5 py-20 basis-1/2 flex-grow flex flex-col justify-evenly text-lg">
                    <p className="">Title: {title}</p>
                    <p className="">Author: {author}</p>
                    <p className="">Series: {series}</p>
                    <p className="">Location: {location}</p>
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
