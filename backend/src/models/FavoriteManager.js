const AbstractManager = require("./AbstractManager");

class FavoriteManager extends AbstractManager {
  constructor() {
    super({ table: "favorite" });
  }

  findAllFavoriteOfUser(userId) {
    return this.database.query(
      `select * from ${this.table} where user_id = ?`,
      [userId]
    );
  }

  insert(title, author, userId) {
    return this.database.query(
      `insert into ${this.table} (book_title, book_author, user_id) values (?, ?, ?)`,
      [title, author, userId]
    );
  }

  update(values, valueQuery, id) {
    return this.database.query(
      `update ${this.table} set ${valueQuery} where id = ?`,
      [...values, id]
    );
  }
}

module.exports = FavoriteManager;
