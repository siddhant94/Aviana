const express = require('express');

const app = express();
const bodyParser = require('body-parser');

const user = require('./routes/user.route');
const appUser = require('./routes/appUser.route');

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({
    Tutorial: 'Welcome to the HOME',
  });
});

app.get('/checking', (req, res) => {
  res.json({
    Tutorial: 'Welcome to the Node express JWT Tutorial',
  });
});

app.use('/user', user);
app.use('/app', appUser);

app.listen(PORT);

module.exports = app;
