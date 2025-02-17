import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import loginBackground from "../assets/login-background.png";
import ErrorModal from "../modals/ErrorModal.jsx";
export default function Login({ loginType }) {
  const location = useLocation()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  // On page setup, check if we're already logged in...
  useEffect(() => {
    const jwt = Cookies.get('authToken')
    if (jwt) {
      const jwtDataString = Cookies.get('jwtData')
      const jwtData = JSON.parse(jwtDataString)

      if (jwtData.userRole.userType === 'Admin') {
        navigate('/admin')
      } else {
        navigate('/')
      }
    }
    const handleKeyDown = (event) => {
      if (event.key == 'Enter') {
        if (message != null) {
          setMessage(null)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    const errorModal = document.getElementById('error-modal')
    if (errorModal) {
      errorModal.focus()
    }
  }, [message])

  function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return jsonPayload;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (message == null) {
      try {
        const response = await fetch('http://localhost:8080/api/auth/login', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        })

        if (!response.ok) {
          const responseText = await response.text()
          if (responseText.indexOf('Invalid Login Credentials') != -1) {
            setMessage(`Invalid Login Credentials Provided. Please Modify Your Username and/or Password.`)
          } else {
            setMessage(`Error: ${responseText}`)
          }
        } else {
          const jsonResult = await response.json()
          if (jsonResult != null && jsonResult.message === 'success') {
            console.log(jsonResult.token)
            Cookies.set('authToken', jsonResult.token, { expires: 7, secure: true })
            const jwtDataString = parseJwt(jsonResult.token)
            const jwtData = JSON.parse(jwtDataString)
            Cookies.set('jwtData', jwtData)
            console.log(jwtData)
            console.log(jwtData.userRole.roleType)

            if (jwtData.userRole.roleType === 'Admin') {
              navigate("/admin")
            } else {
              navigate("/")
            }
          } else {
            setMessage(`Error: ${jsonResult}`)
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
        className="h-screen w-screen bg-cover bg-center bg-no-repeat "
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
          <h1 className="text-white mb-10 mt-20">{location.state?.loginType ?? ''}</h1>
          <form className="flex flex-col w-1/2 items-center" onSubmit={handleSubmit}>
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
          <div id='error-modal'>
            {message ?
              <ErrorModal id='error-modal' description={"Error during Login"} message={message} onExit={() => { setMessage(null) }} />
              : null}
          </div>
        </div>
      </div>
    </>
  );
}
