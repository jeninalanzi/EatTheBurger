// MOVE TO APPROPRIATE FOLDER ASAP!!!!!!!!!!!!

var mysql = require("mysql");

var connection;

// Use JawsDB credentials, else use localhost mySQL db.
if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
}
else {
    connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "aphelion9",
        database: "burgers_db"
    });
};

// Make the connection if no errors.
connection.connect(function(err) {
    if (err) {
        console.error("Error connecting: " + err.stack);
        return;
    }
    console.log("Connected as id " + connection.threadId);
});

// Export the connection for ORM to use.
module.exports = connection;