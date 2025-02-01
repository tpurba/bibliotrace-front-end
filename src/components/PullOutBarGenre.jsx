import React from "react";
import { X } from "lucide-react";
import BarButton from "./BarButtons";
import { useNavigate } from "react-router-dom";
const PullOutBarGenre = ({ onClose }) => {
  const navigate = useNavigate(); 

  const handleSearch = () => {
    navigate("/search");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-start backdrop-blur-sm">
      {/* PullOutBar Container */}
      <div
        className={`fixed top-30 right-0 h-128 w-72 bg-white border-4 border-skyBlue shadow-lg rounded-tl-3xl rounded-bl-3xl z-40 transition-transform translate-x-0`}
      >
        {/* Header with Close Icon */}
        <div className="flex items-center justify-between p-2 bg-orange-500 text-white">
          <button className="bg-white " onClick={onClose}>
            <X size={30} strokeWidth={4} className="text-skyBlue"/>
          </button>
          <h2 className="text-xl font-bold text-skyBlue">Explore by Genre</h2>
          
        </div>
        <ul>
          <BarButton
            text={"Fantasy"}
            textColor="#110057"
            onClick={handleSearch}
            borderColor="#669bff" 
            bgColor="#FFFFFF"
          />
          <BarButton
            text={"Science Fiction"}
            textColor="#110057"
            onClick={handleSearch}
            borderColor="#669bff" 
            bgColor="#FFFFFF"
          />
          <BarButton
            text={"Dystopian"}
            textColor="#110057"
            onClick={handleSearch}
            borderColor="#669bff" 
            bgColor="#FFFFFF"
          />
          <BarButton
            text={"Historical Fiction"}
            textColor="#110057"
            onClick={handleSearch}
            borderColor="#669bff" 
            bgColor="#FFFFFF"
          />
          <BarButton
            text={"Mystery/Thriller"}
            textColor="#110057"
            onClick={handleSearch}
            borderColor="#669bff" 
            bgColor="#FFFFFF"
          />
          <BarButton
            text={"Fiction"}
            textColor="#110057"
            onClick={handleSearch}
            borderColor="#669bff" 
            bgColor="#FFFFFF"
          />
          <BarButton
            text={"Graphic Novels"}
            textColor="#110057"
            onClick={handleSearch}
            borderColor="#669bff" 
            bgColor="#FFFFFF"
          />
          <BarButton
            text={"Non-Fiction"}
            textColor="#110057"
            onClick={handleSearch}
            borderColor="#669bff" 
            bgColor="#FFFFFF"
          />
          <BarButton
            text={"Poetry"}
            textColor="#110057"
            onClick={handleSearch}
            borderColor="#669bff" 
            bgColor="#FFFFFF"
          />
          <BarButton
            text={"Romance"}
            textColor="#110057"
            onClick={handleSearch}
            borderColor="#669bff" 
            bgColor="#FFFFFF"
          />
        </ul>
      </div>
    </div>
  );
};

export default PullOutBarGenre;
