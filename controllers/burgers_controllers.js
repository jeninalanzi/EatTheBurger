// Dependency for burger.js data
const express = require("express");

// Router
const router = express.Router();

// Import burger.js to use its db functions
var burger = require("../models/burger.js");

// Creating all routes and matching logic below.
router.get("/", function(req, res) {
    burger.selectAll(function(data) {
        var handlebarsObject = {
            burgers: data
        };
        console.log(handlebarsObject);
        res.render("index", handlebarsObject);
    });
});

// GET request if you want to see your data displayed
router.get("/api/burgers", function(req, res) {
    burger.selectAll(function(data) {
        // if (err) {
        //     throw err
        // }
        res.json(data);
    });
});

// POST request for adding new burger data
router.post("/api/burgers", function(req, res) {
    burger.insertOne(["burger_name", "devoured"], [req.body.burger_name, req.body.devoured], function(result) {
        res.json({ id: result.insertId });
    });
});

// PUT updates an existing data by its id
router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.updateOne(
        {
            devoured: req.body.devoured
        },
        condition,
        function(result) {
            if (result.changedRows === 0) {
                // If no rows are changed, then the id must not exist, so return 404.
                return res.status(404).end();
            }
            res.status(200).end();
        }
    );
});

// DELETE so that we can remove devoured burgers from the display.
router.delete("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    burger.delete(condition, function(result) {
        if (result.affectedRows == 0) {
            // If no rows are changed, then the id must not exist, so return 404.
            return res.status(404).end();
        }
        res.status(200).end();
    });
});

// Export routes for server.js to use
module.exports = router;