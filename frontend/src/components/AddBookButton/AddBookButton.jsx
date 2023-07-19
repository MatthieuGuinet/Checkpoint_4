import React, { useState } from "react";
import "./AddBookButton.scss";
import ModalAddBook from "../ModalAddBook/ModalAddBook";

export default function AddBookButton() {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="section-add-button">
      <button className="add-button" type="button" onClick={handleClick}>
        <i className="fi fi-rr-books-medical" />
      </button>
      {showModal && <ModalAddBook closeModal={closeModal} />}
    </div>
  );
}
