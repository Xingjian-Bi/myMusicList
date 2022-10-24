const MongoClient = require("mongodb");

function myMusicListDB() {
  const myDB = {};
  const url = process.env.MOGO_URL || "mongodb+srv://harry:HuQdiKKzUO43aPeD@webdev.v9plqok.mongodb.net/?retryWrites=true&w=majority";
  const DB_name = "music-list-db";

  myDB.authenticate = async (user) => {
    const client = new MongoClient(url);


  };


}