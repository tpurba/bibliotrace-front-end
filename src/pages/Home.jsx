import React, { useState} from "react"
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
  const [searchInput, setSearchInput] = useState('')

  const navigate = useNavigate(); 

  const handleSearch = () => {
    // Navigate programmatically
    // navigate("/search");
    console.log("HOME.jsx searchInput: " , searchInput);
    navigate("/search", { state: { initSearchInput: searchInput }});
  };
  const handleSuggestBookNav = () => {
    // Navigate programmatically
    navigate("/suggest");
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  };

  return (
    <div className="h-screen w-screen pb-5 start-bg flex flex-col items-center">
      <NavBar useDarkTheme={false} showTitle={false} bgColor={"#110057"} textColor={"#FFFFFF"} />
      <h1 className="mt-16 text-5xl text-white">Bibliotrace 3.0</h1>

      <div className="h-16 my-6 flex w-7/12 justify-center"> {/* Search Bar */}
        <input className="m-2 px-3 w-10/12 border-2 border-[#a49bc6] rounded-2xl placeholder-[#a49bc6] placeholder:font-bold" type="text" placeholder="Search" value={searchInput} onInput={e => setSearchInput(e.target.value)} onKeyDown={handleKeyDown}></input>
        <button className="m-2 border-[#110057] border-2 bg-white rounded-2xl font-bold text-[#a49bc6]" onClick= {handleSearch}>Go!</button>

      </div>
      <div class="flex flex-row">
        <CustomButton
          imageSrc={WhatsPopular}
          text="Whats Popular"
          textColor="#FFFFFF"
          onClick={handleSearch}
          borderColor="#ff50df" // Yellow border
          bgColor="#110057"
        />
        <CustomButton
          imageSrc={ExploreByAge}
          text="Explore By Age"
          textColor="#FFFFFF"
          onClick={handleSearch}
          borderColor="#fa8804" // Yellow border
          bgColor="#110057"
          className="mt-12"
        />
        <CustomButton
          imageSrc={NewArrivalsIcon}
          text={"New\nArrivals"}
          textColor="#FFFFFF"
          onClick={handleSearch}
          borderColor="#FFD700" // Yellow border
          bgColor="#110057"
        />
        <CustomButton
          imageSrc={ExploreByGenre}
          text="Explore By Genre"
          textColor="#FFFFFF"
          onClick={handleSearch}
          borderColor="#669bff" // Yellow border
          bgColor="#110057"
          className="mt-12"
        />
        <CustomButton
          imageSrc={SuggestBook}
          text="Suggest a Book"
          textColor="#FFFFFF"
          onClick={handleSuggestBookNav}
          borderColor="#e12502" // Yellow border
          bgColor="#110057"
        />
      </div>
    </div>
  );
};

export default Home;
