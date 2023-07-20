/* eslint-disable camelcase */
import React, { useState, useContext } from "react";
import axios from "axios";
import "./AddBook.scss";
import PropTypes from "prop-types";
import AuthenticationContext from "../../contexts/AuthenticationContext";

function AddBook({ desktop }) {
  const { userToken, userInfo, userBooks, setUserBooks } = useContext(
    AuthenticationContext
  );
  const { id } = userInfo;

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noResult, setNoResult] = useState(false);
  const [searchWarning, setSearchWarning] = useState(false);

  const handleSearchBook = (event) => {
    setSearchWarning(false);
    setIsLoading(true);
    setNoResult(false);
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const dataFromForm = Object.fromEntries(formData.entries());
    const query = `&title=${dataFromForm.title}&author=${dataFromForm.author}`;
    if (dataFromForm.title && dataFromForm.author) {
      setSearchWarning(false);
      axios
        .get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/books?sort=new&language=eng${query}`
        )
        .then((response) => {
          if (response.data.docs.length) {
            setResult(response.data.docs);
            setIsLoading(false);
            setNoResult(false);
          } else {
            setNoResult(true);
            setIsLoading(false);
            setResult([]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setSearchWarning(true);
    }
  };

  const handleAddBook = (book) => {
    const bodyToSend = {
      title: book.title,
      author: book.author_name[0],
    };
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/users/${id}/books`,
        bodyToSend,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((response) => {
        setUserBooks([
          ...userBooks,
          {
            id: response.data.id,
            book_title: response.data.title,
            book_author: response.data.author,
            user_id: response.data.userId,
            is_read: 0,
          },
        ]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={`section-add-book ${{ desktop } && "desktop"}`}>
      <h2>Add a book</h2>
      <form onSubmit={handleSearchBook} className="form-search-book">
        <div className="search-inputs">
          <div className="title-input-label">
            <label className="title-label" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              value={title}
              name="title"
              className="title-input"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="author-input-label">
            <label htmlFor="author" className="author-label">
              Author
            </label>
            <input
              type="text"
              value={author}
              name="author"
              className="author-input"
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          {searchWarning && (
            <p className="warning-input">Both inputs must be completed</p>
          )}
        </div>
        <button type="submit" className="button-modification-validation">
          <p>Search</p>
        </button>
      </form>
      <div className="searched-book-container">
        <div className="searched-books">
          {!isLoading ? (
            result.map((book) => (
              <div className="separation-book">
                <div className="book-searched" key={book.key}>
                  <p className="book-title">{book.title}</p>
                  <button
                    type="button"
                    className="add-button-book"
                    onClick={() => handleAddBook(book)}
                  >
                    <i className="fi fi-rr-add" />
                  </button>
                </div>
                <hr />
              </div>
            ))
          ) : (
            <p
              className={
                !searchWarning ? "loading-text" : "loading-text-hidden"
              }
            >
              Loading...
            </p>
          )}
        </div>
        {noResult && <p className="no-result">No result, try something else</p>}
      </div>
    </div>
  );
}

AddBook.propTypes = {
  desktop: PropTypes.bool.isRequired,
};

export default AddBook;
