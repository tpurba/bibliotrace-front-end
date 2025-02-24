import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import SearchPage from "../pages/Search";
import SuggestPage from "../pages/SuggestPage";
import NotFound from "../pages/NotFound";
import AddBooks from "../pages/AddBooks";
import Cookies from 'js-cookie';

import Login from "../pages/Login";
import AdminHome from "../pages/AdminHome";
import AddScannedBooks from "../pages/AddScannedBooks";
import RemoveBook from "../pages/RemoveBook.jsx";
import Checkout from "../pages/BookCheckOut.jsx";
import Checkin from "../pages/BookCheckinPage.jsx";

const AppRoutes = () => {

  const getToken = () => {
    const tokenString = Cookies.get("jwtData");
    if (tokenString == null) {
      return null
    } else {
      return JSON.parse(tokenString);;
    }
  };

  const PrivateRoute = () => {
    const token = getToken()
    if (token == null || token.userRole == null) {
      return <Navigate to="/login" />
    } else if (String(token.userRole.roleType) === 'Admin') {
      return <Outlet />
    } else {
      return <Navigate to="/" />
    }
  };

  return (
    <Router basename={"/bibliotrace-front-end"}>
      <Routes>
        {/*public pages*/}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/suggest" element={<SuggestPage />} />
        <Route path="/search" element={<SearchPage />} />
        {/*private pages*/}
        <Route element={<PrivateRoute />}>
          <Route path="/add" element={<AddBooks />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/add-scanned" element={<AddScannedBooks />} />
          <Route path="/remove-book" element={<RemoveBook />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkin" element={<Checkin />} />
        </Route>
        <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
