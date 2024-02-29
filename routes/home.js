
const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const authController = require('../controllers/auth');

const quotesController = require("../controllers/quotes");

const { ensureAuth, ensureGuest } = require('../middleware/auth'); 

router.get("/", homeController.getIndex);

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);
router.get('/logout', authController.logout);

router.get("/profile", ensureAuth, quotesController.getProfile);
router.get("/feed", ensureAuth, quotesController.getFeed);

module.exports = router;