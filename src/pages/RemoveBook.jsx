import NavBar from "../components/NavBar";
import tailwindConfig from "../../tailwind.config";
import { useRef, useState } from "react";

export default function RemoveBook() {
  const bulkAddDialog = useRef(null);
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

  function bulkAdd(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    for (const pair of data.entries()) {
      console.log("quantity: ", pair[1]);
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
            className="fill-rubyRed"
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
      <NavBar useDarkTheme={false} showTitle={true} bgColor={tailwindConfig.theme.colors.rubyRed} textColor={tailwindConfig.theme.colors.white} homeNavOnClick = '/admin'/>

      <h1 className="text-center my-10 text-white font-rector ">Remove Books</h1>
      <div className="flex flex-row my-52">
        <section className="p-20 flex-1 flex flex-col justify-around">
          <button className="self-center w-full mb-10 border-2 border-darkBlue" onClick={scanBook}>
            Scan Barcode
          </button>
          <p>1. Click the 'Scan Barcode' box</p>
          <p>2. Scan the barcode on the book (book information will appear if scan is successful)</p>
          <p>3. All done! The book is in the inventory</p>
          <p
            className="self-center mt-10 underline text-lightBlue hover:cursor-pointer hover:opacity-80 active:text-darkBlue"
            onClick={() => bulkAddDialog.current.showModal()}
          >
            Bulk Remove
          </p>
        </section>

        <section className="p-20 flex-1">
          <div className="border-2 border-rubyRed rounded-md min-h-48 h-full">
            <h4 className="bg-rubyRed  text-center text-white text-lg p-2">Book Removed: </h4>
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

      <dialog className="border-2 border-darkBlue rounded-md min-h-48" ref={bulkAddDialog}>
        <h4 className="bg-lightBlue  text-center text-darkBlue text-lg p-2">Bulk Add</h4>
        <span
          className="top-0 right-0 z-10 absolute mx-5 my-2 hover:cursor-pointer"
          onClick={() => bulkAddDialog.current.close()}
        >
          &#x2715;
        </span>
        <form
          className="flex flex-col mx-10 my-5"
          onSubmit={(e) => {
            bulkAdd(e);
          }}
        >
          <button className=" w-full mb-5 border-2 border-darkBlue" onClick={scanBook}>
            Scan Barcode
          </button>
          <input
            autofocus="true"
            className="mb-5 p-2 border-2 border-darkBlue rounded-lg"
            type="number"
            name="quantity"
            placeholder="Quantity"
          ></input>
          <button className="self-center bg-lightBlue text-white" type="submit">
            Add
          </button>
        </form>
      </dialog>
    </>
  );
}
