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
      <NavBar useDarkTheme={true} showTitle={true} bgColor={tailwindConfig.theme.colors.white} homeNavOnClick = '/admin'/>

      <h1 className="text-center my-10">Remove Books</h1>
      <div className="flex flex-row ">
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
          <div className="border-2 border-darkBlue rounded-md min-h-48 h-full">
            <h4 className="bg-lightBlue  text-center text-darkBlue text-lg p-2">Book Removed: </h4>
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
