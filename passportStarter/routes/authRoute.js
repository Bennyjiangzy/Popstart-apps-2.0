const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");

const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
  })
);

router.get("/githubLogin", passport.authenticate("github"));

router.get(
  "/github/callback",
  passport.authenticate("github"),
  function (req, res) {
    // After log-in with github, it will show Unauthorized. You can click back button to the /auth/login page and re-click the log-in with github
    // This time will show correct dashbord page with corect name on it.
    res.redirect("/dashboard");
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/login");
});

module.exports = router;
