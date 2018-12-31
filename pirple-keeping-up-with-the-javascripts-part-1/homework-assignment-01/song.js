/*
Keeping Up With the Javascripts: ES6
Homework #1
*/

var song = 'Songbird';
var artist = 'Kenny G';
var album = 'The Essential Kenny G';
var composer = 'Kenny G';
var genre = 'Jazz';
var year = 1986; // number
var duration = 503; // just make it simple, 5:03, 5 minutes 3 seconds

var purchased = true; // boolean
var playedHistory = [ // array
    Date.now()
];
var extraInfo = { // object, anything
    rating : [
        {
            user: 'me',
            rating: 5
        }
    ]
}

console.log(song);
console.log(artist);
console.log(album);
console.log(composer);
console.log(genre);
console.log(year);
console.log(duration);

console.log(purchased);
console.log(playedHistory);
console.log(extraInfo);
