import React from "react";
import { useNavigate } from "react-router-dom";
import IhLogo from "../assets/ih-color.svg?react";
import IhLogoDark from "../assets/ih-dark.svg?react";
import HomeLogo from "../assets/home-white.svg?react";
import HomeLogoDark from "../assets/home-black.svg?react";
import LogoutLogo from "../assets/logout-white.svg?react";
import LogoutLogoDark from "../assets/logout-black.svg?react";

const NavBar = ({ useDarkTheme, showTitle, bgColor, textColor }) => {
  const navigate = useNavigate();

  const navigateHome = () => {
    console.log('Home Button was pressed');
    navigate("/");
  };
  const navigateLogOut = () => {
    console.log('TODO add logout functionality');
  };

  let title;
  if (showTitle) {
    title = (
      <h1 className="h-16 absolute top-0 right-0 left-0 flex text-center text-xl items-center justify-center p-2 pointer-events-none">
        BiblioTrace 3.0
      </h1>
    );
  }
  //TODO change the LOGO so that it isnt the dark theme or not and its actually a logo that we pass in or this wont work
  const Logo = useDarkTheme ? IhLogoDark : IhLogo;
  const Home = useDarkTheme ? HomeLogoDark : HomeLogo;
  const Logout = useDarkTheme ? LogoutLogoDark :  LogoutLogo;

  return (
    <div className="flex flex-row w-full top-0 z-50 h-16 items-center justify-between" style={{ color: textColor }}>
      <div className="flex items-center">
        <Logo className="h-16 w-48" />
        <span>{title}</span>
      </div>
      <div className="flex items-center">
        <button
          style={{ background: bgColor, color: textColor }}
          className="flex flex-col justify-center items-center"
          onClick={navigateHome}
        >
          <Home />
          <p>Home</p>
        </button>

        <button
          style={{ background: bgColor, color: textColor }}
          className="flex flex-col justify-center items-center"
          onClick={navigateLogOut}
        >
          <Logout />
          <p>Logout</p>
        </button>
      </div>
    </div>
  );
};

export default NavBar;
