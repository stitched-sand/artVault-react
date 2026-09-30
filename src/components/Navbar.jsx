import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <nav>
        <div className="container nav__container">
          
          <div className="logo">
            <Link to="/">
              <span className="logo__text">ArtVault</span>
            </Link>
          </div>

          <ul className="nav__links">
            <li>
              <Link to="/" className="nav__link">
                Home
              </Link>
            </li>

            <li>
              <Link to="/browse" className="nav__link">
                Browse Collection
              </Link>
            </li>

            <li>
              <a href="#footer" className="nav__link nav__link--primary">
                Contact
              </a>
            </li>
          </ul>

        </div>
      </nav>
    </header>
  );
}

export default Navbar;