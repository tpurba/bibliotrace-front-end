import NavBar from "../components/NavBar";
import Cookies from "js-cookie";
import tailwindConfig from "../../tailwind.config";
import { useEffect, useRef, useState } from "react";

export default function CreateNewUser() {
  const roles = ["Admin", "User"];
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const emailRef = useRef(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [campus, setCampus] = useState("");
  const [campuses, setCampusList] = useState([]);

  async function createAccount(jwt, accountData) {
    try{
      const response = await fetch("http://localhost:8080/api/auth/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(accountData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to create user");

      console.log("User created:", data);
      return data;
  } catch (error) {
    console.error("Error creating user:", error);
  }

  }
  useEffect(()=>{
    async function getCampuses() {
        const campusList = await JSON.parse(Cookies.get("campusList"));
        setCampusList(campusList);
        console.log("campuses" , campuses);
      }
      getCampuses();
  }, []);


  const testClick = () => {
    console.log("clicked");
  }

  const onSubmit = () => {
    console.log("submit");
    const jwt = Cookies.get("authToken");
    const accountData = {
      username: username,
      password: password,
      email: email,
      roleType: role,
      campus: campus,
    };
    console.log("Submit account data: ", accountData);
    createAccount(jwt, accountData);
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
          <button className="self-center w-full mb-10 border-2 border-darkBlue text-darkBlue" onClick={onSubmit}>
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
          <div className="flex flex-col min-h-48 h-full 5xl:text-[3rem] 3xl:text-[1.25rem] 2xl:text-3xl xl:text-2xl lg:text-lg">
              <div className="flex-1 items-center mb-3 mt-4">
                  <label className="text-purple">Email: </label>
                  <input
                      ref={emailRef}
                      className="border-2 border-purple border-solid rounded-md h-14 w-full p-4 placeholder-purple placeholder:font-bold text-lg"
                      placeholder="Email"
                      type="text"
                      onChange={(e) => setEmail(e.target.value)}
                  />
              </div>
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
                      onChange={(e) => setPassword(e.target.value)}
                  />
              </div>
              <div className="flex-1 items-center">
                <label className="text-purple">Role: </label>
                <select
                  value={role || ""}
                  onChange={(e) => {
                    const selectedRole = e.target.value;  // Get the selected role name
                    console.log("Selected Role:", selectedRole);
                    setRole(selectedRole);  // Store the role name directly in the state
                  }}
                >
                  <option value="" disabled>
                    -- Choose a role --
                  </option>
                  {roles.map((roleName, index) => (
                    <option key={index} value={roleName}>
                      {roleName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1 items-center">
                  <label className="text-purple">Campus: </label>
                  <select
                      value={campus || ""}
                      onChange={(e) => {
                        const selectedCampus = e.target.value;  // Get the selected campus name
                        console.log("Selected Campus:", selectedCampus);
                        setCampus(selectedCampus);  // Store the campus name directly in the state
                      }}
                    >
                      <option value="" disabled>
                        -- Choose an option --
                      </option>
                      {campuses.map((campus_name, index) => (
                      <option key={index} value={campus_name}>
                        {campus_name}
                      </option>
                    ))}
                  </select>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
