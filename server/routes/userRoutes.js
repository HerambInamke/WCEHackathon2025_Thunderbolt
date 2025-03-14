const express = require("express");
const { addUser } = require("../controllers/userController");
const User = require("../models/userSchema");

const router = express.Router();

router.post("/addUser", addUser);

// Route to get user's test history
router.post("/test-history", async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findOne({ email: userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Combine personality and skill gap tests into one history
    const history = [
      ...user.personalityTests.map(test => ({
        name: 'Personality Assessment',
        date: test.date,
        score: test.score
      })),
      ...user.skillgapTests.map(test => ({
        name: 'Skill Assessment',
        date: test.date,
        score: test.score
      }))
    ].sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date, newest first

    res.status(200).json({ history });
  } catch (error) {
    console.error("Error fetching test history:", error);
    res.status(500).json({ message: 'Error fetching test history' });
  }
});

module.exports = router;