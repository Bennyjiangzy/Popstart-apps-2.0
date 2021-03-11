const express = require("express");
const { Store } = require("express-session");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");
let admin={}


router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.user,
  });
});

//is Admin will intercept the current user whether is the super admin 
router.get("/admin", isAdmin, (req, res) => {
  // x is the sessionId which is active
  let x=Object.keys(req.sessionStore.sessions)
  for(sid of x){
    //create an object and save their sessionID also the UserID
    admin[sid]=JSON.parse(admin[sid]=req.sessionStore.sessions[sid])['passport']['user']
  };
  // send the current user or admin name and admin object to the ejs
  res.render("admin", {
    user: req.user,
    admin:admin
  });
});

router.post("/admin", (req,res)=>{
  // destroy the sessionID when user click the revoke based on the Id sends back
  req.sessionStore.destroy(req.body.Sid,(err)=>{
    if(err){
      console.log(err)
    }
  //also delete the elements in the object
    delete admin[req.body.Sid]
  // resend the new admin ejs
  })
  res.render("admin", {
    user: req.user,
    admin:admin
  });
})

module.exports = router;
