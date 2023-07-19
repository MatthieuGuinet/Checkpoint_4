import React from "react";
import "./AuthenticationPage.scss";
import Authentication from "../../components/Authentication/Authentication";
import logo from "../../assets/logo.png";

function AuthenticationPage() {
  return (
    <div className="global-authentication-page">
      <div className="authentication">
        <div className="authentication-container">
          <img className="logo-auth" src={logo} alt="logo myLibrary" />
          <Authentication />
        </div>
      </div>
      <div className="myLibrary-description">
        <h1 className="title-myLibrary">myLibrary</h1>
        <p className="description-myLibrary">
          myLibrary allows you to keep track of all the books you have read or
          books you want to read.
        </p>
      </div>
    </div>
  );
}

export default AuthenticationPage;
