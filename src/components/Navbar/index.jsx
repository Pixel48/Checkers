import { Link } from "react-router-dom";
import { UserAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  const { user, login, logout } = UserAuth();
  const photoURL = user
    ? user.photoURL
    : "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg";

  return (
    <nav className="nav-wrapper grey darken-3" id="navbar">
      <div className="container">
        <Link
          to="/"
          className="brand-logo"
          style={{
            //   outline: "1px solid white",
            borderRadius: "15px",
            padding: "-15px 15px",
            margin: "0 5px",
            //   display: "block",
          }}>
          Warcabista
        </Link>

        <Link
          className="right z-depth-0"
          style={{
            //   backgroundImage: `url(${photoURL})`,
            //   borderRadius: "50%",
            //   backgroundSize: "cover",
            //   backgroundPosition: "center",
            width: "50px",
            height: "50px",
            margin: "5px",
          }}
          to={user ? `/user/${user?.uid}` : "#"}
          onClick={() => {
            user ? console.log("numb button") : login();
          }}>
          <img
            src={photoURL}
            alt=""
            referrerPolicy="no-referrer"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </Link>
        <button
          className="right"
          onClick={() => logout()}
          style={{
            display: user ? "block" : "none",
            height: "50px",
            margin: "5px",
            backgroundColor: "darkred",
            borderRadius: "15px",
          }}>
          Sign Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
