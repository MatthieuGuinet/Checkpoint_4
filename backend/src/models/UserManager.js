const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert(username, password) {
    return this.database.query(
      `insert into ${this.table} (username, hashed_password) values (?, ?)`,
      [username, password]
    );
  }

  getUserByUsername(username) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE username = ?`,
      [username]
    );
  }

  update(values, valueQuery, id) {
    return this.database.query(
      `update ${this.table} set ${valueQuery} where id = ?`,
      [...values, id]
    );
  }
}

module.exports = UserManager;
