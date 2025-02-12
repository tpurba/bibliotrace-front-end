// This page will mainly be the landing page for the Admin portal. It will be a shell with the navbar, search bar,
// and navigation buttons on the right hand side. The inner portion will be filled by the following list of components:
// Home, ManageInventory, Settings, Help, and Reports. These components are stored in the ../components/admin folder.
import React, { useState} from "react"
import { useNavigate } from "react-router-dom";
import AdminNavBar from "../components/admin/AdminNavBar.jsx";
import AdminMainMenu from "../components/admin/AdminMainMenu.jsx";
import AdminSideBar from "../components/admin/AdminSideBar.jsx";


export default function AdminHome({}) {
  const [searchInput, setSearchInput] = useState('')
  const navigate = useNavigate(); 
  
  //handle routes
  const handleTestClick = () => {
    console.log('Button pressed');
  };
  
  const handleManageInventory = () => {
    navigate("/manage");
  };

  const sideButtons =[
    {text: "Manage Inventory", textColor: "darkBlue", bgColor: "white", borderColor: "darkBlue", buttonBgColor: "white", onClick: handleManageInventory, className: "mt-12 pr-16", width : "14vw", height : "7vh"},
    {text: "Settings", textColor: "darkBlue", bgColor: "white", borderColor: "darkBlue", buttonBgColor: "white", onClick: handleTestClick, className: "mt-12 pr-16", width : "14vw", height : "7vh"},
    {text: "Reports", textColor: "darkBlue", bgColor: "white", borderColor: "darkBlue", buttonBgColor: "white", onClick: handleTestClick, className: "mt-12 pr-16", width : "14vw", height : "7vh"},
    {text: "Help", textColor: "darkBlue", bgColor: "white", borderColor: "darkBlue", buttonBgColor: "white", onClick: handleTestClick, className: "mt-12 pr-16", width : "14vw", height : "7vh"},
  ];


  return (


  
<div className={`h-screen w-screen pb-5 flex flex-col items-center`}>
  <svg
    className="-z-10 absolute left-0 top-0"
    width="100vw"
    height="100%"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
  >
    <path
      className="fill-darkBlue "
      d="
        M0,30
        C12.5,25 25,40 37.5,40
        S62.5,25 75,30
        S87.5,40 100,40
        L100,0
        L0,0
        Z"
      transform="rotate(270, 50, 50) scale(1, 2)"
  />
  </svg>
  
  <AdminNavBar useDarkTheme={true} showTitle={false} bgColor={"#FFFFFF"} textColor={"#110057"} />
  <div className="pt-32 ">
    <AdminMainMenu />
  </div>
  <AdminSideBar
    buttons = {sideButtons}
    />
</div>

  );
}