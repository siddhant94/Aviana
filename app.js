const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const user = require('./routes/user.route');

const PORT = process.env.PORT || 3000;


// mongoose.connect('mongodb://127.0.0.1:27017/jwtauth');
// mongodb://localhost/dbCollection
mongoose.connect('mongodb://127.0.0.1:27017/jwtauth', function(err, db) {
    if (err) {
        console.log('Unable to connect to the server. Please start the server. Error:', err);
    } else {
        console.log('Connected to Server successfully!');
    }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({
      Tutorial: "Welcome to the HOME"
    });
  });

app.get("/checking", (req, res) => {
    console.log('/checking: REQUEST');
  res.json({
    Tutorial: "Welcome to the Node express JWT Tutorial"
  });
});

app.use('/user', user);

// app.listen(PORT, () => {
//   console.log("Example app listening on " + PORT + "!");
// });
app.listen(PORT);