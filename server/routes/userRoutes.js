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

    // Log user data for debugging

    // Initialize the history array
    const history = [];

    // Combine personality tests into history if they exist
    if (user.personalityTests && user.personalityTests.length > 0) {
      console.log("Personality Tests:", user.personalityTests);
      const latestPersonality = user.personalityTests[user.personalityTests.length - 2]
      const personalityHistory = {
        name: 'Personality Assessment',
        date: latestPersonality.date,
        recommendedCareers: latestPersonality.recommendedCareers
      };
      history.push(personalityHistory);
    }

    // Combine skill gap tests into history if they exist
    if (user.skillgapTests && user.skillgapTests.length > 0) {
      console.log("Skill Gap Tests:", user.skillgapTests);
      const latestSkillGap = user.skillgapTests[user.skillgapTests.length - 1]
      const skillGapHistory = {
        name: 'Skill Assessment',
        date: latestSkillGap.date,
        score: latestSkillGap.score
      };
      history.push(skillGapHistory);
    }

    // Sort the combined history by date, newest first
    history.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Log the combined history for debugging
    console.log("Combined History:", history);

    res.status(200).json({ history });
  } catch (error) {
    console.error("Error fetching test history:", error);
    res.status(500).json({ message: 'Error fetching test history' });
  }
});

module.exports = router;