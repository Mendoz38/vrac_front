import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../Slices/UserSlice";
import { UserPlus2, UserCog2, Send, Search, Wine, UtensilsCrossed, ShoppingBasket } from 'lucide-react';

const Header = (props) => {
  const user = useSelector(selectUser);
  const url = (window.location.pathname);
  return (
    <>
    {url !=="/Icone"  && (
    <nav className="menu">
      <div className="logo"><Link to="/"><img src="https://www.vinsnaturels.fr/design/vin_nat.jpg" alt="Vin Nat'" /></Link></div>
          <Link to="/">Le Vin Naturel</Link>
          <Link to="/Icone">Vignerons</Link>
          <Link to="/">Salons</Link>
          <Link to="/"><span><Wine size={18}/> Où</span> <span> Boire</span></Link>
          <Link to="/"><span><UtensilsCrossed size={18}/> Où</span> <span> Manger</span></Link>
          <Link to="/"><span><ShoppingBasket size={18}/> Où</span> <span> Acheter</span></Link>
          <Link to="/"><Send size={18}/>Contact</Link>
          <Link to="/"> <Search size={18}/> Rechercher</Link>
          {user.isLogged ? (
            <><Link to="/Profile"><UserCog2 className="text_vert"  size={38} /></Link></>
          ) :
            <><Link to="/Login"><UserPlus2 className="text_vert"  size={38} /></Link></>
            }
    </nav>
    )}
    </>
  );
};

export default Header;
