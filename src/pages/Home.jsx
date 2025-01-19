import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

const Home = () => {
    const navigate = useNavigate(); // This must be outside of the return statement

    const handleNavigate = () => {
      // Navigate programmatically
      navigate("/search");
    };
    const handleRequestBookNav = () => {
        // Navigate programmatically
        navigate("/requestbook");
    };
  
    return (
      <div>
        <NavBar useDarkTheme={true} showTitle={false}/>
        <h1>Start Page</h1>
        <button onClick={handleNavigate}>Go to Search Book</button>
        <button onClick={handleRequestBookNav}>Go to Request Book Page</button>
      </div>
    );
};

export default Home;
