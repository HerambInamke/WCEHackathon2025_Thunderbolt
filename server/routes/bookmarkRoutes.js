const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');

// Route to toggle a bookmark
router.post('/toggle-bookmark', async (req, res) => {
  const { userId, careerId } = req.body;

  try {
    const user = await User.findOne({ email: userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the careerId is already in the bookmarkedCourses array
    if (user.bookmarkedCourses.includes(careerId)) {
      // Remove the careerId from the array
      await User.findOneAndUpdate(
        { email: userId },
        { $pull: { bookmarkedCourses: careerId } },
        { new: true }
      );
      return res.status(200).json({ message: 'Bookmark removed successfully' });
    } else {
      // Add the careerId to the array
      await User.findOneAndUpdate(
        { email: userId },
        { $addToSet: { bookmarkedCourses: careerId } },
        { new: true }
      );
      return res.status(200).json({ message: 'Bookmark added successfully' });
    }
  } catch (error) {
    console.error("Error toggling bookmark:", error);
    res.status(500).json({ message: 'Error toggling bookmark' });
  }
});

// Route to check if a career is bookmarked
router.post('/check-bookmark', async (req, res) => {
  const { userId, careerId } = req.body;

  try {
    const user = await User.findOne({ email: userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the careerId is in the bookmarkedCourses array
    const isBookmarked = user.bookmarkedCourses.includes(careerId);
    res.status(200).json({ isBookmarked });
  } catch (error) {
    console.error("Error checking bookmark:", error);
    res.status(500).json({ message: 'Error checking bookmark' });
  }
});

// Route to get all bookmarked careers
router.post('/get-bookmarks', async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findOne({ email: userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Populate the bookmarked careers with their details
    const Career = require('../models/careers');
    const bookmarks = await Career.find({ _id: { $in: user.bookmarkedCourses } });
    
    res.status(200).json({ bookmarks });
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    res.status(500).json({ message: 'Error fetching bookmarks' });
  }
});

module.exports = router;