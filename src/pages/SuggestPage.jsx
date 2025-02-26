import React, { useRef, useState } from "react";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import tailwindConfig from "../../tailwind.config";
import Cookies from "js-cookie";

function SuggestPage() {
  const submittedDialog = useRef(null);
  const navigate = useNavigate();

  const submitSuggestion = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    try {
      for (const pair of data.entries()) {
        //delete later
        console.log("suggestion: ", pair[1]);
        const campus = "Lehi";

        const jwt = Cookies.get("authToken");
        const res = await fetch("http://localhost:8080/api/suggest", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${jwt}` },
          body: JSON.stringify({ campus: campus, suggestion: pair[1] }),
        });

        if (res.status == 200) {
          submittedDialog.current.showModal();
          event.target.reset();
        } else {
          if (response.status === 401) {
            navigate('/login')
          }
          console.log(res.message);
        }
      }
    } catch (e) {}
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
          <path
            className="fill-darkBlue "
            d="
              M0,20
              C12.5,18 25,20 37.5,22
              C50,24 62.5,22 75,20
              C87.5,18 93,19 100,20
              L100,-20
              L0,-20
              Z"
            transform="rotate(270, 50, 50) scale(1, 2)"
          />
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
          <div className="basis-1/2 mb-10 md:mb-0 md:mr-20 md:max-w-[40%]">
            <h1 className="mb-10 5xl:my-16 3xl:my-12 lg:my-4 4xl:text-[8rem] 3xl:text-[6rem] xl:text-[3rem] text-white">Have a book suggestion?</h1>
            <p className="text-white 3xl:text-3xl xl:text-lg">
              Please give as much detail of the book you want to suggest and we will do our best to find it! We love to hear your voice. Just remember our suggestions are checked every week.
            </p>
          </div>
          <div className="basis-1/2 flex flex-col items-center ml-12 mb-10 md:mb-0">
            <h1 className="mb-10 text-white 4xl:text-[6rem] 3xl:text-[4rem] xl:text-[2rem]">Tell us about it!</h1>
            <form
              className="flex flex-col items-center w-full flex-grow"
              onSubmit={(e) => submitSuggestion(e)}
            >
              <textarea
                name="suggestion"
                style={{ color: "black" }}
                className="p-1 w-full mb-5 flex-grow"
                placeholder="Book info (title, author, etc.)"
              ></textarea>
              <button className="w-48 3xl:text-3xl xl:text-lg" type="submit" >
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
