const { MongoClient } = require("mongodb");
const url = "mongodb+srv://harry:HuQdiKKzUO43aPeD@webdev.v9plqok.mongodb.net/?retryWrites=true&w=majority";
const DB_name = "music-list-db";

function myMusicListDB() {
  const myDB = {};

  myDB.authenticate = async (user) => {
    console.log("enter authenticate");
    let client;
    try{
      client = new MongoClient(url);
      const COLLECTION_NAME = "users";
      console.log("connect to db ---");
      await client.connect();
      console.log("db connected");
      const db = client.db(DB_name);
      const usersCol = db.collection(COLLECTION_NAME);

      const res = await usersCol.find(user).toArray();
      return res;
      // if (res.password == user.passwordlogin) return true;
      // return false;
    }catch(error){
      console.log(error);
      // console.log(error.stack);
    }finally {
      await client.close();
      console.log("closing db connection");
    }  
  };

  myDB.findUserName = async function (userName) {
    console.log("Finding user called");
    let client;
    try {
      // client = new MongoClient(URL, { useUnifiedTopology: true });
      client = new MongoClient(url);
      console.log("Connecting to db");
      await client.connect();
      console.log("Connected to db");
      const db = client.db(DB_name);
      const allUsers = db.collection("users");
      // returns the array of users in users collection that match
      // the passed in userName query
      return await allUsers.find(userName).toArray();
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Closing connection to db");
      await client.close();
    }
  };

  // This function is responsible for registering a new user in database
  // We pass in user (containing userName and password) from server-side to insert into
  // the users collection
  myDB.registerUser = async function (user) {
    console.log("Register User called");
    let client;
    try {
      // client = new MongoClient(URL, { useUnifiedTopology: true });
      client = new MongoClient(url);
      console.log("Connecting to db");
      await client.connect();
      console.log("Connected to db");
      const db = client.db(DB_name);
      const allUsers = db.collection("users");
      // returns the response of creating (inserting) a user
      // in the users collection
      return await allUsers.insertOne(user);
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Closing connection to db");
      await client.close();
    }
  };

  return myDB;
}

module.exports = myMusicListDB();
