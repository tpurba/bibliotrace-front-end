//Libraries 
import { useNavigate } from "react-router-dom";
import BarButton from "../BarButtons";
import React, { useState} from "react"

export default function AdminMainMenu({menuButtons, title}) {
  
  return (
    <div className="absolute left-64 top-auto flex flex-col items-center">
      <h1 className="relative text-white pb-10 text-center">{title}</h1>
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
