import React from "react";
import { Link } from "react-router-dom";

function Nav({ user, setUser }) {
  let linkTitle1 = user ? user.username : "Sign up";
  let link1 = user ? "/profile" : "/sign-up";

  let linkTitle2 = user ? "logout" : "Sign in";
  let link2 = user ? "/" : "/sign-in";

  let logoutButton = user ? logout : () => {};

  function logout() {
    setUser(null);
    window.localStorage.removeItem("jwtToken");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to={link1} className="nav-link active" aria-current="page">
                {linkTitle1}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={link2}
                className="nav-link"
                onClick={() => logoutButton()}
              >
                {linkTitle2}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
