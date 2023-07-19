require("dotenv").config();
const axios = require("axios");

const { API_URL } = process.env;

const browseBySearchQuery = (req, res) => {
  axios
    .get(
      `${API_URL}?sort=new&language=eng&title=${req.query.title}&author=${req.query.author}`
    )
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

module.exports = {
  browseBySearchQuery,
};
