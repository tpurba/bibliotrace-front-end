import NavBar from "../components/NavBar";
import tailwindConfig from "../../tailwind.config";
import { useState } from "react";

export default function Checkout() {
  const [thumbnail, setThumbnail] = useState("");
  const [title, setTitle] = useState(null);
  const [author, setAuthor] = useState(null);
  const [series, setSeries] = useState("");

  async function scanBook(e) {
    if (e.key !== "Enter") {
      return;
    }

    setTitle(null);
    setAuthor(null);
    setThumbnail("");
    setSeries("");

    const qr_code = e.target.value;
    //TODO: delete later
    const campus = "Lehi";

    console.log("scanning: ", qr_code);
    const response = await fetch(`http://localhost:8080/api/inventory/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        qr_code: qr_code,
        campus: campus,
      }),
    });

    e.target.value = "";
    if (response.status == 200) {
      const book = await response.json();
      console.log(book);
      setTitle(book.title);
      ß;
      setAuthor(book.author);
      //TODO: add a call for the images from the isbndb
      setThumbnail(
        "https://m.media-amazon.com/images/I/91wKDODkgWL._AC_UF1000,1000_QL80_.jpg"
      );
    } else {
      console.log(response);
    }
  }

  return (
    <>
    <svg
        className="-z-10 absolute left-0 top-0"
        width="100vw"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          className="fill-navyBlue"
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
        bgColor={tailwindConfig.theme.colors.navyBlue}
        textColor={tailwindConfig.theme.colors.white}
        homeNavOnClick="/admin"
      />

      <h1 className="text-center my-10 text-white font-rector">Book Check Out</h1>
      <div className="flex flex-row ">
        <section className="p-20 flex-1 flex flex-col">
          <input
            className="self-center w-full mb-10 border-2 border-purple text-purple p-1"
            type="text"
            onKeyDown={(e) => scanBook(e)}
            placeholder="Click here to start scanning"
          />

          <p>1. Click the 'Scan Barcode' button</p>
          <p>
            2. Scan the barcode on the book (book information will show up if scan is
            successful)
          </p>
          <p>3. All done! The book is yours to keep</p>
        </section>

        <section className="p-20 flex-1">
          <div className="border-2 border-darkBlue rounded-md min-h-48 h-full">
            <h4 className="bg-purple  text-center text-white text-lg p-2">
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
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
