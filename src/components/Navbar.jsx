import { Link } from "react-router-dom";
import Signer from "./Signer";

const Navbar = (props) => {
  const user = props.user;

  return (
    <nav className="nav-wrapper grey darken-3">
      <div className="container">
        <Link to="/" className="brand-logo">
          Warcabista
        </Link>

        <ul className="right">
          <li>
            <Signer user={user} className="right btn btn-floating z-depth-0" />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
