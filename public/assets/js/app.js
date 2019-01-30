$(function() {

    // Whenever user clicks the "Eat" burger on a burger
    $(".change-devoured").on("click", function(event) {
        var id = $(this).data("id");
        var newDevour = $(this).data("newdevour");

        // Object format for changed devoured status to true
        var newDevourState = {
            devoured: 1
        };

        // Send PUT request.
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newDevourState
        }).then(
            function() {
                console.log("changed devoured state to", newDevour);
                // Reload page for updated list
                location.reload();
            }
        );
    });

    // Whenever the user submits a new burger
    $(".create-form").on("submit", function(event) {
        // Prevent from refreshing automatically
        event.preventDefault();

        // Object format for new data.
        var newBurger = {
            burger_name: $("#new-burger").val().trim(),
            devoured: 0
        };

        // Send the POST request
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        })
        .then(
            function() {
                console.log("Created new burger");
                // Reload page for updated list
                location.reload();
            }
        );

    });

    // Whenever the user clicks "delete" button on a burger.
    $(".delete-burger").on("click", function(event) {
        var id = $(this).data("id");

        // Send the DELETE request
        $.ajax("/api/burgers/" + id, {
            type: "DELETE"
        })
        .then(
            function() {
                console.log("deleted burger", id);
                //Reload page for updated list
                location.reload();
            }
        );
    });

});


