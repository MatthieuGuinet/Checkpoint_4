import React from "react";
import { useNavigate } from "react-router-dom";
import "./SignIn.scss";
import SignInComponent from "../../components/SignInComponent/SignInComponent";
import logo from "../../assets/logo.png";

function SignIn() {
  const navigate = useNavigate();
  return (
    <div className="global-signIn-page">
      <button
        type="button"
        className="return-log"
        onClick={() => navigate("/")}
      >
        <i className="fi fi-rr-arrow-circle-left" />
      </button>
      <div className="signIn">
        <div className="signIn-container">
          <img className="logo-signIn" src={logo} alt="logo myLibrary" />
          <SignInComponent />
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

export default SignIn;
