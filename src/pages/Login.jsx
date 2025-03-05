import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import loginBackground from "../assets/login-background.png";
import ErrorModal from "../modals/ErrorModal.jsx";
export default function Login({ loginType }) {
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const errorModalRef = useRef(null);
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const loginButton = useRef(null);

  // On page setup, check if we're already logged in...
  useEffect(() => {
    const jwt = Cookies.get("authToken");
    if (jwt != null) {
      const jwtDataString = Cookies.get("jwtData");
      if (jwtDataString != null) {
        const jwtData = JSON.parse(jwtDataString);

        if (jwtData.userRole.userType === "Admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    }
    const handleKeyDown = (event) => {
      console.log("KEYDOWN");
      if (message != null) {
        setMessage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (
      message &&
      errorModalRef.current &&
      inputRef1.current &&
      inputRef2.current &&
      loginButton.current
    ) {
      inputRef1.current.blur();
      inputRef2.current.blur();
      loginButton.current.blur();

      errorModalRef.current.focus();
    }
  }, [message]);

  function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return jsonPayload;
  }

  async function setUpCookies(authToken) {
    Cookies.set("authToken", authToken, { expires: 7, secure: true });
    const jwtDataString = parseJwt(authToken);
    const jwtData = JSON.parse(jwtDataString);
    Cookies.set("jwtData", jwtDataString);

    // Get Genre List
    let response = await fetch("http://localhost:8080/api/metadata/genres", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    if (!response.ok) {
      const responseText = await response.text();
      setMessage(`Error Fetching Metadata: ${responseText}`);
    } else {
      const jsonResult = await response.json();
      if (jsonResult != null && jsonResult.results != null) {
        const genres = jsonResult.results;
        Cookies.set("genreList", genres);
      }
    }

    // Get Audience List
    response = await fetch("http://localhost:8080/api/metadata/audiences", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    if (!response.ok) {
      const responseText = await response.text();
      setMessage(`Error Fetching Metadata: ${responseText}`);
    } else {
      const jsonResult = await response.json();
      if (jsonResult != null && jsonResult.results != null) {
        const audiences = jsonResult.results;
        Cookies.set("audienceList", audiences);
      }
    }

    //Get Location List
    const location_response = await fetch("http://localhost:8080/api/metadata/locations", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const data = await location_response.json();
    if (!location_response.ok) {
      setMessage(`Error Fetching Metadata: ${data.message}`);
    } else {
      if (data.object) {
        Cookies.set("locationList", JSON.stringify(data.object));
      }
    }

    return jwtData;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (message == null) {
      try {
        const response = await fetch("http://localhost:8080/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
          setMessage(await JSON.parse(await response.text()).message);
        } else {
          const jsonResult = await response.json();
          if (jsonResult != null && jsonResult.message === "Token generated successfully") {
            const jwtData = await setUpCookies(jsonResult.object);

            if (jwtData.userRole.roleType === "Admin") {
              navigate("/admin");
            } else {
              navigate("/");
            }
          } else {
            setMessage(`Error: ${jsonResult}`);
          }
        }
      } catch (error) {
        setMessage(`Error: ${error.message}`);
      }
    }
  };

  return (
    <>
      <div
        className="size-full bg-cover bg-center bg-no-repeat "
        style={{ backgroundImage: `url(${loginBackground})` }}
      >
        <NavBar
          useDarkTheme={false}
          showTitle={true}
          bgColor={"#ff50e0"}
          textColor={"white"}
          showNavButtons={false}
        />
        <div className="h-[calc(100%-64px)] flex flex-col items-center">
          <h1 className="text-white mb-10 mt-20">{location.state?.loginType ?? ""}</h1>
          <form className="flex flex-col w-1/2 items-center" onSubmit={handleSubmit}>
            <div className="mb-5 ">
              <label className="text-white">Username: </label>
              <input
                ref={inputRef1}
                className="border-2 border-[#ff78e6] border-solid rounded-md h-14 w-full p-4 placeholder-[#ff78e6] placeholder:font-bold text-lg"
                placeholder="Username"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              ></input>
            </div>
            <div className="mb-5 ">
              <label className="text-white">Password: </label>
              <input
                ref={inputRef2}
                className="border-2 border-[#ff78e6] border-solid rounded-md h-14 w-full p-4 placeholder-[#ff78e6] placeholder:font-bold text-lg"
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <button className="border-2 border-[#ff78e6]" type="submit" ref={loginButton}>
              Login
            </button>
          </form>
          <div id="error-modal" ref={errorModalRef}>
            {message ? (
              <ErrorModal
                id="error-modal"
                tabIndex="-1"
                description={"Error during Login"}
                message={message}
                onExit={() => {
                  setMessage(null);
                }}
              />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
