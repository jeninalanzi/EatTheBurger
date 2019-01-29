// Express dependencies
const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql");

const PORT = process.env.PORT || 3000;

const app = express();

// Display static content from public directory
app.use(express.static("public"));

// Parse everything inputted in HTML forms as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Handlebars requirements

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes for the server to acces them
const routes = require("./controllers/burgers_controllers.js");

app.use(routes);

app.listen(PORT, function() {
    console.log("App now listening at localhost: " + PORT);
});