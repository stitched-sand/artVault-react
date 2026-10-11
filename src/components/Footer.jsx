import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <i className="fa-solid fa-paintbrush logo__icon"></i>

            <span className="logo__text">ArtVault</span>
          </Link>
        </div>

        <div className="footer__list">
          <Link to="/" className="footer__link">
            Home
          </Link>

          <Link to="/browse" className="footer__link">
            Browse Collection
          </Link>

          <a href="#footer" className="footer__link">
            Contact
          </a>
        </div>

        <div className="footer__copyright">Copyright &copy; 2026 ArtVault</div>
      </div>
    </footer>
  );
};

export default Footer;
