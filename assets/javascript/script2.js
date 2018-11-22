// Gyphy.com information
var gyphyKey = "jLBBRvjN84XiHjuwDpBhjpLlv03JFrBJ";
var gyphyUrl = "https://api.giphy.com/v1/gifs/";
var topics = ["Baby Seal", "Baby Fox", "Baby Elephant", "Baby Giraffe", "Baby Goat", "Puppy", "Baby Llama", "Cub"];

$(document).on('click', "button.btn", function(){
    // github.com Ensure buttons do not remain focused after pressed.
    $(this).blur();
});

$(document).on('click', "button.btn-baby", function(){
    // create baby animal buttons buttons.
    generateGyphs($(this).text());
});

$("#submitBtn").click(function(){

//user input
    var userInput = $("#userInput").val();

    // Check if user typed something into the text box.
    if (userInput === ""){
        $(".d-none").removeClass("d-none");
        $("#userInput").addClass("is-invalid");
    } else{
        $(".invalid-feedback").addClass("d-none");
        $(".is-invalid").removeClass("is-invalid");

        // Create baby animal button.
        $("#babyButton").append(createBabiesButton(userInput));

        // Reset text box.
        $("#userInput").val("");
    } 
});

$(document).on('click', 'img.gif', function(){
    // get gif element
    var gif = $(this);
    if (gif.attr("data-state") === "still"){
        // animate gif
        gif.attr({
            "src": gif.attr("data-animate"),
            "data-state": "animate"
        });
    } else {
        // still gif
        gif.attr({
            "src": gif.attr("data-still"),
            "data-state": "still"
        });
    }
});

function createBabiesButton(babyAName){
    var btn = $("<button>").addClass("btn btn-info btn-baby");
    btn.attr("type", "button");
    btn.text(babyAName);
    return btn;
}

function generateGyphs(babyAnimName) {
    var limit = 10;
    var queryURL = gyphyUrl + "search?q=" + babyAnimName + "&api_key=" + gyphyKey + "&limit=" + limit;
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function (response) {            
            var results = response.data;            

            $("#gyphs").html("");
            
            for (var i = 0; i < results.length; i++) {
                // Create div.
                var babyAnimDiv = $("<div>").addClass("text-center");

                //github.com - image div to be able to start/stop the GIF.
                var img = $("<img>").addClass("fluid gif");
                img.attr({
                    "data-still": results[i].images.fixed_height_still.url,
                    "data-animate": results[i].images.fixed_height.url,
                    "data-state": "still",
                    "src": results[i].images.fixed_height_still.url 
                });

                // rating div
                var rating = $("<p>").text("Rating: " + results[i].rating.toUpperCase());

                // appending gif and rating
                babyAnimDiv.append(img);
                babyAnimDiv.append(rating);

                // Prepend the babyAnim divs to the main div.
                $("#gyphs").prepend(babyAnimDiv);
            }
        });
}

function initializeApp(){
    topics.forEach(function(BabyA){
        $("#babyButton").append(createBabiesButton(BabyA));
    })
}
initializeApp();
