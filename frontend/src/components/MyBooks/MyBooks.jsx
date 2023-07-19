import React, { useState, useContext, useEffect } from "react";
import "./MyBooks.scss";
import axios from "axios";
import AuthenticationContext from "../../contexts/AuthenticationContext";

export default function Header() {
  const { userToken, userInfo } = useContext(AuthenticationContext);
  const [userBooks, setUserBooks] = useState([]);
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

  return userBooks ? (
    <div className="my-books">
      <h2 className="title-personal-library">My personal library</h2>
      <div className="all-my-books">
        {userBooks.map((book) => (
          <>
            <div key={book.id} className="book">
              <p className="book-title">{book.book_title}</p>
              <p className="book-author">{book.book_author}</p>
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
            </div>
            <hr />
          </>
        ))}
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
}
