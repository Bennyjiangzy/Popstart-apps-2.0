const userModel = require("../models/userModel").userModel;
const database = require("../models/userModel").database;

const getUserByEmailIdAndPassword = (email, password) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};
const getUserById = (id) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user, password) {
  return user.password === password;
}

const getUserByGitHubIdOrCreate=(profile)=>{
  let user = userModel.findById(profile.id)
  if (user) {
    return user;
  }
  database.push({id:profile.id,
                 name:profile.displayName,

  })
}

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
  getUserByGitHubIdOrCreate,
};
