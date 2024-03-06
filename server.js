
const express = require("express");
const app = express();

const mongoose = require('mongoose');

const passport = require('passport');
const session = require('express-session');

const MongoStore = require('connect-mongo');
const methodOverride = require("method-override");
const flash = require('express-flash');

const logger = require("morgan");

const connectDB = require("./config/database");

const mainRoutes = require("./routes/main");
const postRoutes = require('./routes/posts');
// const commentRoutes = require("./routes/comments");

require("dotenv").config({ path: "./config/.env" });

// Passport config
require('./config/passport')(passport);

connectDB();

app.set("view engine", "ejs");

//static folder
app.use(express.static("public"));

//body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//logging
app.use(logger("dev"));

//use forms for put / delete
app.use(methodOverride("_method"));

// Sessions
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
    })
);
  
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

//setup routes for which the server is listening
app.use("/", mainRoutes);
app.use('/post', postRoutes);
// app.use("comment", commentRoutes);

//Server Running
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}, you betta catch it..`);
});