require("dotenv").config();

var keys = require("./keys.js");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var moment = require("moment");
var axios = require("axios");

var searchTerm = [];
for (var i = 3; i < process.argv.length; i++) {
    searchTerm.push(process.argv[i]);
}
searchTerm = searchTerm.join(" ");

var input = process.argv[2];
var value = process.argv[3];

switch(input) {
    case "concert-this":
        concert(value);
    break;
    case "spotify-this-song":
        song(value);
    break;
    case "movie-this":
        movie(value);
    break;
    case "do-what-it-says":
        doThis(value);
    break;
}

function concert() {
    var queryURL = "https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp";
    axios.get(queryURL).then(function(response){
        
        console.log(response)
    }).catch(err);
}



console.log(process.argv.length)

function movie() {
    if (process.argv.length === 3) {
        searchTerm = process.argv[2]
    } else if (process.argv.length > 3) {
        for (var i = 2; i < process.argv.length; i++) {
            searchTerm += process.argv[i]+"+";
            

        }

        var str = searchTerm.slice(0, -1);
        console.log(str);
    }
    var movieName = searchTerm;
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    axios.get(queryUrl).then(
        function(response) {
            console.log(response)
        }
    )
}

function song() {
    var queryURL = 
    axios.get(queryURL).then(function(response){
        
        console.log(response)
    }).catch(err);
}

function doThis() {
    var queryURL = 
    axios.get(queryURL).then(function(response){
        
        console.log(response)
    }).catch(err);
}


        
// * `concert-this`

//    * `spotify-this-song`

//    * `movie-this`

//    * `do-what-it-says`