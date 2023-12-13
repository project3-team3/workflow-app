import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

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
      const { data } = await addUser({
        variables: { ...formState },
      });

      console.log(data);

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="login-signup-container-wf">
      <div className="login-signup-box-wf z-depth-4">
        <h4>Sign Up</h4>
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
                value={formState.name}
                onChange={handleChange}
              />
              <input
                className="input-field login-signup-input-wf"
                placeholder="Your email"
                name="email"
                type="email"
                value={formState.email}
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

export default Signup;
