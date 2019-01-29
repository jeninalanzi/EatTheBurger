// Require connection.js
const connection = require("../config/connection.js");

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
    var value = ob[key];

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
        queryString += "VALUES (?) ";

        // Check to ensure the queryString built successfully.
        console.log("Line 72 one-insert query: " + queryString);

        // Begin mySQL post query
        connection.query(queryString, vals, function(err, result) {
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

        console.log("Line 94 update query: " + queryString);

        // Begin mySQL update query
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });

    },

};

// Exports the ORM object for the model
module.exports = orm;