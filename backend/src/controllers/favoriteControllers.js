/* eslint-disable camelcase */
const models = require("../models");

const getFavoritesByUser = (req, res) => {
  const { userId } = req.params;
  models.favorite
    .findAllFavoriteOfUser(userId)
    .then(([result]) => {
      if (result.length) {
        res.status(200).json(result);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const AddFavorite = (req, res) => {
  const { title, author } = req.body;
  const { userId } = req.params;
  models.favorite
    .insert(title, author, userId)
    .then(([result]) => {
      if (result.affectedRows) {
        res.status(201).json({
          id: result.insertId,
          title,
          author,
          userId,
        });
      } else {
        res.sendStatus(400);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const isReadFavorite = (req, res) => {
  const { bookId } = req.params;
  const keys = Object.keys(req.body);
  const values = Object.values(req.body);
  const valueQuery = keys.map((key) => `${key} = ?`).join(", ");
  models.favorite
    .update(values, valueQuery, bookId)
    .then(([result]) => {
      if (result.affectedRows !== 0) {
        res.sendStatus(204);
      } else {
        res.status(404).send("Book not found...");
      }
    })
    .catch(() => {
      res.status(500).send("Error while updating book");
    });
};

const deleteFavorite = (req, res) => {
  const { bookId } = req.params;
  models.favorite
    .delete(bookId)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  AddFavorite,
  isReadFavorite,
  deleteFavorite,
  getFavoritesByUser,
};
