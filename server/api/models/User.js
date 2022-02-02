const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  skillsets: [{ name: String }],
  hobbies: [{ name: String }],
  password: { type: String, required: true },
  createdAt: { type: Date },
});

module.exports = mongoose.model('User', userSchema);
