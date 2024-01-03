// Login page
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

import Auth from "../utils/auth";

import PopUpModal from "../components/PopUpModal/index.jsx";

const Login = (props) => {
  const [formState, setFormState] = useState({ username: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // Update the form state when the user types into the input fields
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleLoginError = () => {
    openModal();
  };

  // Handle the form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
      handleLoginError(e);
    }

    // Clear the form values
    setFormState({
      username: "",
      password: "",
    });
  };

  // Generate relevant error messages for user
  const getErrorMessage = (error) => {
    if (error.message.includes("UserNotFoundError")) {
      return "Username not found. Please sign up to create a new account.";
    } else if (error.message.includes("IncorrectPasswordError")) {
      return "Incorrect password. Please try again.";
    } else {
      return "An error occurred. Please try again.";
    }
  };

  return (
    <div className="box-container-wf">
      <div className="box-wf">
        <h4>Log In</h4>
        <div>
          {data ? (
            <p>Login successful. Redirecting to your dashboard...</p>
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

export default Login;
