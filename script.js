var userInput = $("<input>")

var queryURL = "https://api.twitter.com/1.1/trends/place.json"



$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    console.log(response);
});