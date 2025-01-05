import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white text-center p-3 m-3">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} My Website. All rights reserved.
      </p>
      <a
        href="https://github.com/onuryilmaaz"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fi fi-brands-github"></i>
      </a>
    </footer>
  );
};

export default Footer;
