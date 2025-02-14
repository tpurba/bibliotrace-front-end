// This page will mainly be the landing page for the Admin portal. It will be a shell with the navbar, search bar,
// and navigation buttons on the right hand side. The inner portion will be filled by the following list of components:
// Home, ManageInventory, Settings, Help, and Reports. These components are stored in the ../components/admin folder.
import React, {useState} from "react"
import { useNavigate } from "react-router-dom";
import AdminNavBar from "../components/admin/AdminNavBar.jsx";
import AdminManageMenu from "../components/admin/AdminManageMenu.jsx";
import AdminSideBar from "../components/admin/AdminSideBar.jsx";


export default function ManageInventory({}) {
  const [searchInput, setSearchInput] = useState('')
  const navigate = useNavigate(); 
  
  //handle routes
  const handleTestClick = () => {
    console.log('Button pressed');
  };

  const handleAddBookNav = () => {
    navigate("/add-scanned");
  };

  const handleRemoveBookNav = () => {
    navigate("/remove-book");
  };

  const inventoryButtons =[
    {text: "Add Books", textColor: "white", bgColor: "#110057", borderColor: "white", buttonBgColor: "#110057", onClick: handleAddBookNav, width : "20vw", height : "10vh"},
    {text: "Audit", textColor: "white", bgColor: "#110057", borderColor: "white", buttonBgColor: "#110057", onClick: handleTestClick, width : "20vw", height : "10vh"},
    {text: "Remove Books", textColor: "white", bgColor: "#110057", borderColor: "white", buttonBgColor: "#110057", onClick: handleRemoveBookNav, width : "20vw", height : "10vh"},
    {text: "Edit Genres", textColor: "white", bgColor: "#110057", borderColor: "white", buttonBgColor: "#110057", onClick: handleTestClick, width : "20vw", height : "10vh"},
    {text: "Add Title", textColor: "white", bgColor: "#110057", borderColor: "white", buttonBgColor: "#110057", onClick: handleTestClick, width : "20vw", height : "10vh"},
    {text: "Generate QR Codes", textColor: "white", bgColor: "#110057", borderColor: "white", buttonBgColor: "#110057", onClick: handleTestClick, width : "20vw", height : "10vh"},
    {text: "Set Locations", textColor: "white", bgColor: "#110057", borderColor: "white", buttonBgColor: "#110057", onClick: handleTestClick, width : "20vw", height : "10vh"},
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
      <path className="fill-darkBlue" d="M 75,0 C 55,30 105,40 65,100  L 0,100 L 0,00"></path>
    </svg>
    <AdminNavBar useDarkTheme={true} showTitle={false} bgColor={"#FFFFFF"} textColor={"#110057"} />
    
    <div className="pt-32 ">
      <h1 className="absolute left-1/4 text-white">Manage Inventory</h1>
      <div className="pt-16 ">
        <AdminManageMenu menuButtons= {inventoryButtons} />
      </div>
    </div>
    <AdminSideBar/>
  </div>

    );
}