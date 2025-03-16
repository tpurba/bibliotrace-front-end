import NewBarButton from "../NewBarButtons.jsx";
export default function Sidebar({onMenuChange, activeButton, setActiveButton}) {
  //handle routes
  const handleButtonClick = (menu, buttonText) =>{
    setActiveButton(buttonText);
    if(menu){
      onMenuChange(menu);
    }
  }
  
  const buttons = [
    { text: "Manage Inventory", menu: "inventory" },
    { text: "Settings", menu: "settings" },
    { text: "Reports", menu: "report" },
    { text: "Help", menu: null }
  ];

    return (
      <div className="ml-auto flex flex-col">
      {buttons.map((button, index) => (
        <NewBarButton
          key={index}
          text={button.text}
          onClick={() => handleButtonClick(button.menu, button.text)}
          className={`h-md:mt-12 mt-6 px-10 5xl:w-[20rem] 3xl:w-[15rem] 2xl:w-[8rem] xl:w-[8rem] w-[7rem]  5xl:h-[6rem] 3xl:h-[4rem] h-[3rem] transition-colors duration-300
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