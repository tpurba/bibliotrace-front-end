// This page will mainly be the landing page for the Admin portal. It will be a shell with the navbar, search bar,
// and navigation buttons on the right hand side. The inner portion will be filled by the following list of components:
// Home, ManageInventory, Settings, Help, and Reports. These components are stored in the ../components/admin folder.
import AdminNavBar from "../components/admin/AdminNavBar.jsx";
import AdminMainMenu from "../components/admin/AdminMainMenu.jsx";
import AdminSideBar from "../components/admin/AdminSideBar.jsx";


export default function AdminHome({}) {
  return (
    <div className={`size-full pb-5 flex flex-col items-center`}>
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
            M0,40
            C12.5,38 25,40 37.5,42
            C50,44 62.5,42 75,40
            C87.5,38 93,39 100,40
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
      <AdminSideBar/>
    </div>

      );
}