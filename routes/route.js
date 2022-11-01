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
    console.log("Get user (user name) from db ", findUserRes);

    // If findUserRes array is empty then we call registerUser function
    if (!findUserRes.length) {
      const registerUserRes = await myMusicListDB.registerUser(user);
      console.log("Created user in db", registerUserRes);
    }
    // Send findUserRes to frontend and it will update accordingly
    res.send({ users: findUserRes });
  } catch (error) {
    console.log("login user error message: ", error);
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

// route for showing all recorded music
router.get("/getMusic", async function (req, res) {
  try {
    // Response of getting all game posts (as an array) from gameposts
    // collection in database
    const musicRes = await myMusicListDB.getMusic();
    // console.log("Got all music from db ", musicRes);
    // res.send({ recordedMusic: musicRes });
    res.send(musicRes);
  } catch (error) {
    console.log("Get game posts error message: ", error);
    res.status(400).send({ err: error });
  }
});

// route for showing user's playlist
router.get("/getList", async function (req, res) {
  try {
    // Response of getting all game posts (as an array) from gameposts
    // collection in database
    
    const listRes = await myMusicListDB.getList(req.session.userName);
    console.log("Got user's list from db ", listRes);
    // res.send({ recordedMusic: musicRes });
    res.send(listRes);
  } catch (error) {
    console.log("Get game posts error message: ", error);
    res.status(400).send({ err: error });
  }
});

// route for updating user's playlist
router.put("/updateList", async function (req, res) {
  try {
    // Response of getting all game posts (as an array) from gameposts
    // collection in database
    const listRes = await myMusicListDB.updateList(req.body.music,req.session.userName);
    console.log("Update user's list from db ", listRes);
    // res.send({ recordedMusic: musicRes });
    res.send(listRes);
  } catch (error) {
    console.log("Get game posts error message: ", error);
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
    console.log("Get music from db ", searchMusic);

    // If findMusic array is empty then we call recordMusic function
    if (!searchMusic.length) {
      const recordMusic = await myMusicListDB.recordMusic(music);
      console.log("Recorded music in db", recordMusic);
    }
    // Send findMusic to frontend and it will update accordingly
    res.send({ existedMusic: searchMusic });
    // res.send(searchMusic);

  } catch (error) {
    console.log("login user error message: ", error);
    res.status(400).send({ err: error });
  }
  // What does this do?
  // res.sendFile(__dirname, "../public", "musicList.html");
});

//route for add music comment
router.post("/musicComment", async (req, res) => {
  try{
    const commentRes = await myMusicListDB.musicComment(req.body.musicID, req.body.comment, req.session.userName);
    console.log("Comment added", commentRes);
    res.redirect("/musicList.html");
    // res.send({success: true});

  }catch(error){
    console.log("music comment error message: ", error);
    res.status(400).send({ err: error });
  }
});

router.post("/deleteMusic", async (req, res) => {
  try{
    const deleteRes = await myMusicListDB.deleteMusic(req.body.musicID);
    console.log("Music deleted", deleteRes);
    res.redirect("/musicList.html");

  }catch(error){
    console.log("music comment error message: ", error);
    res.status(400).send({ err: error });
  }

});





module.exports = router;