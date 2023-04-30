const express = require("express");
const router = express.Router();
const bidController = require("../controllers/bidController");

router.post("/", bidController.createBid);

module.exports = router;
