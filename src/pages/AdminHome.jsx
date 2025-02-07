// This page will mainly be the landing page for the Admin portal. It will be a shell with the navbar, search bar,
// and navigation buttons on the right hand side. The inner portion will be filled by the following list of components:
// Home, ManageInventory, Settings, Help, and Reports. These components are stored in the ../components/admin folder.
import React, { useState} from "react"
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import AdminNavBar from "../components/AdminNavBar.jsx";
import OrangeIcon from "../assets/ExploreByAge.jpg";
import BlueIcon from "../assets/ExploreByGenre.jpg";
import YellowIcon from "../assets/NewArrivalsIcon.jpg";
import RedIcon from "../assets/SuggestBook.jpg";
import PinkIcon from "../assets/WhatsPopular.jpg";
import CustomButton from "../components/ButtonComponent";
import PullOutBar from "../components/PullOutBar";
import PullOutBarGenre from "../components/PullOutBarGenre";
import PurpleIcon from "../assets/checkoutIcon.jpg";
import CustomTextBoxButton from "../components/BarButtons.jsx";
export default function AdminHome({}) {

  const [searchInput, setSearchInput] = useState('')
    const [isBlurred, setIsBlurred] = useState(false);
    const [showPulloutBar, setShowPulloutBar] = useState(false);
    const [showPulloutBarGenre, setShowPulloutBarGenre] = useState(false);
    const navigate = useNavigate(); 
    
    //handle routes
    const handleSuggestBookNav = () => {
      navigate("/suggest");
    };
  
    const handleExploreByAge = () => {
      setShowPulloutBar(!showPulloutBar)
    };
  
    const handleExploreByGenre = () => {
      setShowPulloutBarGenre(!showPulloutBarGenre)
    };
    const handleTestClick = () => {
      console.log('Button pressed');
    };

  return (


  
<div className={`h-screen w-screen pb-5 start-bg flex flex-col items-center ${isBlurred ? 'blur-sm' : ''}`}>
  <AdminNavBar/>
    
    <div className="absolute left-0 top-96  flex flex-row">
      <CustomButton
          imageSrc={PurpleIcon}
          text="CHECK OUT"
          textColor="#FFFFFF"
          onClick={handleTestClick}
          borderColor="#4b00e3" 
          bgColor="#110057"
          layout='row'
          textWidth= '35rem'
          className="mb-8"
      />
      <div className="absolute left-0 top-3/4 flex flex-col">
        <CustomButton
          imageSrc={OrangeIcon}
          text="CHECK IN"
          textColor="#FFFFFF"
          onClick={handleTestClick}
          borderColor="#fa8804" 
          bgColor="#110057"
          layout='row'
          textWidth= '12rem'
        />
        <CustomButton
          imageSrc={PinkIcon}
          text={"POPULAR"}
          textColor="#FFFFFF"
          onClick={handleExploreByAge}
          borderColor="#ff50df" 
          bgColor="#110057"
          layout='row'
          textWidth= '12rem'
        />
        <CustomButton
          imageSrc={OrangeIcon}
          text="BY AGE"
          textColor="#FFFFFF"
          onClick={handleExploreByAge}
          borderColor="#fa8804" 
          bgColor="#110057"
          layout='row'
          textWidth= '12rem'
        />
        {showPulloutBar && <PullOutBar onClose={() => {setShowPulloutBar(false); }} />}
      </div>
      <div className="absolute left-96 top-3/4 flex flex-col">
        <CustomButton
          imageSrc={RedIcon}
          text="Suggest A Book"
          textColor="#FFFFFF"
          onClick={handleSuggestBookNav}
          borderColor="#e12502" 
          bgColor="#110057"
          layout='row'
          textWidth= '12rem'
        />
        <CustomButton
          imageSrc={YellowIcon}
          text={"NEW ARRIVALS"}
          textColor="#FFFFFF"
          onClick={handleTestClick}
          borderColor="#FFD700" 
          bgColor="#110057"
          layout='row'
          textWidth= '12rem'
        />
        <CustomButton
          imageSrc={BlueIcon}
          text="BY GENRE"
          textColor="#FFFFFF"
          onClick={handleExploreByGenre}
          borderColor="#669bff" 
          bgColor="#110057"
          layout='row'
          textWidth= '12rem'
        />
        {showPulloutBarGenre && <PullOutBarGenre onClose={() => {setShowPulloutBarGenre(false); }} />}
      </div>
      <div className="flex flex-col">
        <CustomTextBoxButton
            text= "Manage Inventory" 
            textColor = "#110057" 
            onClick={handleTestClick} 
            borderColor = "#110057" 
            bgColor= "#FFFFFF" 
        />
        <CustomTextBoxButton
            text= "Manage Inventory" 
            textColor = "#110057" 
            onClick={handleTestClick} 
            borderColor = "#110057" 
            bgColor= "#FFFFFF" 
        />
        <CustomTextBoxButton
            text= "Manage Inventory" 
            textColor = "#110057" 
            onClick={handleTestClick} 
            borderColor = "#110057" 
            bgColor= "#FFFFFF" 
        />
      </div>
      
      

    </div>
  </div>

  );
}