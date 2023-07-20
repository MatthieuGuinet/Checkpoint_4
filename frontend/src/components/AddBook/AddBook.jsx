/* eslint-disable camelcase */
import React, { useState, useContext } from "react";
import axios from "axios";
import "./AddBook.scss";
import AuthenticationContext from "../../contexts/AuthenticationContext";

export default function AddBook() {
  const { userToken, userInfo, userBooks, setUserBooks } = useContext(
    AuthenticationContext
  );
  const { id } = userInfo;

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchBook = (event) => {
    setIsLoading(true);
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const dataFromForm = Object.fromEntries(formData.entries());
    const query = `&title=${dataFromForm.title}&author=${dataFromForm.author}`;
    axios
      .get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/books?sort=new&language=eng${query}`
      )
      .then((response) => {
        setResult(response.data.docs);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
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
    <div className="section-add-book">
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
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}
