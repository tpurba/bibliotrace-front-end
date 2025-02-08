//Libraries 
import { useNavigate } from "react-router-dom";
import BarButton from "../BarButtons";
import React, { useState} from "react"

export default function MainMenu() {
  const navigate = useNavigate(); 

  const handleTestClick = () => {
    console.log('Button pressed');
  };


  const menuButtons =[
    {text: "Add Books", textColor: "white", bgColor: "#110057", borderColor: "white", buttonBgColor: "#110057", onClick: handleTestClick, className: "mt-12 pr-16"},
    {text: "Audit", textColor: "white", bgColor: "#110057", borderColor: "white", buttonBgColor: "#110057", onClick: handleTestClick, className: "mt-12 pr-16"},
    {text: "Remove Books", textColor: "white", bgColor: "#110057", borderColor: "white", buttonBgColor: "#110057", onClick: handleTestClick, className: "mt-12 pr-16"},
    {text: "Edit Genres", textColor: "white", bgColor: "#110057", borderColor: "white", buttonBgColor: "#110057", onClick: handleTestClick, className: "mt-12 pr-16"},
    {text: "Add Title", textColor: "white", bgColor: "#110057", borderColor: "white", buttonBgColor: "#110057", onClick: handleTestClick, className: "mt-12 pr-16"},
    {text: "Generate QR Codes", textColor: "white", bgColor: "#110057", borderColor: "white", buttonBgColor: "#110057", onClick: handleTestClick, className: "mt-12 pr-16"},
    {text: "Set Locations", textColor: "white", bgColor: "#110057", borderColor: "white", buttonBgColor: "#110057", onClick: handleTestClick, className: "mt-12 pr-16"},
  ];
    

  
  return (
    <div className="absolute left-32 top-auto ">
        <div className="grid grid-cols-2 gap-4 w-2/3 justify-start">
            {menuButtons.map((button, index) => (
            <BarButton
                key={index}
                text={button.text}
                textColor={button.textColor} 
                onClick={button.onClick} 
                borderColor={button.borderColor} 
                bgColor={button.bgColor} 
                buttonBgColor = {button.buttonBgColor}
                className={button.className}
                />
            ))}
        </div>
    </div> 
  );
}
