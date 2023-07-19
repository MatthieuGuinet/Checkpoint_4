import React, { useState, useContext } from "react";
import axios from "axios";
import "./Authentication.scss";
import { useNavigate } from "react-router-dom";
import AuthenticationContext from "../../contexts/AuthenticationContext";

export default function Authentication() {
  const { setUser, setUserInfo } = useContext(AuthenticationContext);

  // useState definition
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [failAuth, setFailAuth] = useState(false);

  const navigate = useNavigate();

  // submit handler for the form
  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const dataFromForm = Object.fromEntries(formData.entries());
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/users/login`, dataFromForm)
      .then((response) => {
        if (response.data.token) {
          setUser(response.data.token);
          setUserInfo(response.data.user);
          navigate("/home");
        } else {
          console.info(response);
        }
      })
      .catch((error) => {
        console.error(error.message);
        setFailAuth(true);
      });
  };

  // handler for change in password input
  const handlePasswordChange = (event) => setPassword(event.target.value);

  // toggle to change type input for password to show it if user click on the SHOW button
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="connection">
        <div className="connection-input">
          <label className="username-label" htmlFor="username">
            Username
          </label>
          <input
            name="username"
            id="username"
            className="input-username"
            type="text"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="password-section">
          <label className="password-label" htmlFor="password">
            Password
          </label>
          <div className="password-input-and-show">
            <input
              name="password"
              id="password"
              className="input-pw"
              autoComplete="current-password"
              type={!passwordShown ? "password" : "text"}
              value={password}
              onChange={handlePasswordChange}
            />
            <button
              onClick={togglePassword}
              type="button"
              className="hide-or-show-button"
            >
              <i
                id="pw-icon-show-hide"
                className={
                  passwordShown ? "fi fi-rr-eye-crossed" : "fi fi-rr-eye"
                }
                alt="button to show or hide password"
              />
            </button>
          </div>
        </div>
        <button type="submit" className="connection-button">
          Log in
        </button>
      </form>
      {failAuth && (
        <div className="auth-modal">
          <button
            className="bg-fail-auth-modal"
            type="button"
            onClick={() => setFailAuth(false)}
            label="close fail authentication modal"
          />
          <div className="fail-auth-modal">
            <button
              className="exit-modal-fail-button"
              type="button"
              onClick={() => setFailAuth(false)}
            >
              <i className="fi fi-rr-cross-small" />
            </button>
            <p>Username or password don't match.</p>
            <p>Please, retry.</p>
          </div>
        </div>
      )}
    </>
  );
}
