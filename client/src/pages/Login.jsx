import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const Login = (props) => {
  const [formState, setFormState] = useState({ username: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    setFormState({
      username: "",
      password: "",
    });
  };

  return (
    <div className="login-signup-container-wf">
      <div className="login-signup-box-wf z-depth-4">
        <h4>Log In</h4>
        <div>
          {data ? (
            <p>
              Success! You may now head{" "}
              <Link to="/">back to the homepage.</Link>
            </p>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <input
                className="input-field login-signup-input-wf"
                placeholder="Your username"
                name="username"
                type="text"
                value={formState.username}
                onChange={handleChange}
              />
              <input
                className="input-field login-signup-input-wf"
                placeholder="Your password"
                name="password"
                type="password"
                value={formState.password}
                onChange={handleChange}
              />
              <button
                style={{ cursor: "pointer" }}
                type="submit"
                className="waves-effect waves-light btn button-wf login-signup-button-wf"
              >
                Submit
              </button>
            </form>
          )}

          {error && <div className="login-signup-error-wf">{error.message}</div>}
        </div>
      </div>
    </div>
  );
};

export default Login;
