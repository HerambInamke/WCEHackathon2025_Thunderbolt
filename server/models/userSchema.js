const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  score: { type: Number, required: true }
});

const userSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  email: { type: String, required: true, unique: true },
  bookmarkedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Career' }],
  skillgapTests: [testSchema],
  personalityTests: [testSchema],
});

const User = mongoose.model("User", userSchema);
module.exports = User;