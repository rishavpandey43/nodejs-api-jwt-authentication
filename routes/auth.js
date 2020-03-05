const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Hello");
});

router.post("/register", (req, res) => {
  res.send("Register");
});

router.post("/login", (req, res) => {});
module.exports = router;
