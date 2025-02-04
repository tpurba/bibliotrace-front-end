// This page will mainly be the landing page for the Admin portal. It will be a shell with the navbar, search bar,
// and navigation buttons on the right hand side. The inner portion will be filled by the following list of components:
// Home, ManageInventory, Settings, Help, and Reports. These components are stored in the ../components/admin folder.
import React, { useState} from "react"
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import OrangeIcon from "../assets/ExploreByAge.jpg";
import BlueIcon from "../assets/ExploreByGenre.jpg";
import YellowIcon from "../assets/NewArrivalsIcon.jpg";
import RedIcon from "../assets/SuggestBook.jpg";
import PinkIcon from "../assets/WhatsPopular.jpg";
import CustomButtonRow from "../components/ButtonComponentRow";
import CustomButton from "../components/ButtonComponent";
import PullOutBar from "../components/PullOutBar";
import PullOutBarGenre from "../components/PullOutBarGenre";
import PurpleIcon from "../assets/CheckOutIcon.jpg";

export default function AdminHome({}) {

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
    <h1 className="absolute left-1/4 top-20 mt-16 text-5xl text-white">Bibliotrace 3.0</h1>
    {/* Search Bar */}
    <div className="absolute left-14 top-52 h-16 my-6 flex w-1/2 justify-center"> 
      <input className="m-2 px-3 w-10/12 border-2 border-[#a49bc6] rounded-2xl placeholder-[#a49bc6] placeholder:font-bold" type="text" placeholder="Search" value={searchInput} onInput={e => setSearchInput(e.target.value)} onKeyDown={handleKeyDown}></input>
      <button className="m-2 border-[#110057] border-2 bg-white rounded-2xl font-bold text-[#a49bc6]" onClick= {handleSearch}>Go!</button>

    </div>
    
    <div className="absolute left-0 top-80 flex flex-col">
      <CustomButton
          imageSrc={PurpleIcon}
          text="CHECK OUT"
          textColor="#FFFFFF"
          onClick={handleSearch}
          borderColor="#4b00e3" 
          bgColor="#110057"
          layout='row'
          textWidth= '25rem'
          textheight= '3rem'
      />
      <div className="absolute left-0 top-3/4 flex flex-col">
        <CustomButtonRow
          imageSrc={OrangeIcon}
          text="CHECK IN"
          textColor="#FFFFFF"
          onClick={handleExploreByAge}
          borderColor="#fa8804" 
          bgColor="#110057"
          className="mt-6"
        />
        <CustomButtonRow
          imageSrc={PinkIcon}
          text={"POPULAR"}
          textColor="#FFFFFF"
          onClick={handleSearch}
          borderColor="#ff50df" 
          bgColor="#110057"
          className="mt-6"
        />
        <CustomButtonRow
          imageSrc={OrangeIcon}
          text="BY AGE"
          textColor="#FFFFFF"
          onClick={handleExploreByAge}
          borderColor="#fa8804" 
          bgColor="#110057"
          className="mt-6"
        />
        {showPulloutBar && <PullOutBar onClose={() => {setShowPulloutBar(false); }} />}
      </div>
    </div>
    <div className="absolute left-96 top-1/2 flex flex-col">
      <CustomButtonRow
        imageSrc={RedIcon}
        text="Suggest A Book"
        textColor="#FFFFFF"
        onClick={handleSuggestBookNav}
        borderColor="#e12502" 
        bgColor="#110057"
      />
      <CustomButtonRow
        imageSrc={YellowIcon}
        text={"NEW ARRIVALS"}
        textColor="#FFFFFF"
        onClick={handleSearch}
        borderColor="#FFD700" 
        bgColor="#110057"
        className="mt-6"
      />
      <CustomButtonRow
        imageSrc={BlueIcon}
        text="BY GENRE"
        textColor="#FFFFFF"
        onClick={handleExploreByGenre}
        borderColor="#669bff" 
        bgColor="#110057"
        className="mt-6"
      />
      {showPulloutBarGenre && <PullOutBarGenre onClose={() => {setShowPulloutBarGenre(false); }} />}
    </div>
  </div>

  );
}



// <svg
//       className="-z-10 absolute left-0 top-0"
//       width="100vw"
//       height="100%"
//       viewBox="0 0 100 100"
//       preserveAspectRatio="none"
//     >
//       <path className="fill-darkBlue" d="M 75,0 C 35,30 105,50 35,75  C 35,0 35,2 35,152 L 0,100 L 0,0"></path>
//     </svg>