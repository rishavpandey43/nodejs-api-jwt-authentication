const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../model//User");

const { registerValidation, loginValidation } = require("../validation");

router.get("/", (req, res) => {
  User.find({}).then(users => {
    res.send(users);
  });
});

router.post("/register", async (req, res) => {
  // Validate data before processing the request
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // checking for duplicate user
  const emailExist = await User.findOne({ email: req.body.email });

  if (emailExist) {
    return res.status(400).send("User already exists, registration cancelled");
  }

  // HASH the password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword
  });
  // 1st way to register user
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
  // // 2nd way to register user
  // user
  //   .save()
  //   .then(user => {
  //     // console.log(user);
  //     res.sendStatus(200);
  //     res.send(user);
  //   })
  //   .catch(err => {
  //     let error = new Error("User was not registered, the error is:" + err);
  //     error.status = 400;
  //     res.send(error);
  //   });
});

router.post("/login", async (req, res) => {
  // Validate data before processing the request
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // checking for user not exist
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).send("Email doesn't exist");
  }

  // checking for correct password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    return res.status(400).send("Password entered is incorrect");
  }

  // create and assign token
  const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
});
module.exports = router;
