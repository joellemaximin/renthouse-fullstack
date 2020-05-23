const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const pool = require("./middleware/dbConnect");
const dotenv = require("dotenv")

const app = express();

require('dotenv').config();
// dotenv.config({ path: path.resolve(__dirname, ".env") })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

if (process.env.NODE_ENV === 'production') {
	// Serve any static files
	app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
	app.get('*', function(req, res) {
	  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
	});
}
if (process.env.NODE_ENV === 'development') {
	// Serve any static files
	app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
	app.get('*', function(req, res) {
	  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
	});
}

app.get("/", (req, res) => {
  res.send("<h1>Hello, its working</h1>");
});

module.exports = app;