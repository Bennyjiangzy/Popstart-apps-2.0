const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const githubStrategy = require("passport-github").Strategy;
const userController = require("../controllers/userController");
const localLogin = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    const user = userController.getUserByEmailIdAndPassword(email, password);
    return user
      ? done(null, user)
      : done(null, false, {
          message: "Your login details are not valid. Please try again",
        });
  }
);

const githubLogin = new githubStrategy(
  {
    clientID: "06456f048f4e97456b40",
    clientSecret: "34e31d557e5c9061e231d37141215b6b72f0b944",
    callbackURL: "http://localhost:8000/auth/github/callback",
  },
  function (accessToken, refreshToken, profile, done) {
    // The github will transmit the profile back after it check on there database exist.
    // And I create a function to check does the profile exist in our local database.
    // if not, create one for them.
    let user = userController.getUserByGitHubIdOrCreate(profile);
    done(null, user);
  }
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  let user = userController.getUserById(id);
  if (user) {
    done(null, user)
  } else {
    done({ message: "User not found" }, null);
  }
});

module.exports = passport.use(localLogin).use(githubLogin);
