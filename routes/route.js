const express = require("express");
const router = express.Router();

//Routes Templates needs to update based on different sites
router.get("/", (req, res) => {
  res.status(200).json({message:"get goals"});
});
router.post("/", (req, res) => {
  res.status(200).json({message:"post goals"});
});

module.exports = router;