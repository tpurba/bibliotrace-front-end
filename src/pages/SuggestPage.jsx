import React, { useRef, useState } from "react";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import tailwindConfig from "../../tailwind.config";

function SuggestPage() {
  const submittedDialog = useRef(null);
  const navigate = useNavigate();

  const submitSuggestion = async (event) => {
    event.preventDefault();
    submittedDialog.current.showModal();
    const data = new FormData(event.target);

    for (const pair of data.entries()) {
      console.log("suggestion: ", pair[1]);
    }
  };
  return (
    <>
      <div className="bg-lightBlue w-full h-full relative z-10">
        <svg
          className="-z-10 absolute left-0 top-0"
          width="100vw"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path className="fill-darkBlue" d="M 50,0 C 30,30 80,50 40,100  L 0,100 L 0,00"></path>
        </svg>

        <NavBar
          useDarkTheme={false}
          showTitle={true}
          bgColor={tailwindConfig.theme.colors.lightBlue}
          textColor={tailwindConfig.theme.colors.white}
        />

        <dialog className="rounded-md p-8" ref={submittedDialog}>
          <h1 className="text-xl text-center mb-5">Thank you for your suggestion!</h1>
          <p className="text-center mb-5 ">Would you like to submit another book idea?</p>

          <div className="flex flex-row justify-center">
            <button
              className="mx-2"
              onClick={() => {
                submittedDialog.current.close();
              }}
            >
              Suggest Another
            </button>
            <button
              className="mx-2"
              onClick={() => {
                navigate("/");
              }}
            >
              Back to Home
            </button>
          </div>
        </dialog>

        <div className="flex flex-col md:flex-row m-20">
          <div className="basis-1/2 mb-10 md:mb-0 md:mr-20">
            <h1 className="mb-10 text-white">Have a book suggestion?</h1>
            <p className="text-white">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum."
            </p>
          </div>
          <div className="basis-1/2 flex flex-col items-center mb-10 md:mb-0">
            <h1 className="mb-10 text-white">Tell us about it!</h1>
            <form className="flex flex-col items-center w-full flex-grow" onSubmit={(e) => submitSuggestion(e)}>
              <textarea
                name="suggestion"
                style={{ color: "black" }}
                className="p-1 w-full mb-5 flex-grow"
                placeholder="Book info (title, author, etc.)"
              ></textarea>
              <button className="w-48" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SuggestPage;
