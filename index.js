// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// The single, comprehensive timestamp API endpoint.
// It handles:
// 1. Explicit /api route for current time (tests 7 & 8)
// 2. /api/:date route for all other inputs
app.get(["/api/:date", "/api"] , (req , res) => {
  // Use 'date' parameter, which will be undefined for the "/api" route
  let dateString = req.params.date;
  let date ;
  
  try{
    if(!dateString){
      // Case 1: Empty date parameter (for /api)
      date = new Date();
    
    }else{
      // Check if the parameter is a Unix timestamp (a string of only digits)
      if(/^\d+$/.test(dateString)){
        // Case 3: Unix timestamp in milliseconds
        date = new Date(parseInt(dateString));
      }else{
        // Case 2: Date string (e.g., "2015-12-25")
        date = new Date(dateString);
      }
    }

    // Check for Invalid Date object
    if (date.toString() === "Invalid Date"){
      // Case 4: Invalid date (test 6)
      throw new Error("Invalid Date");
    } 
    
    // Return the successful JSON response
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });

    
  }
  catch(err){
    res.json({error : "Invalid Date"});
  } 
}
)

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});