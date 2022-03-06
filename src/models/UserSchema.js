const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    unique: true,
    minlength: 1,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
}, {
  timestamps: true,
});

const user = mongoose.model("User", userSchema);

module.exports = user;
