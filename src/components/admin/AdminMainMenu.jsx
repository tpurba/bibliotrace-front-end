//Icons 
import OrangeIcon from "../../assets/ExploreByAge.jpg";
import BlueIcon from "../../assets/ExploreByGenre.jpg";
import YellowIcon from "../../assets/NewArrivalsIcon.jpg";
import RedIcon from "../../assets/SuggestBook.jpg";
import PinkIcon from "../../assets/WhatsPopular.jpg";
import PurpleIcon from "../../assets/checkoutIcon.jpg";
//Libraries 
import { useNavigate } from "react-router-dom";
import CustomButton from "../ButtonComponent";
import React, { useState} from "react"
import PullOutBar from "../PullOutBar";
import PullOutBarGenre from "../PullOutBarGenre";

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
  {text: "Crazy Frog" },
];

export default function MainMenu() {
  const navigate = useNavigate(); 
  const [isBlurred, setIsBlurred] = useState(false);
  const [showPulloutBar, setShowPulloutBar] = useState(false);
  const [showPulloutBarGenre, setShowPulloutBarGenre] = useState(false);

  const handleTestClick = () => {
    console.log('Button pressed');
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

  const menuItems = [
    { label: 'CHECK IN', imageSrc: OrangeIcon, onclick: handleTestClick, borderColor: "#fa8804", textWidth: '35rem'},
    { label: 'Suggest A Book', imageSrc: RedIcon, onclick: handleSuggestBookNav, borderColor: "#4b00e3", textWidth: '35rem'},
    { label: 'Popular', imageSrc: PinkIcon, onclick: handleTestClick, borderColor: "#ff50df", textWidth: '35rem'},
    { label: 'New Arrivals', imageSrc: YellowIcon, onclick: handleTestClick, borderColor: "#FFD700", textWidth: '35rem'},
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
          />
        ))}
      </div>
      {/* Conditionally Render PullOutBarGenre */}
      {showPulloutBarGenre && (
          <PullOutBarGenre 
            onClose={() => setShowPulloutBarGenre(false)} 
            buttons={genres} 
          />
      )}
      {showPulloutBar && <PullOutBar onClose={() => {setShowPulloutBar(false); }} />}
    </div>
    
  );
}





  // { label: 'Check In', color: 'bg-pink-500',  },
  // { label: 'Popular', color: 'bg-red-500' },
  // { label: 'New Arrivals', color: 'bg-yellow-500' },
  // { label: 'By Age', color: 'bg-orange-500' },
  // { label: 'By Genre', color: 'bg-blue-500' },





  // <button
  //           key={item.label}
  //           className={`p-4 rounded-full text-white ${item.color} hover:opacity-80`}
  //         >
  //           {item.label}
  //         </button>
