$(document).ready(function () {
    console.log("ready!");


    var topics = ["dog", "cat", "bird", "fish"];//global array to start with


    function displayGIF() {
        $("#display").empty();//when function is run the previous gif are cleared out
        var search = $(this).attr("data-name"); //when a button is clicked the data name attribute is stored in this variable
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10"; //url that can be changed dynamically based on input

        $.ajax({ //ajax call that gets the data from giphy API
            url: queryURL,
            method: "GET"
        }).then(function (response) { //when done loading this function is run
            console.log(response);
            var results = response.data; //stores all respons data in results variable

            for (var i = 0; i < results.length; i++) { //loop through the results 

                // Creating and storing a div tag
                var animalDiv = $("#display");

                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + results[i].rating);

                // Creating and storing an image tag
                var animalImage = $("<img>");
                // Setting the src attribute of the image to a property pulled off the result item
                animalImage.attr("src", results[i].images.fixed_height_still.url);

                // Appending the paragraph and image tag to the animalDiv
                animalDiv.append(p);
                animalDiv.append(animalImage);

                // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                $("#display").append(animalDiv);
            }
        });
    }
    

    function renderButtons() {

        $("#buttons").empty();

        for (var i = 0; i < topics.length; i++) {

            var a = $("<button>");

            a.addClass("gif");

            a.attr("data-name", topics[i]);

            a.text(topics[i]);

            $("#buttons").append(a);
        }
    }
    $("#submit").on("click", function (event) {

        event.preventDefault();
        var topic = $("#searchInput").val();
        topics.push(topic);

        renderButtons();
    });

    $(document).on("click", ".gif", displayGIF);
    
    renderButtons();


});