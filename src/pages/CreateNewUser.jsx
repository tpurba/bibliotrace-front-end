import NavBar from "../components/NavBar";
import Cookies from "js-cookie";
import tailwindConfig from "../../tailwind.config";
import { useEffect, useRef, useState } from "react";

export default function CreateNewUser() {
  const bulkAddDialog = useRef(null);
  const [thumbnail, setThumbnail] = useState("");
  const [title, setTitle] = useState(null);
  const [author, setAuthor] = useState(null);
  const [series, setSeries] = useState("");
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [location, setLocation] = useState("");
  const [locations, setLocations] = useState([]);
  useEffect(()=>{
    async function getLocations() {
        const locationList = await JSON.parse(Cookies.get("locationList"));
        setLocations(locationList);
      }
      getLocations();
  }, []);
 

  const testClick = () => {
    console.log("clicked");
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
            className="fill-purple"
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
      <NavBar useDarkTheme={false} showTitle={true} bgColor={tailwindConfig.theme.colors.purple} textColor={tailwindConfig.theme.colors.white} homeNavOnClick = '/admin'/>

      <h1 className="text-center 5xl:my-16 3xl:my-8 lg:my-4 4xl:text-[8rem] 3xl:text-[6rem] xl:text-[3rem]  text-white font-rector">Create User</h1>
      <div className="flex flex-row h-xl:mt-44 h-lg:mt-44 h-md:mt-44 h-sm:mt-36 mt-12">
        <section className="2xl:p-20 p-10 flex-1 flex flex-col justify-around 3xl:text-3xl xl:text-lg">
          <button className="self-center w-full mb-10 border-2 border-darkBlue text-darkBlue" onClick={testClick}>
            Create Account
          </button>
          <p>1. Please only create a account if the location you are at has no account.</p>
          <p>2. Please do not use a username or login information that will pertain to your id or health information.</p>
          <p>3. You must specify the location of the clincs library.</p>
          <p
            className="self-center mt-10 underline text-lightBlue hover:cursor-pointer hover:opacity-80 active:text-darkBlue"
            onClick={testClick}
          >
            Help
          </p>
        </section>

        <section className="2xl:p-20 xl:p-5 flex-1">
          <div className="border-2 border-purple rounded-md min-h-48 h-full">
            <h4 className="bg-purple  text-center text-white 3xl:text-3xl xl:text-lg p-2">Book Removed: </h4>
            <div className="flex flex-col 5xl:text-[3rem] 3xl:text-[1.25rem] 2xl:text-3xl xl:text-2xl lg:text-lg">
            {/* <div className="p-5 py-20  flex-grow flex flex-col justify-evenly 5xl:text-[3rem] 3xl:text-[2rem] 2xl:text-3xl xl:text-2xl lg:text-lg"> */}
                <div className="flex-1 items-center mb-3 mt-4">
                    <label className="text-purple">Username: </label>
                    <input
                        ref={usernameRef}
                        className="border-2 border-purple border-solid rounded-md h-14 w-full p-4 placeholder-purple placeholder:font-bold text-lg"
                        placeholder="Username"
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="flex-1 items-center mb-3">
                    <label className="text-purple">Password: </label>
                    <input
                        ref={passwordRef}
                        className="border-2 border-purple border-solid rounded-md h-14 w-full p-4 placeholder-purple placeholder:font-bold text-lg"
                        placeholder="Password"
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="flex-1 items-center">
                    <label className="text-purple">Location: </label>
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
                </div>
            {/* </div> */}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
