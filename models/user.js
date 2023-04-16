const db = require('../database');

class User {
  static findByUsername(username, callback) {
    db.query('SELECT * FROM users WHERE username = ?', [username], function(err, rows) {
      if (err) {
        return callback(err);
      }

      if (!rows.length) {
        return callback(null, null);
      }

      const user = {
        id: rows[0].id,
        username: rows[0].username,
        password: rows[0].password
      };

      return callback(null, user);
    });
  }

  static findById(id, callback) {
    db.query('SELECT * FROM users WHERE id = ?', [id], function(err, rows) {
      if (err) {
        return callback(err);
      }

      if (!rows.length) {
        return callback(null, null);
      }

      const user = {
        id: rows[0].id,
        username: rows[0].username,
        password: rows[0].password
      };

      return callback(null, user);
    });
  }
}

module.exports = User;
