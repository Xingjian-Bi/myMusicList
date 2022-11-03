const express = require("express");
const router = express.Router();
const myMusicListDB = require("../db/myMusicList.js");



// route for registering a new user
router.post("/registerUser", async function (req, res) {
  // Contains the name and password of user from register
  // form request
  const user = req.body;
  // Check if user name already exists
  const userName = {
    userName: user.userName,
  };
  // We pass userName to findUserName function when querying for a user
  // with matching userName
  try {
    // Response of finding a user
    // Returns an array of users that match the query of passed userName
    const findUserRes = await myMusicListDB.findUserName(userName);

    // If findUserRes array is empty then we call registerUser function
    if (!findUserRes.length) {
      const registerUserRes = await myMusicListDB.registerUser(user);
    }
    // Send findUserRes to frontend and it will update accordingly
    res.send({ users: findUserRes });
  } catch (error) {
    res.status(400).send({ err: error });
  }
});

// route for logining in
router.post("/login", async (req, res) => {
  const user = req.body;
  try{
    const userRes = await myMusicListDB.authenticate(user);
    console.log("login: get user from db", userRes);
    if (userRes.length){
      req.session.userName = user.userName;
    }

    res.send({ users: userRes });

  } catch(error){
    res.status(400).send({err: error});
  }
});

// route for showing all recorded music
router.get("/getMusic/:sortID", async function (req, res) {
  try {
    // Response of getting all game posts (as an array) from gameposts
    // collection in database

    const musicRes = await myMusicListDB.getMusic(req.params.sortID);
    res.send(musicRes);
  } catch (error) {
    res.status(400).send({ err: error });
  }
});

// route for showing user's playlist
router.get("/getList", async function (req, res) {
  try {
    // Response of getting all game posts (as an array) from gameposts
    // collection in database
    
    const listRes = await myMusicListDB.getList(req.session.userName);
    res.send(listRes);
  } catch (error) {
    res.status(400).send({ err: error });
  }
});

// route for updating user's playlist
router.put("/updateList", async function (req, res) {
  try {
    // Response of getting all game posts (as an array) from gameposts
    // collection in database
    const listRes = await myMusicListDB.updateList(req.body,req.session.userName);
    res.send(listRes);
  } catch (error) {
    res.status(400).send({ err: error });
  }
});

// route for searching a specific piece of music
router.post("/recordMusic", async function (req, res) {
  // Construct music from request
  const music = req.body;
  // Check if music already already exists
  const musicInfo = {
    title: music.title,
    musician: music.musician
  };

  // Pass music and musician and check if it already exist in db
  try {
    // Response of finding a music
    // Returns an array of music that matches
    const searchMusic = await myMusicListDB.searchMusic(musicInfo);

    // If findMusic array is empty then we call recordMusic function
    if (!searchMusic.length) {
      const recordMusic = await myMusicListDB.recordMusic(music);
    }
    // Send findMusic to frontend and it will update accordingly
    res.send({ existedMusic: searchMusic });

  } catch (error) {
    res.status(400).send({ err: error });
  }
  // What does this do?
  // res.sendFile(__dirname, "../public", "musicList.html");
});

//route for add music comment
router.post("/musicComment", async (req, res) => {
  try{
    const commentRes = await myMusicListDB.musicComment(req.body.musicID, req.body.comment, req.session.userName);
    res.redirect("/musicList.html");

  }catch(error){
    res.status(400).send({ err: error });
  }
});

router.post("/deleteMusic", async (req, res) => {
  try{
    const deleteRes = await myMusicListDB.deleteMusic(req.body.musicID);
    res.redirect("/musicList.html");

  }catch(error){
    res.status(400).send({ err: error });
  }

});





module.exports = router;
