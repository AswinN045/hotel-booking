import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import HotelPage from "./pages/HotelPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/hotels" element={<HotelPage />} />
      </Routes>
    </Router>
  );
}

export default App;
