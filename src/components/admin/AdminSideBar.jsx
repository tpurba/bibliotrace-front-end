import BarButton from "../BarButtons";
import { useNavigate } from "react-router-dom";
export default function Sidebar() {
  const navigate = useNavigate(); 
  //handle routes
  const handleTestClick = () => {
    console.log('Button pressed');
  };

  const handleManageInventory = () => {
    console.log('manage pressed');
    navigate("/manage");
  };

  const handleSettingsNav = () => {
    navigate("/settings")
  }
  
  const buttons =[
    {text: "Manage Inventory", textColor: "darkBlue", bgColor: "white", borderColor: "darkBlue", buttonBgColor: "white", onClick: handleManageInventory, className: "mt-12 pr-16", width : "14vw", height : "7vh"},
    {text: "Settings", textColor: "white", bgColor: "darkBlue", borderColor: "darkBlue", buttonBgColor: "white", onClick: handleSettingsNav, className: "mt-12 pr-16", width : "14vw", height : "7vh"},
    {text: "Reports", textColor: "darkBlue", bgColor: "white", borderColor: "darkBlue", buttonBgColor: "white", onClick: handleTestClick, className: "mt-12 pr-16", width : "14vw", height : "7vh"},
    {text: "Help", textColor: "darkBlue", bgColor: "white", borderColor: "darkBlue", buttonBgColor: "white", onClick: handleTestClick, className: "mt-12 pr-16", width : "14vw", height : "7vh"},
  ];

    return (
      <div className="ml-auto flex flex-col">
        {buttons.map((button, index) => (
          <BarButton
            key={index}
            text={button.text}
            textColor={button.textColor} 
            onClick={button.onClick} 
            borderColor={button.borderColor} 
            bgColor={button.bgColor} 
            buttonBgColor = {button.buttonBgColor}
            className={button.className}
            width = {button.width}
            height = {button.height}
          />
        ))}
      </div>
    );
  }
  