import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import SearchPage from "../pages/Search";
import SuggestPage from "../pages/SuggestPage";
import NotFound from "../pages/NotFound";
import AddBooks from "../pages/AddBooks";

import Login from "../pages/Login";
import AdminHome from "../pages/AdminHome";
import AddScannedBooks from "../pages/AddScannedBooks";
import ManageInventory from "../pages/ManageInventory";

const AppRoutes = () => {
  const [token, setToken] = useState();
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

  return (
    <Router basename={"/bibliotrace-front-end"}>
      <Routes>
        <Route path="/" element={<Home />} />
        {/*public pages*/}
        <Route path="/login" element={<Login setToken={saveToken} />} />
        <Route path="/suggest" element={<SuggestPage />} />
        <Route path="/search" element={<SearchPage />} />
        {/*private pages*/}
        <Route element={<PrivateRoute />}>
          <Route path="/add" element={<AddBooks />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/add-scanned" element={<AddScannedBooks />} />
          <Route path="/manage" element={<ManageInventory />} />
        </Route>
        <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
