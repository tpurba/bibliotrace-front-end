import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import tailwindConfig from "../../tailwind.config.js";
import loginBackground from "../assets/login-background.png";
export default function Login({ loginType }) {
  const location = useLocation()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // On page setup, check if we're already logged in...
  useEffect(() => {
    const jwt = Cookies.get('authToken')
    if (jwt) {
      navigate('/')
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })

      if (!response.ok) {
        setMessage(`Error: ${await response.text()}`)
      }

      const jsonResult = await response.json()
      if (jsonResult != null && jsonResult.message === 'success') {
        console.log(jsonResult.token)
        Cookies.set('authToken', jsonResult.token, { expires: 7, secure: true })
        navigate("/");
      } else {
        // TODO: Set a prompt to try creds again...
      }

    } catch (error) {
      console.log(error)
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <>
      <div 
        className="h-screen w-screen bg-cover bg-center bg-no-repeat "
        style={{ backgroundImage: `url(${loginBackground})` }}
      >
        <NavBar
          useDarkTheme={false}
          showTitle={true}
          bgColor={"#ff50e0"}
          textColor={"white"}
          showNavButtons = {false}
        />

        <div className="h-[calc(100%-64px)] flex flex-col items-center">
          <h1 className="text-white mb-10 mt-20">{location.state?.loginType ?? ''}</h1>
          <form className="flex flex-col w-1/2 items-center" onSubmit={handleSubmit}>
            <div className="h-8 text-orange font-normal text-center" id="errorMessage">{message}</div>

            <div className="mb-5 ">
              <label className="text-white">Username: </label>
              <input
                className="border border-black border-solid rounded-md h-10 w-full p-4"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              ></input>
            </div>
            <div className="mb-5 ">
              <label className="text-white">Password: </label>
              <input
                className="border border-black border-solid rounded-md h-10 w-full p-4"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </>
  );
}
