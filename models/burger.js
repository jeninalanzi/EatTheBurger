// This file controls the data for burger

// ORM Dependency
const orm = require("../config/orm.js");

// Creating the object "burger"

var burger = {
    selectAll: function(cb) {
        orm.selectAll("burgers", function(res) {
            cb(res);
        });
    },

    // Cols and vals are arrays
    insertOne: function(cols, vals, cb) {
        orm.insertOne("burgers", cols, vals, function(res) {
            cb(res);
        });
    },

    updateOne: function(objColVals, condition, cb) {
        orm.updateOne("burgers", objColVals, condition, function(res) {
            cb(res);
        });
    }
};

// Export these database functions for the controller.
module.exports = burger;