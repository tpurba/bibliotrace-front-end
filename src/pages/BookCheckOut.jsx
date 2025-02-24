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
    const campus = "lehi";

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
      setThumbnail("https://m.media-amazon.com/images/I/91wKDODkgWL._AC_UF1000,1000_QL80_.jpg");
    } else {
      console.log(response);
    }
  }

  return (
    <>
      <NavBar
        useDarkTheme={true}
        showTitle={true}
        bgColor={tailwindConfig.theme.colors.white}
        homeNavOnClick="/admin"
      />

      <h1 className="text-center my-10">Book Check Out</h1>
      <div className="flex flex-row ">
        <section className="p-20 flex-1 flex flex-col">
          <input
            className="self-center w-full mb-10 border-2 border-purple text-purple p-1"
            type="text"
            onKeyDown={(e) => scanBook(e)}
            placeholder="Click here to start scanning"
          />

          <p>1. Click the 'Scan Barcode' button</p>
          <p>2. Scan the barcode on the book (book information will show up if scan is successful)</p>
          <p>3. All done! The book is yours to keep</p>
        </section>

        <section className="p-20 flex-1">
          <div className="border-2 border-darkBlue rounded-md min-h-48 h-full">
            <h4 className="bg-purple  text-center text-white text-lg p-2">Checked Out: </h4>
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
