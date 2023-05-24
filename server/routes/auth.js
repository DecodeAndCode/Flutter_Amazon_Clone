const express = require("express");
const User = require("../models/user");

const authRouter = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

//SIGN UP
authRouter.post("/api/signup", async function (req, res) {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email: email }); // short hand email
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "User with same email address already exists!" });
    }

    const hashedPassword = await bcryptjs.hash(password, 8);

    let user = new User({
      email,
      password: hashedPassword,
      name,
    });
    user = await user.save(); // give id and version
    res.json(user); // OR {user : user}
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

//SIGN IN
authRouter.post("/api/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "User with this email doesn't exist!" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Incorrect password." });
    }

    const token = jwt.sign({ id: user._id }, "passwordKey");
    res.json({ token: token, ...user._doc });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = authRouter;
