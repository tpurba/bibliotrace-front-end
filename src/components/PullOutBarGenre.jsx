import React from "react";
import { X } from "lucide-react";
import BarButton from "./BarButtons";
import { useNavigate } from "react-router-dom";
const PullOutBarGenre = ({ onClose, buttons}) => {
  const navigate = useNavigate(); 

  const handleSearch = () => {
    navigate("/search");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-start backdrop-blur-sm">
      {/* PullOutBar Container */}
      <div
        className={`fixed top-30 right-0 h-auto w-auto bg-white border-4 border-skyBlue shadow-lg rounded-tl-3xl rounded-bl-3xl z-40 transition-transform translate-x-0`}
      >
        {/* Header with Close Icon */}
        <div className="flex items-center justify-between p-2 bg-orange-500 text-white">
          <button className="bg-white " onClick={onClose}>
            <X size={30} strokeWidth={4} className="text-skyBlue"/>
          </button>
          <h2 className="text-xl font-bold text-skyBlue">Explore by Genre</h2>
          
        </div>
        <ul>
        {buttons.map((button, index) => (
            <BarButton
              key={index}
              text={button.text}
              textColor={button.textColor || "#110057"}
              onClick={() => handleSearch(button.text)}
              borderColor={button.borderColor || "#669bff"}
              bgColor={button.bgColor || "#FFFFFF"}
              buttonBgColor = "#FFFFFF"
              width = "14vw"
              height="8vh"
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PullOutBarGenre;
