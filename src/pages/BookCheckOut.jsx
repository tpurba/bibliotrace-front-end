import NavBar from "../components/NavBar";
import tailwindConfig from "../../tailwind.config";
import { useState } from "react";

export default function Checkout() {
  const [thumbnail, setThumbnail] = useState("");
  const [title, setTitle] = useState(null);
  const [author, setAuthor] = useState(null);
  const [series, setSeries] = useState("");

  async function scanBook() {
    setTitle(null);
    setAuthor(null);
    setThumbnail("");
    setSeries("");
    console.log("scanning");

    await new Promise((res) => setTimeout(res, 3000));

    setTitle("Harry Potter");
    setAuthor("JK Rowling");
    setThumbnail("https://m.media-amazon.com/images/I/91wKDODkgWL._AC_UF1000,1000_QL80_.jpg");
    // const isbn = fromScanner();

    // const book = await fetch(`/api/${isbn}`, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // }).then(res => res.json())
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
          <button className="self-center w-full mb-10 border-2 border-purple text-purple" onClick={scanBook}>
            Scan Barcode
          </button>
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
