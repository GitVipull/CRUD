const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
      firstName: String,
      lastName: String,
      age: Number,
      country: String,
      },{
      timestamps: true
  });

  module.exports = mongoose.model('Users', UserSchema);
