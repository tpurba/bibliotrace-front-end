import React from "react";
import { useNavigate } from "react-router-dom";
import IhLogo from "../assets/ih-color.svg?react";
import IhLogoDark from "../assets/ih-dark.svg?react";
import HomeLogo from "../assets/home-white.svg?react";
import HomeLogoDark from "../assets/home-black.svg?react";

const NavBar = ({ useDarkTheme, showTitle, bgColor, textColor }) => {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/");
  };

  let title;
  if (showTitle) {
    title = (
      <h1 className="h-16 absolute top-0 right-0 left-0 flex text-center text-xl items-center justify-center p-2">
        BiblioTrace 3.0
      </h1>
    );
  }
  //TODO change the LOGO so that it isnt the dark theme or not and its actually a logo that we pass in or this wont work
  const Logo = useDarkTheme ? IhLogoDark : IhLogo;
  const Home = useDarkTheme ? HomeLogoDark : HomeLogo;

  return (
    <div className="w-full top-0 z-50 h-16" style={{ color: textColor }}>
      <Logo className="absolute left-0 top-0 p-2 h-16 w-48" />
      {title}
      <button
        style={{ background: bgColor, color: textColor }}
        className="absolute top-0 right-0 flex flex-col justify-center items-center"
        onClick={navigateHome}
      >
        <Home className="" />
        <p>Home</p>
      </button>
    </div>
  );
};

export default NavBar;
