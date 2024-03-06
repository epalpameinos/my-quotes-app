
const express = require("express");
const router = express.Router();

const postsController = require("../controllers/posts");

const { ensureAuth, ensureGuest } = require('../middleware/auth'); 


router.get("/:id", ensureAuth, postsController.getPost);
router.post("/createPost", postsController.createPost);
router.delete("/deletePost/:id", postsController.deletePost);
router.put("/likePost/:id", postsController.likePost);

// router.put('/makeOrange', quotesController.makeOrange);
// router.put('/makeGreen', quotesController.makeGreen);

// router.delete('/deleteQuote', quotesController.deleteQuote);

module.exports = router;