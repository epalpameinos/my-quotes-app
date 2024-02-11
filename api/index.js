
const express = require("express");
const app = express();

const logger = require("morgan");

const connectDB = require("./config/database");

const homeRoutes = require("../routes/home");
const quoteRoutes = require('../routes/quotes');

require("dotenv").config({ path: "./config/.env" });

connectDB();

app.set("view engine", "ejs");

//static folder
app.use(express.static("public"));

//body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//logging
app.use(logger("dev"));

//setup routes for which the server is listening
app.use("/", homeRoutes);
app.use('/quotes', quoteRoutes);

//Server Running
app.listen(process.env.PORT, () => {
    console.log("Server is running, you better catch it!");
});