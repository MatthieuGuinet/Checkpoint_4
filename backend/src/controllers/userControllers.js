/* eslint-disable camelcase */
const models = require("../models");

const Adduser = (req, res) => {
  const { username, hashedPassword } = req.body;
  models.user
    .insert(username, hashedPassword)
    .then(([result]) => {
      if (result.affectedRows) {
        res.status(201).json({
          id: result.insertId,
          username,
          hashedPassword,
        });
      } else {
        res.sendStatus(400);
      }
    })
    .catch((err) => {
      if (err.errno === 1062) {
        res.sendStatus(409);
      } else {
        console.error(err);
        res.sendStatus(500);
      }
    });
};

const authenticationCheck = (req, res, next) => {
  const { username } = req.body;

  models.user
    .getUserByUsername(username)
    .then(([userSelected]) => {
      if (userSelected[0] != null) {
        [req.user] = userSelected;
        next();
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const modifyUser = (req, res) => {
  const { id } = req.params;
  const keys = Object.keys(req.body);
  const values = Object.values(req.body);
  const valueQuery = keys.map((key) => `${key} = ?`).join(", ");
  models.user
    .update(values, valueQuery, id)
    .then(([result]) => {
      if (result.affectedRows !== 0) {
        res.sendStatus(204);
      } else {
        res.status(404).send("User not found...");
      }
    })
    .catch(() => {
      res.status(500).send("Error while updating user");
    });
};

module.exports = {
  Adduser,
  authenticationCheck,
  modifyUser,
};
