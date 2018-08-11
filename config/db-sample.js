const mongoose = require('mongoose');

const mongoDb = mongoose.connect('mongodb://localhost/dbname', (err, db) => {
  if (err) {
    console.log('Unable to connect to the server. Please start the server. Error:', err);
  } else {
    console.log('Mongoose default connection open to prod url');
  }
});
module.exports = mongoDb;
