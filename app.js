const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const router = require("./routes/route.js");

const port = 8000 || process.env.PORT;
const app = express();

// app.use("/", require("./routes/route"));

app.use(session({secret: "user name", resave: false, saveUninitialized: true, cookie: {maxAge: 60000 }}));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

app.use(router);

// Search html file under "public" folder
app.use(express.static("public"));
// app.get("/", (req, res) => {
//   res.send("Hi");
// });

//How do we start listening to the server
app.listen(port, () => console.log(`server started on port ${port}`));