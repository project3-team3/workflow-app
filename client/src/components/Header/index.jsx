import { Link } from "react-router-dom";

import Auth from "../../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header>
      <div className="navbar-fixed">
      <nav className="navbar-wf">
        <div className="nav-wrapper">
          <Link to="/">
            <img src="/logo_transparent.png" alt="logo" className="logo-wf" />
            <a className="brandname-wf">WORKFLOW</a>
          </Link>
          <a href="#" data-target="mobile-demo" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down navbar-right-container-wf">
            {Auth.loggedIn() ? (
              <>
                <li className="loggedin-text-wf">{Auth.getProfile().data.username}</li>
                <li>
                  <button
                    onClick={logout}
                    className="waves-effect waves-light btn button-wf"
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
    </header>
  );
};

export default Header;
