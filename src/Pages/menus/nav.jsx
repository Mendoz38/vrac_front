import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/nav.css";

const Nav = () => {
  const [showMenu, setShowMenu] = useState(false);
  const onClickShowMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header id="nav" className={`${showMenu ? "active" : ""}`}>
      <h3 className="titre">Ethik'ette &#9850;</h3>
      <ul>
        <li>
          <Link to={"/"}>Accueil</Link>
        </li>
        <li>
          <Link to={"/"}>Boutique</Link>
        </li>
        <li>
          <Link to={"/"}>Contact</Link>
        </li>
      </ul>
      <div id="icons" onClick={onClickShowMenu}></div>
    </header>
  );
};

export default Nav;
