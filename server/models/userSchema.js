const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{type:String, default:""},
    email: { type: String, required: true, unique: true },
    bookmarkedCourses:{type:Array,default:[]},
    skillgapTests:{type:Array,default:[]},
    personalityTests:{type:Array,default:[]},
});

const User = mongoose.model("User", userSchema);
module.exports = User;
