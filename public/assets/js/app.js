$(function() {

    // Whenever user clicks the "Eat" burger on a burger
    $("#eat-burger").on("click", function(event) {
        var id = $(this).data("id");
        var newDevour = $(this).data("newdevour");

        var newDevourState = {
            devoured: newDevour
        };

        // The PUT request.
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newDevourState
        })
        .then(
            function() {
                console.log("Changed devoured to: " + newDevour);
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
            devoured: "false"
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

});


