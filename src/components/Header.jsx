import React, { useState } from "react";

const Header = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value); // onSearch fonksiyonu burada çağrılıyor
  };

  const handleLogoClick = () => {
    window.location.href = "/";
  };

  return (
    <header className="flex items-center justify-between p-5 bg-black text-3xl text-white font-mono">
      <div onClick={handleLogoClick} style={{ cursor: "pointer" }}>
        <i className="fi fi-brands-github"> User-List</i>
      </div>
      <div className="relative w-full md:w-auto flex items-center bg-gray-100 rounded-full shadow-lg px-4 py-2">
        <i className="fi fi-rr-search text-gray-500 text-lg mr-2"></i>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search"
          className="bg-transparent outline-none flex-grow text-sm text-gray-700"
        />
      </div>
    </header>
  );
};

export default Header;
