import NewBarButton from "../NewBarButtons.jsx";
export default function Sidebar({onMenuChange, activeButton, setActiveButton}) {
  //handle routes
  const handleButtonClick = (menu, buttonText) =>{
    setActiveButton(buttonText);
    if(menu){
      onMenuChange(menu);
    }
  }

 
  
  // const buttons =[
  //   {text: "Manage Inventory", textColor: "darkBlue", bgColor: "white", borderColor: "darkBlue", buttonBgColor: "white", onClick: handleManageInventory, className: "mt-12 pr-16", width : "14vw", height : "7vh"},
  //   {text: "Settings", textColor: "white", bgColor: "darkBlue", borderColor: "darkBlue", buttonBgColor: "white", onClick: handleSettingsNav, className: "mt-12 pr-16", width : "14vw", height : "7vh"},
  //   {text: "Reports", textColor: "darkBlue", bgColor: "white", borderColor: "darkBlue", buttonBgColor: "white", onClick: handleTestClick, className: "mt-12 pr-16", width : "14vw", height : "7vh"},
  //   {text: "Help", textColor: "darkBlue", bgColor: "white", borderColor: "darkBlue", buttonBgColor: "white", onClick: handleTestClick, className: "mt-12 pr-16", width : "14vw", height : "7vh"},
  // ];
  
  const buttons = [
    { text: "Manage Inventory", menu: "inventory" },
    { text: "Settings", menu: "settings" },
    { text: "Reports", menu: null },
    { text: "Help", menu: null }
  ];

    return (
      <div className="ml-auto flex flex-col">
      {buttons.map((button, index) => (
        <NewBarButton
          key={index}
          text={button.text}
          onClick={() => handleButtonClick(button.menu, button.text)}
          className={`mt-12 px-10 w-[14vw] h-[7vh] transition-colors duration-300
            ${
              activeButton === button.text
                ? "bg-darkBlue text-white" // Active style
                : "bg-white text-darkBlue border-4 border-darkBlue" // Default style
            }`}
        />
      ))}
    </div>
  );
}