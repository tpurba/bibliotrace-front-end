import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import SearchPage from "../pages/Search";
import SuggestPage from "../pages/SuggestPage";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  
  return (
    <Router basename={'/bibliotrace-front-end'}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/suggest" element={<SuggestPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
