import React, { useState} from "react"
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import ExploreByAge from "../assets/ExploreByAge.jpg";
import ExploreByGenre from "../assets/ExploreByGenre.jpg";
import NewArrivalsIcon from "../assets/NewArrivalsIcon.jpg";
import SuggestBook from "../assets/SuggestBook.jpg";
import WhatsPopular from "../assets/WhatsPopular.jpg";
import CustomButton from "../components/ButtonComponent";
import PullOutBar from "../components/PullOutBar";
import PullOutBarGenre from "../components/PullOutBarGenre";

const Home = () => {
  
  const [searchInput, setSearchInput] = useState('')
  const [isBlurred, setIsBlurred] = useState(false);
  const [showPulloutBar, setShowPulloutBar] = useState(false);
  const [showPulloutBarGenre, setShowPulloutBarGenre] = useState(false);
  const navigate = useNavigate(); 
  
  //handle routes
  const handleSearch = () => {
    console.log("HOME.jsx searchInput: " , searchInput);
    navigate("/search", { state: { initSearchInput: searchInput }});
  };

  const handleSuggestBookNav = () => {
    navigate("/suggest");
  };

  const handleExploreByAge = () => {
    setShowPulloutBar(!showPulloutBar)
  };

  const handleExploreByGenre = () => {
    setShowPulloutBarGenre(!showPulloutBarGenre)
  };

  //event 
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  };

  

  return (
    <div className={`h-screen w-screen pb-5 start-bg flex flex-col items-center ${isBlurred ? 'blur-sm' : ''}`}>
      <NavBar useDarkTheme={false} showTitle={false} bgColor={"#110057"} textColor={"#FFFFFF"} />
      <h1 className="mt-16 text-5xl text-white">Bibliotrace 3.0</h1>
      {/* Search Bar */}
      <div className="h-16 my-6 flex w-7/12 justify-center"> 
        <input className="m-2 px-3 w-10/12 border-2 border-[#a49bc6] rounded-2xl placeholder-[#a49bc6] placeholder:font-bold" type="text" placeholder="Search" value={searchInput} onInput={e => setSearchInput(e.target.value)} onKeyDown={handleKeyDown}></input>
        <button className="m-2 border-[#110057] border-2 bg-white rounded-2xl font-bold text-[#a49bc6]" onClick= {handleSearch}>Go!</button>

      </div>
      <div className="flex flex-row">
        <CustomButton
          imageSrc={WhatsPopular}
          text="What's Popular"
          textColor="#FFFFFF"
          onClick={handleSearch}
          borderColor="#ff50df" 
          bgColor="#110057"
        />
        <CustomButton
          imageSrc={ExploreByAge}
          text="Explore By Age"
          textColor="#FFFFFF"
          onClick={handleExploreByAge}
          borderColor="#fa8804" 
          bgColor="#110057"
          className="mt-12"
        />
        {showPulloutBar && <PullOutBar onClose={() => {setShowPulloutBar(false); }} />}

        <CustomButton
          imageSrc={NewArrivalsIcon}
          text={"New\nArrivals"}
          textColor="#FFFFFF"
          onClick={handleSearch}
          borderColor="#FFD700" 
          bgColor="#110057"
        />
        <CustomButton
          imageSrc={ExploreByGenre}
          text="Explore By Genre"
          textColor="#FFFFFF"
          onClick={handleExploreByGenre}
          borderColor="#669bff" 
          bgColor="#110057"
          className="mt-12"
        />
        {showPulloutBarGenre && <PullOutBarGenre onClose={() => {setShowPulloutBarGenre(false); }} />}
        <CustomButton
          imageSrc={SuggestBook}
          text="Suggest a Book"
          textColor="#FFFFFF"
          onClick={handleSuggestBookNav}
          borderColor="#e12502" 
          bgColor="#110057"
        />
      </div>
    </div>
    
  );
};

export default Home;
