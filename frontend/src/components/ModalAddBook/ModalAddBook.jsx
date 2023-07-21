import React from "react";
import "./ModalAddBook.scss";
import PropTypes from "prop-types";
import AddBook from "../AddBook/AddBook";

function ModalAddBook({ closeModal }) {
  return (
    <div className="modal-add-book">
      <AddBook desktop={false} />
      <div className="close-modal">
        <button
          type="button"
          className="close-button"
          onClick={() => closeModal()}
        >
          <i className="fi fi-rr-cross" />
        </button>
      </div>
    </div>
  );
}

ModalAddBook.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default ModalAddBook;
