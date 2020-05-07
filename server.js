const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
var session = require('express-session');
const pool = require("./middleware/dbConnect");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use(session({
	secret: 'seecret',
	resave: true,
	saveUninitialized: true
}));

require('dotenv').config();

if (process.env.NODE_ENV === 'production') {
	// Serve any static files
	app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
	app.get('*', function(req, res) {
	  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
	});
}

// catch 404 and forward to error handler
// app.get("/", (req, res) => {
//   res.send("<h1>Hello, its working</h1>");
// });

app.post('/private-auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		pool.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.admin = true;
				request.session.username = username;
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.get('/private-home', function(request, response) {
	if (request.session.admin) {
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

module.exports = app;