const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/jwtauth');
// const mongoDb = mongoose.connect('mongodb://127.0.0.1:27017/jwtauth', (err, db) => {
const mongoDb = mongoose.connect('mongodb://admin:aviana_admin@ds119080.mlab.com:19080/avianadb', (err, db) => {
  if (err) {
    console.log('Unable to connect to the server. Please start the server. Error:', err);
  } else {
    console.log('Mongoose default connection open to prod url');
  }
});
module.exports = mongoDb;
