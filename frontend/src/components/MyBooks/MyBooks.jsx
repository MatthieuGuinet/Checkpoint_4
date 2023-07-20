import React, { useContext, useEffect } from "react";
import "./MyBooks.scss";
import axios from "axios";
import AuthenticationContext from "../../contexts/AuthenticationContext";

export default function Header() {
  const { userToken, userInfo, userBooks, setUserBooks } = useContext(
    AuthenticationContext
  );
  const { id } = userInfo;
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users/${id}/books`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        setUserBooks(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleCheckboxChange = (bookId, event) => {
    const isChecked = event.target.checked;
    setUserBooks((prevUserBooks) =>
      prevUserBooks.map((book) =>
        book.id === bookId ? { ...book, is_read: !book.is_read } : book
      )
    );

    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/users/${id}/books/${bookId}`,
        {
          is_read: isChecked,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteBook = (bookId) => {
    axios
      .delete(
        `${import.meta.env.VITE_BACKEND_URL}/users/${id}/books/${bookId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then(() => {
        const updatedUserBooks = userBooks.filter((book) => book.id !== bookId);
        setUserBooks(updatedUserBooks);
      })
      .catch((error) => {
        console.error(error);
        setUserBooks(userBooks);
      });
  };

  return userBooks ? (
    <div className="my-books">
      <h2 className="title-personal-library">My personal library</h2>
      {userBooks.length ? (
        <div className="all-my-books">
          {userBooks.map((book) => (
            <>
              <div key={book.id} className="book">
                <p className="book-title">{book.book_title}</p>
                <p className="book-author">{book.book_author}</p>
                <div className="read-delete">
                  <div className="is-read">
                    <p>Read :</p>
                    <input
                      className="book-is-read"
                      type="checkbox"
                      value={book.is_read}
                      checked={book.is_read}
                      onChange={(event) => handleCheckboxChange(book.id, event)}
                    />
                  </div>
                  <div className="delete-book">
                    <button
                      type="button"
                      className="delete-book-button"
                      onClick={() => handleDeleteBook(book.id)}
                    >
                      <i className="fi fi-rr-trash" />
                    </button>
                  </div>
                </div>
              </div>
              <hr />
            </>
          ))}
        </div>
      ) : (
        <p>No book added yet</p>
      )}
    </div>
  ) : (
    <p>Loading...</p>
  );
}
