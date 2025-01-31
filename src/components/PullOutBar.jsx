import React from "react";
import { X } from "lucide-react";
import BarButton from "./BarButtons";
import { useNavigate } from "react-router-dom";
const PullOutBar = ({ onClose }) => {
  const navigate = useNavigate(); 

  const handleSearch = () => {
    navigate("/search");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-start backdrop-blur-sm">
      {/* PullOutBar Container */}
      <div
        className={`fixed top-40 left-0 h-128 w-72 bg-white border-4 border-orange shadow-lg rounded-tr-3xl rounded-br-3xl z-40 transition-transform translate-x-0`}
      >
        {/* Header with Close Icon */}
        <div className="flex items-center justify-between p-2 bg-orange-500 text-white">
          <h2 className="text-xl font-bold text-orange">Explore by Age</h2>
          <button className="bg-white " onClick={onClose}>
            <X size={30} strokeWidth={4} className="text-orange"/>
          </button>
        </div>
        <ul>
          <BarButton
            text={"Board Books\n(0-2 Years)"}
            textColor="#110057"
            onClick={handleSearch}
            borderColor="#fa8804" 
            bgColor="#FFFFFF"
          />
          <BarButton
            text={"Picture Books\n(2-8 Years)"}
            textColor="#110057"
            onClick={handleSearch}
            borderColor="#fa8804" 
            bgColor="#FFFFFF"
          />
          <BarButton
            text={"Early Chapter Books\n(6-9 Years)"}
            textColor="#110057"
            onClick={handleSearch}
            borderColor="#fa8804" 
            bgColor="#FFFFFF"
          />
          <BarButton
            text={"Middle Grade\n(8-12 Years)"}
            textColor="#110057"
            onClick={handleSearch}
            borderColor="#fa8804" 
            bgColor="#FFFFFF"
          />
          <BarButton
            text={"Young Adult\n(12-18 Years)"}
            textColor="#110057"
            onClick={handleSearch}
            borderColor="#fa8804" 
            bgColor="#FFFFFF"
          />
        </ul>
      </div>
    </div>
  );
};

export default PullOutBar;
