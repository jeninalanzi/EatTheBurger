// Require connection.js
const connection = require("./connection.js");

// ===================================================================
// Some helper functions for the SQL syntax
// (Referenced from Activity 16 of ORM-Example):

// This one will print question marks where values need to go.
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
};

// This one will help convert object key/value pairs to SQL
function objToSql(ob) {
    var arr = [];

    // Loop through keys and push key/value as a string
    for (var key in ob) {
        var value = ob[key];
        // Check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // If string has spaces, add quotations to make one string
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }

    // Translate the array of strings into a single, comma-separated string
    return arr.toString();

};

// ===================================================================
// ORM (Object Relational Mapper)

// This is where functions are outlined for each MYSQL command we want the application to perform.
// The ?? signs swap out for table or column names.
// The ? signs swap out other values.

var orm = {

    // [GET] Function that selects all values and returns results.
    selectAll: function (tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },

    // [POST] Function that inserts ONE new value into the table.
    insertOne: function (table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;

        // Builds on queryString to add user's value into the query
        // In this case only 1 question mark needs printing out
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        // Check to ensure the queryString built successfully.
        console.log("Line 74 INSERTONE query: " + queryString);

        // Begin mySQL post query
        connection.query(queryString, vals, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },

    // [UPDATE] Function that updates a pre-existing value.
    updateOne: function (table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        // Test to see what the mySQL statement looks like:
        console.log("Line 97 orm.js UPDATE query: " + queryString);

        // Begin mySQL update query
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },

    // [DELETE] Function that deletes a value from the table.
    delete: function (table, condition, cb) {
        var queryString = "DELETE FROM " + table;
        queryString += " WHERE " + condition;

        // Test to see mySQL delete query is built successfully:
        console.log("Line 114 orm.js DELETE query is: " + queryString);

        // Begin mySQL delete query
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },

};

// Exports the ORM object for the model
module.exports = orm;