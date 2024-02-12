import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../Slices/UserSlice";
import "../styles/menu_sidebar.css";
import items from "./../menus/sidebar.json";
import items_admin from "./../menus/sidebar_admin.json";

const MenuNiveau1 = ({ item }) => {
  const [open, setOpen] = useState(false);
  // il n'y a pas de sous menu
  if (!item.childrens) {
    return (
      <li className=" n1 icon_plus">
        {/* Vérifie si il y a le bouton + */}
        {item.plus ? (
          <div className="icon_plus">
            <Link to={item.path || "#"}>
              {item.icon && <i className={item.icon}></i>}
              <span className="link_name">{item.title}</span>
            </Link>
            <Link to={item.plusPath || "#"}>
              {item.title && <i className="plus bx bx-plus"></i>}
            </Link>
          </div>
        ) : (
          // il n'y a pas le bouton +
          <div>
            <Link to={item.path || "#"}>
              {item.icon && <i className={item.icon}></i>}
              <span className="link_name">{item.title}</span>
            </Link>
          </div>
        )}
      </li>
    );

    // Il y a un sous-menu
  } else {
    return (
      <li className={open ? " showMenu" : ""}>
        <div className="iocn-link" onClick={() => setOpen(!open)}>
          <Link className="t2" to="#">
            {item.icon && <i className={item.icon}></i>}
            <span className="link_name">{item.title}</span>
          </Link>
          <i className="bx bxs-chevron-down arrow"></i>
        </div>
        <ul className="sub-menu">
          {item.childrens.map((child, index) => (
            <MenuNiveau2 key={index} item={child} />
          ))}
        </ul>
      </li>
    );
  }
};

const MenuNiveau2 = ({ item }) => {
  const [open, setOpen] = useState(false);

  return (
    <li className="n2">
      <div className="icon_plus" onClick={() => setOpen(!open)}>
        <Link className="t2" to={item.path || "#"}>
          <span>{item.title}</span>
        </Link>
        {item.plus ? (
          <Link className="icon_plus" to={item.plusPath || "#"}>
            {item.title && <i className="plus bx bx-plus"></i>}
          </Link>
        ) : (
          <div></div>
        )}
      </div>
    </li>
  );
};

export default function Menu_sidebar() {
  const user = useSelector(selectUser);
  const [showMenu, setShowMenu] = useState(false);
  const onClickShowMenu = () => {
    setShowMenu(!showMenu);
  };

  const Grade = () => {
    let MenuGrade;
    // if user is super admin
    if (user.infos.membre_grade === "1") {
      MenuGrade = items_admin.map((item, index) => (
        <MenuNiveau1 key={index} item={item} />
      ));
    } else {
      MenuGrade = items.map((item, index) => (
        <MenuNiveau1 key={index} item={item} />
      ));
    }
    return <>{MenuGrade}</>;
  };


  return (
    <>
      <nav className={`menu_sidebar ${showMenu ? "close" : ""}`}>
        <div className="logo-details" onClick={onClickShowMenu}>
          <div id="icon_side"></div>
          <span className="logo_name">Menu {user.infos.islogged}</span>
        </div>

        <ul className="nav-links">
          <Grade />
        </ul>

        {user.isLogged === true ? (
          <div className="profile-details">
            <div className="profile-content">
              <img
                src={`https://www.vinsnaturels.fr/999_membres/img/faces/${
                  user.infos.logo || "face-0.jpg"
                }`}
                alt={user.infos.nom}
              />
            </div>
            <div className={`name-job ${showMenu ? "close" : ""}`}>
              <div className="profile_name">
                {user.infos.prenom} {user.infos.nom}
              </div>
            </div>
            <span className="deco">
              <Link to="/logout">
                <i className="bx bx-log-out"></i>
              </Link>
            </span>
          </div>
        ) : (
          <div className="profile-details centre">
            <Link to="/login">
              Se connecter
              <span className="deco">
                <i className="bx bx-log-in"></i>
              </span>
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}
