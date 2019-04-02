// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


function formatDate(date){
  let utcDate = date.toUTCString();
  return {
      "unix": date.getTime(),
      "utc": utcDate
  }
}

app.get("/api/timestamp", function (req, res){
  res.json(formatDate(new Date()));
});


// your first API endpoint... 
app.get("/api/timestamp/:date", function (req, res) {
  
  // res.json({ format: typeof req.params.date});
  let inputParameter = req.params.date;
  
  if(inputParameter.split("-").length > 1){
    res.json(formatDate(new Date(inputParameter)));
  }else {
    res.json(formatDate(new Date(parseInt(inputParameter))));
  }

});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});