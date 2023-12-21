import { useEffect } from "react";
import { Link } from "react-router-dom";

import Auth from "../../utils/auth";

const Header = () => {
  
  useEffect(() => {
    const elems = document.querySelectorAll(".sidenav");
    const instances = M.Sidenav.init(elems);
  }, []);

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    window.location.href = "/";
  };

  return (
    <header>
      <div className="navbar-fixed">
        <nav className="navbar-wf">
          <div className="nav-wrapper">
            {Auth.loggedIn() ? (
              <a href="#" data-target="menu-wf" className="sidenav-trigger">
                <i className="material-icons">menu</i>
              </a>
            ) : (
              <img
                src="/logo_transparent.png"
                alt="logo"
                className="navbar-logo-wf"
              />
            )}
            <Link to="/" className="brandname-wf">
              WORKFLOW
            </Link>
            <ul className="right navbar-right-container-wf">
              {Auth.loggedIn() ? (
                <>
                  <li className="loggedin-text-wf">
                    Welcome back, {Auth.getProfile().user.username}
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
      <ul className="sidenav sidenav-wf" id="menu-wf">
        <img src="/logo_transparent.png" alt="logo" className="logo-wf" />
        <li className="sidenav-username-wf">
          {Auth.loggedIn() ? Auth.getProfile().user.username : null}
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
          <a href="/settings">Settings</a>
        </li>
        <li className="menu-space-filler-wf"></li>
        <li>
          <a href="#!" onClick={logout}>
            Logout
          </a>
        </li>
      </ul>
    </header>
  );
};

export default Header;
