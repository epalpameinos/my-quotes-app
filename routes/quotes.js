
const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const quotesController = require("../controllers/quotes");

router.get("/", homeController.getQuotes);
router.post("/createQuote", quotesController.createQuote);

router.put('/makeOrange', quotesController.makeOrange);
router.put('/makeGreen', quotesController.makeGreen);

router.delete('/deleteQuote', quotesController.deleteQuote);

module.exports = router;