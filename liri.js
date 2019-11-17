require("dotenv").config();

var keys = require("./keys.js");
var fs = require("fs");
var Spotify = require("node-spotify-api");
let spotify = new Spotify(keys.spotify);
var moment = require("moment");
var axios = require("axios");
let command = process.argv[2];
let searchTerm = process.argv[3];


fs.appendFile('log.txt', command + ",", function (err) {
    if (err) throw err;
});






switch(command) {
    case "concert-this":
        concert(searchTerm);
    break;
    case "spotify-this-song":
        song(searchTerm);
    break;
    case "movie-this":
        movie(searchTerm);
    break;
    case "do-what-it-says":
        doThis();
    break;
}

function concert(artist) {
   

    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    
    axios.get(queryURL)
    .then(function(response) {
        if(response.data[0].venue !=  undefined) {
            console.log("Event Veunue: " + response.data[0].venue.name);
            console.log("Event Location: " + response.data[0].venue.city);
            var eventDateTime = moment(response.data[0].datetime);
            console.log("Event Date & Time: " + eventDateTime.format("dddd, MMMM Do YYYY"));
        }
        else {
            console.log("No results found.");
        }
        
        
    }).catch(function(error){
        console.log(error);
        console.log("No results found...damn you are good!")
    });
  
}
//==================================================================
//---------------Spotify Function-----------------------------------
//==================================================================
 function song(song) {
    spotify.search({type: 'track', query: song})
    .then(function(response){
        if (response.tracks.total === 0) {
            noTrackFound();
        } else {
            console.log("Artist: " + response.tracks.items[0].artists[0].name);
            console.log("Track: " + response.tracks.items[0].name);
            console.log("Preview URL: " + response.tracks.items[0].preview_url);
            console.log("Album: " + response.tracks.items[0].album.name);
        }        
        
    }).catch(function(error){
        console.log(error);
        console.log("No Tracks Found... will default to 'The Sign' by Ace of Base.")
    });
}
//------------------------no track found/default response function---------------
function noTrackFound() {
    spotify.search({type: 'track', query: 'The Sign'})
    .then(function(response){
        for (var i=0;i < response.tracks.items.length; i++) {
            if (response.tracks.items[i].artists[0].name === "Ace of Base") {
                console.log("Artist: " + response.tracks.items[i].artists[0].name);
                console.log("Track: " + response.tracks.items[i].name);
                console.log("Preview URL: " + response.tracks.items[i].preview_url);
                console.log("Album: " + response.tracks.items[i].album.name);
                i = response.tracks.items.length;
            } 
        }   
        
    }).catch(function(error){
        console.log(error);
        console.log("No results found...damn you are good!")
    });
}
//===========================================================================
//---------------------------OMDB Function-----------------------------------
//===========================================================================
function movie(movie) {
    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    axios.get(queryUrl)
    .then(function(response) {
        if (response.data.Title != undefined) {
            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("imdbRating:: " + response.data.imdbRating);
            console.log("RottenTomatoes: " + response.data.tomatoRating);
            console.log("Country:: " + response.data.Country);
            console.log("Language:: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);            
        } else {
            movie("mr. Nobody");
        }
    }).catch(function (error) {
        console.log(error);
        console.log("No results found...damn you are good!")
    });  
}

//===============================================================
//-----------------RAndo Shizz-----------------------------------
//===============================================================

function doThis() {
    fs.readFile("random.txt", "utf-8", function(error, data) {
        var dataArr = data.split(",");
        song(dataArr[1]);        
        if (error) {
          return console.log(error);
        }
    });
}


        
