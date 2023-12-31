// Signup page
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

import Auth from "../utils/auth";

import PopUpModal from "../components/PopUpModal/index.jsx";

// Import default layout for new users
import { defaultLayout } from "../components/WidgetGrid/index.jsx";

const Signup = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // Set default widget statuses for new users
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

  // Update the form state when the user types into the input fields
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSignupError = () => {
    openModal();
  };

  // Handle the form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {

      // Add new user to database with default layout and widgets
      const { data: userData } = await addUser({
        variables: {
          ...formState,
          gridLayout: JSON.stringify(defaultLayout),
          widgets: JSON.stringify(defaultWidgets),
        },
      });

      const { user, token } = userData.addUser;

      Auth.login(token);
    } catch (e) {
      console.error(e);
      handleSignupError(e);
    }
  };

  // Generate relevant error messages for user
  const getErrorMessage = (error) => {
    if (error.message.includes("Path `username` is required")) {
      return "Please enter a username.";
    } else if (
      error.message.includes(
        "E11000 duplicate key error collection: workflow-db.users index: username_1 dup key"
      )
    ) {
      return "This username is already taken, please choose a different one.";
    } else if (error.message.includes("Path `email` is required")) {
      return "Please enter an e-mail address.";
    } else if (
      error.message.includes("This field must contain a valid e-mail address")
    ) {
      return "Invalid e-mail address. Please try again.";
    } else if (
      error.message.includes(
        "E11000 duplicate key error collection: workflow-db.users index: email_1 dup key"
      )
    ) {
      return "There is already an account for that e-mail address, please log in instead.";
    } else if (error.message.includes("Path `password` is required")) {
      return "Please enter a password.";
    } else if (
      error.message.includes("is shorter than the minimum allowed length (8)")
    ) {
      return "Your password must be at least 8 characters long.";
    } else {
      console.log(error);
      return "An error occurred. Please try again.";
    }
  };

  return (
    <div className="box-container-wf">
      <div className="box-wf">
        <h4>Sign Up</h4>
        <div>
          {data ? (
            <p>
              <p>Signup successful. Redirecting to your dashboard...</p>
            </p>
          ) : (
            <form onSubmit={handleFormSubmit} noValidate>
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
        </div>
      </div>
      <PopUpModal isOpen={isModalOpen} onClose={closeModal}>
        {error && (
          <>
            <h2>Error</h2>
            <p>{getErrorMessage(error)}</p>
          </>
        )}
      </PopUpModal>
    </div>
  );
};

export default Signup;
