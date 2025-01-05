import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";
import UsersDetails from "./components/UsersDetails";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  // onSearch fonksiyonu
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm); // searchTerm'i güncelle
  };

  return (
    <Router>
      <Header onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<Content searchTerm={searchTerm} />} />
        <Route path="/users/:login" element={<UsersDetails />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
