mysql = require("mysql");

const connection = mysql.createConnection({
  host: "192.168.48.21",
  port: "3306",
  user: "tkainz",
  password: "tkainz",
  database: "db_tkainz",
});

connection.connect((error) => {
  if (error) throw error;
});

module.exports = connection;
