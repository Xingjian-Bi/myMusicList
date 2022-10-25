const express = require("express");
const router = express.Router();
const myMusicListDB = require("../db/myMusicList.js");



// route for registering a new user
router.post("/registerUser", async function (req, res) {
  // Contains the name and password of user from register
  // form request
  const user = req.body;
  console.log("~~~~~~~~" + user.userName);
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
    console.log("Get user (user name) from db ", findUserRes);
    // const createUserRes

    // If findUserRes array is empty then we call registerUser function
    if (!findUserRes.length) {
      const registerUserRes = await myMusicListDB.registerUser(user);
      console.log("Created user in db", registerUserRes);
    }
    res.send({ users: findUserRes });
  } catch (error) {
    console.log("login user error message: ", error);
    res.status(400).send({ err: error });
  }
});


router.get("/musicList", (req, res) => {
  res.sendFile(__dirname, "../public", "musicList.html");
});

router.post("/login", async (req, res) => {
  const user = req.body;
  try{
    const userRes = await myMusicListDB.authenticate(user);
    console.log("login: get user from db", userRes);
    if (userRes.length){
      req.session.currUserName = user.userName;
    }
    // if (userRes){
    //   res.redirect("/musicList");
    // }

    res.send({ users: userRes });

  } catch(error){
    console.log("login: error", error);
    res.status(400).send({err: error});

  }


  // res.send("logged in! my music list is here: ");

});

module.exports = router;