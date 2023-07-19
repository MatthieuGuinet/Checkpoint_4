import React, { useContext } from "react";
import "./Header.scss";
import { useNavigate } from "react-router-dom";
import AuthenticationContext from "../../contexts/AuthenticationContext";
import logo from "../../assets/logo.png";

export default function Header() {
  const { userInfo, logoutHandler } = useContext(AuthenticationContext);

  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="logo-title">
        <img className="logo-home" src={logo} alt="myLibrary logo" />
        <h1 className="title-home">myLibrary</h1>
      </div>
      <div className="username-logout">
        <h1 className="title-home">{userInfo.username}</h1>
        <button
          className="deconnection-button"
          type="button"
          onClick={() => {
            logoutHandler();
            navigate("/");
          }}
        >
          <i className="fi fi-rr-power" alt="log out" />
        </button>
      </div>
    </div>
  );
}
