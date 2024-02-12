import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../Slices/UserSlice";
import {
  UserPlus2,
  UserCog2,
} from "lucide-react";

const Icone = (props) => {
  const user = useSelector(selectUser);

  return (
    <div>
      {user.isLogged ? (
        <>
          <Link to="/" target="_parent" className="text_vert">
            <UserCog2 size={38} />
          </Link>
        </>
      ) : (
        <>
          <Link to="/Login" target="_parent" className="text_vert">
            <UserPlus2  size={38} />
          </Link>
        </>
      )}
    </div>
  );
};

export default Icone;

/*
          {user.isLogged ? (
            <><Link to="https://www.vinsnaturels.fr"><UserCog className="text_vert"  size={38} /></Link></>
          ) :
            <><Link to="https://www.google.fr"><UserPlus2 className="text_vert"  size={38} /></Link></>
            }
          
*/
