import { useEffect } from "react";
import { Link } from "react-router-dom";

import Auth from "../../utils/auth";

const Header = () => {
  useEffect(() => {
    const elems = document.querySelectorAll(".sidenav");
    const instances = M.Sidenav.init(elems);
    const elemsDropdown = document.querySelectorAll(".dropdown-trigger");
    const instancesDropdown = M.Dropdown.init(elemsDropdown, {
      coverTrigger: false,
    });
  }, []);
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header>
      <div className="navbar-fixed">
        <nav className="navbar-wf">
          <div className="nav-wrapper">
            <a href="#" data-target="mobile-demo" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
            <a href="#!" className="desktop-logo-display-wf">
              <img src="/logo_transparent.png" alt="logo" className="logo-wf" />
            </a>
            <Link to="/" className="brandname-wf">
              WORKFLOW
            </Link>
            <ul className="right hide-on-med-and-down navbar-right-container-wf">
              {Auth.loggedIn() ? (
                <>
                  <li className="loggedin-text-wf">
                    {Auth.getProfile().data.username}
                  </li>
                  <li>
                    <button
                      onClick={logout}
                      className="waves-effect waves-light btn login-button-wf button-wf"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/login"
                      className="waves-effect waves-light btn button-wf"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/signup"
                      className="waves-effect waves-light btn button-wf"
                    >
                      Signup
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </div>
      {Auth.loggedIn() ? (
        <ul className="sidenav mobile-sidenav-wf" id="mobile-demo">
          <li className="sidenav-username-wf">
            {Auth.getProfile().data.username}
          </li>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/chat">Chat</a>
          </li>
          <li>
            <a href="/videochat">Video Chat</a>
          </li>
          <li>
            <a href="#!" onClick={logout}>
              Logout
            </a>
          </li>
        </ul>
      ) : (
        <ul className="sidenav mobile-sidenav-wf" id="mobile-demo">
          <li>
            <a href="/home">Home</a>
          </li>
          <li>
            <a href="/chat">Chat</a>
          </li>
          <li>
            <a href="/videochat">Video Chat</a>
          </li>
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/signup">Signup</a>
          </li>
        </ul>
      )}
    </header>
  );
};

export default Header;
