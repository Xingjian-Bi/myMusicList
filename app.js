const express = require("express");

const port = 8000;
const app = express();

app.use("/", require("./routes/route"));



//How do we start listening to the server
app.listen(port, () => console.log(`server started on port ${port}`));