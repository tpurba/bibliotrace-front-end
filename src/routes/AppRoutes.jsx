import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import SearchPage from "../pages/Search";
import SuggestPage from "../pages/SuggestPage";
import NotFound from "../pages/NotFound";
import AddBooks from "../pages/AddBooks";
import Login from "../pages/Login";
import AdminHome from "../pages/AdminHome";
import AddScannedBooks from "../pages/AddScannedBooks";
import RemoveBook from "../pages/RemoveBook.jsx";
import Checkout from "../pages/BookCheckOut.jsx";
import CheckIn from "../pages/BookCheckIn.jsx";
import ShoppingList from "../pages/ShoppingList.jsx";
import RestockList from "../pages/RestockList.jsx";
import SetLocation from "../pages/SetLocation.jsx";
import CreateUser from "../pages/CreateNewUser.jsx";
import ManageLocations from "../pages/ManageLocations.jsx";
import Audit from "../pages/Audit.jsx";

const AppRoutes = () => {
  const [token, setToken] = useState();
  const [location, setLocation] = useState();

  const saveToken = (userToken) => {
    localStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken);
  };

  const getToken = () => {
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken;
  };

  const PrivateRoute = () => {
    return token || getToken() ? <Outlet /> : <Navigate to="/login" />;
  };
  const AdminRoute = () => {
    return isAdmin ? <Outlet /> : <Navigate to="/" />;
  };

  return (
    <Router basename={"/bibliotrace-front-end"}>
      <Routes>
        <Route path="/" element={<Home />} />
        {/*public pages*/}
        <Route path="/login" element={<Login setToken={saveToken} setLocation={setLocation} />} />
        {/*private pages*/}
        <Route element={<PrivateRoute />}>
          <Route path="/suggest" element={<SuggestPage location={location} />} />
          <Route path="/search" element={<SearchPage location={location} />} />
          {/*admin only pages*/}
          <Route element={<AdminRoute />}>
            <Route path="/add" element={<AddBooks location={location} />} />
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/add-scanned" element={<AddScannedBooks />} />
            <Route path="/audit" element={<Audit />} />
            <Route path="/remove-book" element={<RemoveBook />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkin" element={<CheckIn />} />
            <Route path="/shopping-list" element={<ShoppingList />} />
            <Route path="/restock-list" element={<RestockList />} />
            <Route path="/set-location" element={<SetLocation />} />
            <Route path="/manage-locations" element={<ManageLocations />} />
            <Route path="/create-user" element={<CreateUser />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
