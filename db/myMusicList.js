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

  return myDB;
}

module.exports = myMusicListDB();
