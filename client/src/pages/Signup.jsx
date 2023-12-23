import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

import Auth from "../utils/auth";

import { defaultLayout } from "../components/WidgetGrid/index.jsx";

const Signup = () => {
  const defaultWidgets = [
    {
      name: "calendar",
      active: true,
    },
    {
      name: "clock",
      active: true,
    },
    {
      name: "filemanagement",
      active: true,
    },
    {
      name: "notepad",
      active: true,
    },
    {
      name: "schedule",
      active: true,
    },
    {
      name: "stickynote",
      active: true,
    },
    {
      name: "todolist",
      active: true,
    },
    {
      name: "meditation",
      active: true,
    },
    {
      name: "inspiringquote",
      active: true,
    },
    {
      name: "balancetip",
      active: true,
    },
  ];
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

    console.log("Form State:", formState);

    try {
      const { data: userData } = await addUser({
        variables: {
          ...formState,
          gridLayout: JSON.stringify(defaultLayout),
          widgets: JSON.stringify(defaultWidgets),
        },
      });

      console.log(userData);

      debugger;

      const { user, token } = userData.addUser;

      console.log("Created user:", user);

      debugger;

      Auth.login(token);
    } catch (error) {
      console.error("Mutation Error:", error.message);
      console.error("GraphQLErrors:", error.graphQLErrors);
      console.error("NetworkError:", error.networkError);
      console.error("Extra Info:", error.extraInfo);
    }
  };

  return (
    <div className="box-container-wf">
      <div className="box-wf">
        <h4>Sign Up</h4>
        <div>
          {data ? (
            <p>
              Success! You may now head{" "}
              <Link to="/">back to the homepage.</Link>
            </p>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <div className="login-signup-inner-container-wf">
                <input
                  className="input-field input-wf"
                  placeholder="Your username"
                  name="username"
                  type="text"
                  value={formState.username}
                  onChange={handleChange}
                />
                <input
                  className="input-field input-wf"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className="input-field input-wf"
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
              </div>
            </form>
          )}

          {error && (
            <div className="error-message-wf login-signup-error-wf">
              {error.message}
            </div>
          )}

          {addUser.error && (
            <div className="error-message-wf login-signup-error-wf">
              {addUser.error.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
