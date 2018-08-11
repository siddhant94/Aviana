const express = require('express');
const path = require('path');

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const user = require('./routes/user.route');
const appUser = require('./routes/appUser.route');

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/checking', (req, res) => {
  res.json({
    Tutorial: 'Welcome to the Aviana (Auth as service using JWT)',
  });
});

app.use('/user', user);
app.use('/app', appUser);

app.listen(PORT);

module.exports = app;
