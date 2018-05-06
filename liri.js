require("dotenv").config();
var request = require("request");

var keys = require("./keys.js");

var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require('fs');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var userInput = process.argv[2];
var secondInput = process.argv[3];

function command(){
    if (userInput === "my-tweets"){
        getTweets();
    }
    else if (userInput === "spotify-this-song"){
        getSpotify();
    }
    else if (userInput === "movie-this"){
        getOMDB();
    }
    else if (userInput === "do-what-it-says"){
        getRandom();
    }
    else {
        console.log("-------------------------");
        console.log("please use one of the following parameters" + "\nmy-tweets" + "\nspotify-this-song" + "\nmovie-this movie name here" + "\ndo-what-it-says")
        console.log("-------------------------");
    };
};

function getTweets(){
	var parameters = {
		count: 20
	};

	client.get('statuses/user_timeline', parameters, function(error, tweets, response){
		if (!error) {
	        for (i=0; i<tweets.length; i++) {
	            var response = ('Number: ' + (i+1) + '\n' + tweets[i].created_at + '\n' + tweets[i].text + '\n');
	            console.log(response);
	            console.log("-------------------------");
	        };
	    };
	});
};

function getSpotify(){

    var findSong;

    if (secondInput === undefined){
        findSong = "'The Sign'";
    }
    else {
        findSong = secondInput;
    };

    spotify.search({ type: 'track', query: findSong }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        else {
            console.log("-------------------------");
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
	        console.log("Song: " + data.tracks.items[0].name);
	        console.log("Preview Here: " + data.tracks.items[0].preview_url);
	        console.log("Album: " + data.tracks.items[0].album.name);
            console.log("-------------------------");
        };
      });
};

function getOMDB(){
    
    var findMovie;

    if (secondInput === undefined){
        findMovie = "'Mr. Nobody'";
    }
    else {
        findMovie = secondInput;
    };
    console.log(findMovie);

    var url = "http://www.omdbapi.com/?t=" + findMovie + "&y=&plot=long&tomatoes=true&r=json&apikey=3e330d75";
    console.log(url);
    request(url, function(error, response, body){
        if(!error && response.statusCode === 200){
            console.log("-------------------------");
            console.log("Title: " + JSON.parse(body).Title);
	        console.log("Year: " + JSON.parse(body).Year);
	        console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
	        console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
	        console.log("Country: " + JSON.parse(body).Country);
	        console.log("Language: " + JSON.parse(body).Language);
	        console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("-------------------------");
        };

    });
};

function getRandom(){
    fs.readFile("random.txt", "utf8", function(error, data){
        if (error) {
            return console.log(error);
          }
          else {
            var dataArr = data.split(",");
          
            getSpotify();


            function getSpotify(){

                var findSong = dataArr[1];
            
                spotify.search({ type: 'track', query: findSong }, function(err, data) {
                    if (err) {
                      return console.log('Error occurred: ' + err);
                    }
                    else {
                        console.log("-------------------------");
                        console.log("Artist: " + data.tracks.items[0].artists[0].name);
                        console.log("Song: " + data.tracks.items[0].name);
                        console.log("Preview Here: " + data.tracks.items[0].preview_url);
                        console.log("Album: " + data.tracks.items[0].album.name);
                        console.log("-------------------------");

                        var writeResponse = 

                        fs.writeFile("log.txt", writeResponse, function(err) {

                            // If the code experiences any errors it will log the error to the console.
                            if (err) {
                              return console.log(err);
                            }
                          
                            // Otherwise, it will print: "movies.txt was updated!"
                            console.log("log.txt was updated!");
                          
                          });
                    };
                  });
            };

          }
    });
    
};


command();