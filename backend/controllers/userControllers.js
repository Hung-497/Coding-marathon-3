const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const User = require("../models/userModel");
const config = require('../utils/config');


//generate token with exp.time
const generateToken = (_id) => {
  return JWT.sign({ _id }, config.SECRET, {
    expiresIn: "10d",
  });
};

const signUpUser = async (req, res) => {
  const {
    name,
    username,
    password,
    phone_number,
    licenseNumber,
    date_of_birth,
    address,
  } = req.body;

  try {
    if (
      !name ||
      !username ||
      !password ||
      !phone_number ||
      !licenseNumber ||
      !date_of_birth ||
      !address
    ) {
      res.status(400);
      throw new Error("Please fill all sections.");
    }

    const alreadyExists = await User.findOne({ username });

    if (alreadyExists) {
      res.status(400);
      throw new Error("already exists");
    }

    //hash
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    //create with hash
    const user = await User.create({
      name,
      username,
      password: hashed,
      phone_number,
      licenseNumber,
      date_of_birth,
      address,
    });

    if (user) {
      const token = generateToken(user._id);
      res.status(201).json({ username, token });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//login
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(user._id);
      res.status(200).json({ username, token });
    } else {
      res.status(400);
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  signUpUser,
  loginUser,
};
