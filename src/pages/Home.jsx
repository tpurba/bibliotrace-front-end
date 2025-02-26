import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import NavBar from "../components/NavBar";
import ExploreByAge from "../assets/ExploreByAge.jpg";
import ExploreByGenre from "../assets/ExploreByGenre.jpg";
import NewArrivalsIcon from "../assets/NewArrivalsIcon.jpg";
import SuggestBook from "../assets/SuggestBook.jpg";
import WhatsPopular from "../assets/WhatsPopular.jpg";
import CustomButton from "../components/ButtonComponent";
import PopUpBar from "../modals/PopUpSideBar";

const genreListString = Cookies.get('genreList')
let genres = []
if (genreListString) {
  const genreList = genreListString.split(',')
  genres = genreList.map((genre) => {return {text: genre}})
}


const agesListString = Cookies.get('audienceList')
let ages= []
if (agesListString) {
  const agesList = agesListString.split(",")
  ages = agesList.map((age) => {return {text: age}})
}

const Home = () => {
  const [searchInput, setSearchInput] = useState('')
  const [isBlurred, setIsBlurred] = useState(false);
  const [showPopupBarAge, setShowPopupBarAge] = useState(false);
  const [showPopupBarGenre, setShowPopupBarGenre] = useState(false);
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
    setShowPopupBarAge(!showPopupBarAge)
  };

  const handleExploreByGenre = () => {
    setShowPopupBarGenre(!showPopupBarGenre)
  };

  const handlePopular = (filterInput) => {
    navigate("/search", { state: { initFilterInput: { Audiences: [], Genres: [], Special: ["Popular"] } }});
  };

  const handleNewest = (filterInput) => {
    navigate("/search", { state: { initFilterInput: { Audiences: [], Genres: [], Special: ["Newest"] }  }});
  };

  //event 
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  };

  useEffect(() => {
    const jwt = Cookies.get('authToken')
    if (jwt == null) {
      navigate('login', { state: { loginType: 'User Login' }})
    }
  }, [])

  

  return (
    <div className={`size-full pb-5 start-bg flex flex-col items-center ${isBlurred ? 'blur-sm' : ''}`}>
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
          text={"What's\nPopular"}
          textColor="#FFFFFF"
          onClick={handlePopular}
          borderColor="#ff50df" 
          bgColor="#110057"
          imageWidth = '12em' 
          imageHeight = '12rem'
          textWidth = '12rem' 
          textHeight = '6rem' 
          textSize = "1.5rem"
        />
        <CustomButton
          imageSrc={ExploreByAge}
          text={"Explore By\nAge"}
          textColor="#FFFFFF"
          onClick={handleExploreByAge}
          borderColor="#fa8804" 
          bgColor="#110057"
          className="mt-24"
          imageWidth = '12em' 
          imageHeight = '12rem'
          textWidth = '12rem' 
          textHeight = '6rem' 
          textSize = "1.5rem"
        />
        {/* {showPulloutBar && <PullOutBar onClose={() => {setShowPulloutBar(false); }} />} */}
        {showPopupBarAge && (
          <PopUpBar 
            onClose={() => setShowPopupBarAge(false)} 
            buttons={ages} 
            side={"left"}
            uniformColor={"#fa8804"}
            titleText={"Explore By Age"}    
            buttonWidth={'14vw'}
            buttonHeight={"10vh"}      
          />
        )}
        <CustomButton
          imageSrc={NewArrivalsIcon}
          text={"New\nArrivals"}
          textColor="#FFFFFF"
          onClick={handleNewest}
          borderColor="#FFD700" 
          bgColor="#110057"
          imageWidth = '12em' 
          imageHeight = '12rem'
          textWidth = '12rem' 
          textHeight = '6rem' 
          textSize = "1.5rem"
        />
        <CustomButton
          imageSrc={ExploreByGenre}
          text={"Explore By\nGenre"}
          textColor="#FFFFFF"
          onClick={handleExploreByGenre}
          borderColor="#669bff" 
          bgColor="#110057"
          className="mt-24"
          imageWidth = '12em' 
          imageHeight = '12rem'
          textWidth = '12rem' 
          textHeight = '6rem' 
          textSize = "1.5rem"
        />
        {showPopupBarGenre && (
          <PopUpBar 
            onClose={() => setShowPopupBarGenre(false)} 
            buttons={genres} 
            side={"right"}
            uniformColor={"#669bff"}
            titleText={"Explore By Genre"}
            buttonWidth={'14vw'}
            buttonHeight={"8vh"}   
          />
        )}

        <CustomButton
          imageSrc={SuggestBook}
          text={"Suggest a\nBook"}
          textColor="#FFFFFF"
          onClick={handleSuggestBookNav}
          borderColor="#e12502" 
          bgColor="#110057"
          imageWidth = '12em' 
          imageHeight = '12rem'
          textWidth = '12rem' 
          textHeight = '6rem' 
          textSize = "1.5rem"
        />
      </div>
    </div>
    
  );
};

export default Home;
