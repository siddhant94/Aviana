const mongoose = require('mongoose');

const appUser = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: { type: String, required: true },
  password: { type: String, required: true },
  app_key: { type: String, required: true }
});

module.exports = mongoose.model('AppUser', appUser);
