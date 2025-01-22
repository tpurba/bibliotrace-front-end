import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import ExploreByAge from "../assets/ExploreByAge.jpg";
import ExploreByGenre from "../assets/ExploreByGenre.jpg";
import NewArrivals from "../assets/NewArrivals.jpg";
import NewArrivalsIcon from "../assets/NewArrivalsIcon.jpg";
import SuggestBook from "../assets/SuggestBook.jpg";
import WhatsPopular from "../assets/WhatsPopular.jpg";
import CustomButton from "../components/ButtonComponent";
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
    <div className="h-screen w-screen pb-5 start-bg flex flex-col items-center">
      <NavBar useDarkTheme={true} showTitle={false}/>
      <h1 className="mt-16 text-5xl text-white">Bibliotrace 3.0</h1>
      <div className="h-16 my-6 flex w-7/12 justify-center"> {/* Search Bar */}
        <input className="m-2 px-3 w-10/12 border-2 border-[#a49bc6] rounded-2xl placeholder-[#a49bc6] placeholder:font-bold" type="text" placeholder="Search" ></input>
        <button className="m-2 border-[#110057] border-2 bg-white rounded-2xl font-bold text-[#a49bc6]" onClick={() => {}}>Go!</button>
      </div>
      <div class="flex flex-row">
        <CustomButton
          imageSrc={WhatsPopular}
          text="Whats Popular"
          textColor="#FFFFFF"
          onClick={handleNavigate}
          borderColor="#ff50df" // Yellow border
          bgColor="#110057"
        />
        <CustomButton
          imageSrc={ExploreByAge}
          text="Explore By Age"
          textColor="#FFFFFF"
          onClick={handleNavigate}
          borderColor="#fa8804" // Yellow border
          bgColor="#110057"
          className="mt-12"
        />
        <CustomButton
          imageSrc={NewArrivalsIcon}
          text="New Arrivals"
          textColor="#FFFFFF"
          onClick={handleNavigate}
          borderColor="#FFD700" // Yellow border
          bgColor="#110057"
        />
        <CustomButton
          imageSrc={ExploreByGenre}
          text="Explore By Genre"
          textColor="#FFFFFF"
          onClick={handleNavigate}
          borderColor="#669bff" // Yellow border
          bgColor="#110057"
          className="mt-12"
        />
        <CustomButton
          imageSrc={SuggestBook}
          text="Suggest Book"
          textColor="#FFFFFF"
          onClick={handleRequestBookNav}
          borderColor="#e12502" // Yellow border
          bgColor="#110057"
        />
      </div>
    </div>
  );
};

export default Home;