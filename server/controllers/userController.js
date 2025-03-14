const User = require("../models/userSchema");

// @desc   Add user email to database
// @route  POST /api/users
// @access Public
const addUser = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email });
      return res.status(201).json({ message: "User added", user });
    }

    return res.status(200).json({ message: "User already exists", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { addUser };
