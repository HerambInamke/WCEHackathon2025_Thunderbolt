const User = require("../models/userSchema")
const getBookmarks = async (req, res) => {
    try {
      const { userId } = req.body;
      const email = userId
  
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
  
      // Fetch user and populate bookmarkedCourses with Career details
      const user = await User.findOne({ email }).populate("bookmarkedCourses");
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ bookmarks: user.bookmarkedCourses });
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

  module.exports = {getBookmarks}