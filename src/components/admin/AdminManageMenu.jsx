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
    {text: "Add Books", textColor: "white", bgColor: "#110057", borderColor: "white", buttonBgColor: "#110057", onClick: handleTestClick, width : "20vw", height : "10vh"},
    {text: "Audit", textColor: "white", bgColor: "#110057", borderColor: "white", buttonBgColor: "#110057", onClick: handleTestClick, width : "20vw", height : "10vh"},
    {text: "Remove Books", textColor: "white", bgColor: "#110057", borderColor: "white", buttonBgColor: "#110057", onClick: handleTestClick, width : "20vw", height : "10vh"},
    {text: "Edit Genres", textColor: "white", bgColor: "#110057", borderColor: "white", buttonBgColor: "#110057", onClick: handleTestClick, width : "20vw", height : "10vh"},
    {text: "Add Title", textColor: "white", bgColor: "#110057", borderColor: "white", buttonBgColor: "#110057", onClick: handleTestClick, width : "20vw", height : "10vh"},
    {text: "Generate QR Codes", textColor: "white", bgColor: "#110057", borderColor: "white", buttonBgColor: "#110057", onClick: handleTestClick, width : "20vw", height : "10vh"},
    {text: "Set Locations", textColor: "white", bgColor: "#110057", borderColor: "white", buttonBgColor: "#110057", onClick: handleTestClick, width : "20vw", height : "10vh"},
  ];
    

  
  return (
    <div className="absolute left-64 top-auto ">
        <div className="grid grid-cols-2 gap-x-8 w-auto justify-start">
            {menuButtons.map((button, index) => (
            <BarButton
                key={index}
                text={button.text}
                textColor={button.textColor} 
                onClick={button.onClick} 
                borderColor={button.borderColor} 
                bgColor={button.bgColor} 
                buttonBgColor = {button.buttonBgColor}
                width = {button.width}
                height = {button.height}
                />
            ))}
        </div>
    </div> 
  );
}
