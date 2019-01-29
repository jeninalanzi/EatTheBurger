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

router.post("/api/burgers", function(req, res) {
    burger.insertOne(["burger_name", "devoured"], [req.body.burger_name, req.body.devoured], function(result) {
        res.json({ id: result.insertId });
    });
});

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

// Export routes for server.js to use
module.exports = router;