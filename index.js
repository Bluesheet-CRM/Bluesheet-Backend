const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const userDetails = require("./models/User");
var jwt = require("jsonwebtoken");
var jwt1 = require("jwt-simple");
const Auth = require("./routes/user");
const Pipelines = require("./routes/data");
var passport = require("passport");
const User = require("./models/User");
var ForceDotComStrategy = require("passport-forcedotcom").Strategy;
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(Auth);
app.use(Pipelines);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
app.use(express.urlencoded({ extended: false }));


passport.use(
  new ForceDotComStrategy(
    {
      clientID: process.env.CONSUMER_KEY,
      clientSecret: process.env.CONSUMER_SECRET,
      scope: ["id", "web", "api","refresh_token","offline_access"],
      callbackURL: "http://localhost:8080/auth/callback"
    },

    function verify(token, refreshToken, profile, done) {
      const payload = {
        profile,
        token,
      };
      console.log("Profile", profile);
      console.log("token", token);
      console.log("refreshToken", refreshToken);
      return done(null, profile);
    }
  )
);

app.get(
  "/auth/login",
  passport.authenticate("forcedotcom", {
    display: "page", // valid values are: "page", "popup", "touch", "mobile"
    prompt: "login", // valid values are: "login", "consent", or "login consent"
  }),
  function (req, res) {
    console.log(res);
  }
);
// this should match the callbackURL parameter above:
app.get(
  "/auth/callback",
  passport.authenticate("forcedotcom", { failureRedirect: "/error" }),
  function (req, res) {
    console.log(res.ServerResponse.user)
    res.redirect("http://localhost:3000/app/pipelines");
  }
);

app.get("/token", async (req, res) => {
  try {
    const result = await userDetails.find({});
    const token = result[0].token.params.access_token;
    const secret = result[0].token.params.signature;
    console.log(token)
    console.log(secret+process.env.CONSUMER_SECRET);
    var decoded = jwt.verify(token, secret+process.env.CONSUMER_SECRET,true, 'HMAC-SHA256');
    console.log(decoded);
    decoded = jwt.base
  } catch (err) {
    console.log("erro", err);
  }
  res.send("success");
});
app.listen(PORT, console.log(`Server is starting at ${PORT}`));
