var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("user");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/register", function (req, resp) {
  const { username, password } = req.body;

  if (!username || !password) {
    return resp.status(422).json({ error: "please add all the fields" });
  }

  User.findOne({ username: username })
    .then((saveduser) => {
      if (saveduser) {
        return resp
          .status(422)
          .json({ error: "user already existed with this email" });
      }

      const user = new User({
        username,
        password,
      });

      user
        .save()
        .then((user) => {
          resp.json({ message: "saved successfully" });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log("err", err);
    });

  console.log(username, password);
});

router.post("/signin", function (req, res) {
  console.log("entereddd...")
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(422).json({ error: "please add both email and password" });
  }

  User.findOne({ username: username }).then((saveduser) => {
    if (!saveduser) {
      res.status(401).json({ error: "invalid email or password" });
    }
    if (password === saveduser.password) {
      res.send("logged in successfully");
    } else  {
      res.status(401).json({error: "invalid email or password"});

    }
  }).catch(err => {
    console.log(err);
    res.send(err);
  });
});

router.get("/getUsers", function (req, res) {
  console.log("entereddd...")

  User.find({username: /\w+/i}).select("-password").then((saveduser) => {
    res.send(saveduser);
  }).catch(err => {
    console.log(err);
    res.send(err);
  });
});

module.exports = router;
