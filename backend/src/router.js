const express = require("express");

const router = express.Router();

const users = require("./controllers/userControllers");
const books = require("./controllers/bookControllers");
const favorites = require("./controllers/favoriteControllers");

const {
  hashPassword,
  verifyPassword,
  verifyToken,
  checkUserId,
} = require("./services/auth");

router.post("/users/login", users.authenticationCheck, verifyPassword);

router.post("/users/add", hashPassword, users.Adduser);

router.get("/books", books.browseBySearchQuery);

router.get(
  "/users/:userId/books",
  verifyToken,
  checkUserId,
  favorites.getFavoritesByUser
);
router.post(
  "/users/:userId/books",
  verifyToken,
  checkUserId,
  favorites.AddFavorite
);
router.put(
  "/users/:userId/books/:bookId",
  verifyToken,
  checkUserId,
  favorites.isReadFavorite
);
router.delete(
  "/users/:userId/books/:bookId",
  verifyToken,
  checkUserId,
  favorites.deleteFavorite
);

module.exports = router;
