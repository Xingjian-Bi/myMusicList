const express = require("express");
const router = express.Router();
const myMusicListDB = require("../db/myMusicList.js");



// route for registering a new user
router.post("/registerUser", async function (req, res) {
  // Contains the name and password of user from register
  // form request
  const user = req.body;
  // We only utilize userName when querying for a user
  // upon user registration
  const userName = {
    userName: user.userName,
  };
  // We pass userName to findUserName function when querying for a user
  // with matching userName
  try {
    // Response of finding a user
    // Returns an array of users that match the query of passed userName
    const findUserRes = await myMusicListDB.findUserName(userName);
    console.log("Get user (user name) from game-sharing-db ", findUserRes);
    // const createUserRes

    // If findUserRes array is empty then we call registerUser function
    if (!findUserRes.length) {
      const registerUserRes = await myMusicListDB.registerUser(user);
      console.log("Created user in game-sharing-db", registerUserRes);
    }
    res.send({ users: findUserRes });
  } catch (error) {
    console.log("login user error message: ", error);
    res.status(400).send({ err: error });
  }
});

module.exports = router;