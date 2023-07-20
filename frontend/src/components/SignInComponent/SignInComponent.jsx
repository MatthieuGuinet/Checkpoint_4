import React, { useState } from "react";
import axios from "axios";
import "./SignInComponent.scss";
import { useNavigate } from "react-router-dom";

export default function SignInComponent() {
  // useState definition
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [pwControl, setPwControl] = useState(false);
  const [wrongUsername, setWrongUsername] = useState(false);

  const navigate = useNavigate();

  const regexPw =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  const checkPasswordCharacter = (passwordToCheck, callback) => {
    if (regexPw.test(passwordToCheck)) {
      if (callback) {
        callback(true);
      }
    } else {
      callback(false);
    }
  };

  const addUser = (dataFromForm) => {
    setWrongUsername(false);
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/users/add`, dataFromForm)
      .then((response) => {
        if (response.data) {
          navigate("/");
        } else {
          console.info(response);
        }
      })
      .catch((error) => {
        if (error.response.status === 409) {
          setWrongUsername(true);
        } else {
          setWrongUsername(false);
          console.error(error.message);
        }
      });
  };

  const handleSubmit = (event) => {
    setPwControl(false);
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const dataFromForm = Object.fromEntries(formData.entries());
    checkPasswordCharacter(dataFromForm.password, (isValid) => {
      if (isValid) {
        addUser(dataFromForm);
      } else {
        setPwControl(true);
      }
    });
  };

  // handler for change in password input
  const handlePasswordChange = (event) => setPassword(event.target.value);

  // toggle to change type input for password to show it if user click on the SHOW button
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
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
      {wrongUsername && (
        <p className="wrong-username">This username is already taken</p>
      )}
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
        {pwControl && (
          <p className="wrong-password-char">
            Your password must containt at least 8 characters with at least 1
            uppercase letter, 1 number and 1 special character
          </p>
        )}
      </div>
      <button type="submit" className="connection-button signIn-button">
        Sign in
      </button>
    </form>
  );
}
