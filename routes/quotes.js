
const express = require("express");
const router = express.Router();
const quotesController = require("../controllers/quotes");

router.get("/", quotesController.getQuotes);
router.post("/createQuote", quotesController.createQuote);

router.put('/makeOrange', quotesController.makeOrange);
router.put('/makeGreen', quotesController.makeGreen);

router.delete('/deleteQuote', quotesController.deleteQuote);

module.exports = router;