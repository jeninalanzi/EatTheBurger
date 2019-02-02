# EatTheBurger
An app based on the MVC model, that allows users to store names of burgers they want to eat and toggle between storing them and "eating" them by the mere click of a button.

## Technologies Utilized
As mentioned above, the Model-View-Controller architectural pattern is the basis of the structure of this applciation.

Model entails the initiation of the database needed to store data within our app, as well as the skeletal structure of tables and data that will need to be used. In this case, the mySQL files for the schema and seeds (database scheme and data values, respectively) are saved under the 'models' directory.

View consists of all the files that the users will be interacting with, particularly the handlebars objects that need to be used to populate the same structure of data for multiple selections of an API. Connected to that is a 'public' directory that contains all the CSS and images, as well as the JavaScript file that controls the actual functionality of the user interface. In this case I also used "Express-Handlebars" to make the HTML attachments and repeating elements easier to view when editing the code on the server-side.

Controller consists of all JavaScript files that take in the input received from the user's interaction with the "view" portion of the app, and routes them according to the CRUD model - create, read, update, and delete. GET, POST, PUT, and DELETE requests are also initiated and structured in these file as well.

## How EatTheBurger Works
It's a very simple user interface! You can type in the name of a "burger" and once you hit submit, it adds the burger to a queue. In that queue, you have an option to either "delete" that burger off the list, or "EAT" - and when you "EAT," the burger gets moved to a different queue, of burgers already devoured! You can also delete burgers off this list, in case your list gets too long.