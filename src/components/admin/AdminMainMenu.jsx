//Icons 
import OrangeIcon from "../../assets/ExploreByAge.jpg";
import BlueIcon from "../../assets/ExploreByGenre.jpg";
import YellowIcon from "../../assets/NewArrivalsIcon.jpg";
import RedIcon from "../../assets/SuggestBook.jpg";
import PinkIcon from "../../assets/WhatsPopular.jpg";
import PurpleIcon from "../../assets/checkoutIcon.jpg";
import PeachColorIcon from "../../assets/CheckInIcon.jpg";
//Libraries 
import { useNavigate } from "react-router-dom";
import CustomButton from "../ButtonComponent";
import React, { useState} from "react"
import PopUpBar from "../PopUpSideBar";

const genres = [
  { text: "Fantasy" },
  { text: "Science Fiction" },
  { text: "Dystopian" },
  { text: "Historical Fiction" },
  { text: "Mystery/Thriller" },
  { text: "Fiction" },
  { text: "Graphic Novels" },
  { text: "Non-Fiction" },
  { text: "Poetry" },
  {text: "Romance" },
];

const ages = [
  { text: "Board Books\n(0-2 Years)" },
  { text: "Picture Books\n(2-8 Years)" },
  { text: "Early Chapter Books\n(6-9 Years)" },
  { text: "Middle Grade\n(8-12 Years)" },
  { text: "Young Adult\n(12-18 Years)" },
];


export default function MainMenu() {
  const navigate = useNavigate(); 
  const [isBlurred, setIsBlurred] = useState(false);
  const [showPopupBarAge, setShowPopupBarAge] = useState(false);
  const [showPopupBarGenre, setShowPopupBarGenre] = useState(false);

  const handleTestClick = () => {
    console.log('Button pressed');
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
    navigate("/search", { state: { initFilterInput: "Popular" }});
  };

  const handleNewest = (filterInput) => {
    navigate("/search", { state: { initFilterInput: "Newest" }});
  };

  const menuItems = [
    { label: 'Check In', imageSrc: PeachColorIcon, onclick: handleTestClick, borderColor: "#fbb7a4", textWidth: '35rem'},
    { label: 'Suggest A Book', imageSrc: RedIcon, onclick: handleSuggestBookNav, borderColor: "#4b00e3", textWidth: '35rem'},
    { label: 'Popular', imageSrc: PinkIcon, onclick: handlePopular, borderColor: "#ff50df", textWidth: '35rem'},
    { label: 'New Arrivals', imageSrc: YellowIcon, onclick: handleNewest, borderColor: "#FFD700", textWidth: '35rem'},
    { label: 'By Age', imageSrc: OrangeIcon, onclick: handleExploreByAge, borderColor: "#fa8804", textWidth: '35rem'},
    { label: 'By Genre', imageSrc: BlueIcon, onclick: handleExploreByGenre, borderColor: "#669bff", textWidth: '35rem'},
  ];

    

  
  return (
    <div className="absolute left-0 top-auto ">
      <CustomButton
          imageSrc={PurpleIcon}
          text="CHECK OUT"
          textColor="#FFFFFF" //same 
          onClick={handleTestClick}
          borderColor="#4b00e3" 
          bgColor="#110057"//same
          layout='row'//same
          textWidth= '42vw'
          className="mb-8"
          textSize="1.25rem"
    />
      <div className="grid grid-cols-2 gap-4 w-2/3 justify-start">
        {menuItems.map((item, index) => (
          <CustomButton
            key={index}
            imageSrc={item.imageSrc}
            text={item.label}
            textColor="#FFFFFF"
            onClick={item.onclick}
            borderColor={item.borderColor} 
            bgColor="#110057"
            layout='row'
            textWidth={item.textWidth}
            textSize="1.25rem"
          />
        ))}
      </div>
      {/* Conditionally Render PullOutBarGenre */}
      {showPopupBarAge && (
          <PopUpBar 
            onClose={() => setShowPopupBarAge(false)} 
            buttons={ages} 
            side={"right"}
            uniformColor={"#fa8804"}
            titleText={"Explore By Age"}    
            buttonWidth={'14vw'}
            buttonHeight={"10vh"}      
          />
        )}
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
    </div>
    
  );
}