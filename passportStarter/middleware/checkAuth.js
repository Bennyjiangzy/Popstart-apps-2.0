module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/auth/login");
  },
  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/dashboard");
  },

  // id the user id is 888 and is current login send them to the /admin
  // otherwise send them to the dasboard.
  isAdmin: function(req, res, next){
    if(req.user.id===888 && req.isAuthenticated()){
      return next()
    }
    res.redirect("/dashboard")

  }
};
