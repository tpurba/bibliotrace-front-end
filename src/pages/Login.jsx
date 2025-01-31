import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import tailwindConfig from "../../tailwind.config.js";

export default function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = "123";
      //   const token = await fetch("", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       body: JSON.stringify({ username: username, password: password }),
      //     },
      //   }).then((res) => res.json());
      setToken(token);
      navigate("/admin");
    } catch (error) {
      setMessage(JSON.stringify(error));
    }
  };

  return (
    <>
      <div className="bg-darkBlue h-full vw-100">
        <NavBar
          useDarkTheme={false}
          showTitle={true}
          bgColor={tailwindConfig.theme.colors.darkBlue}
          textColor={"white"}
        />

        <div className="h-[calc(100%-64px)] flex flex-col items-center">
          <h1 className="text-white mb-10 mt-20">BiblioTrace</h1>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="h-4 text-yellow-200 font-normal">{message}</div>

            <div className="mb-5 ">
              <label className="text-white">Username: </label>
              <input
                className="border border-black border-solid"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              ></input>
            </div>
            <div className="mb-5 ">
              <label className="text-white">Password: </label>
              <input
                className="border border-black border-solid"
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
