import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import SearchPage from "../pages/SearchPage"
import RequestBook from "../pages/RequestBook"
import NotFound from "../pages/NotFound"

const BASE_URL = '/bibliotrace-front-end'

const AppRoutes = () => {
  
  return (
    <Router basename={BASE_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/requestbook" element={<RequestBook />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;