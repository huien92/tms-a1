//import React, { useEffect } from "react"

const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cors = require('cors')

const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'user',
	password : 'test1234',
	database : 'nodelogin'
});

const app = express();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));
app.use(cors())

// http://localhost:3000/
app.get('/', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/index.html'));
});

// http://localhost:3000/auth
app.post('/auth', function(request, response) {
	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
	console.log(`test: ${username} || ${password}`);
	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				request.session.loggedin = true;
				request.session.username = username;
				// Redirect to home page
				//response.redirect('http://localhost:4000/home');
				response.send('User ${username} authenticated');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			//response.end();
		console.log(results);
		});
	//} else {
	//	response.send('Please enter Username and Password!');
	//	response.end();
	}
});

// http://localhost:3000/home
app.get('/home', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		// Not logged in
		response.send('Please login to view this page!');
	}
	response.end();
});

app.post('/createuser', function(request, response) {
	let username = request.body.username;
	let password = request.body.password;
	let email = request.body.email;
	let usernameUsed = true;
	let user = [[username, password, email]];
	console.log(`test: ${username} || ${password} || ${email}`);
	// Ensure the input fields exists and are not empty
	if (username) {
		// Execute SQL query to check username exist
		connection.query("SELECT * FROM accounts WHERE username = ?",[username] ,function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			for (var i=0; i < results.length; i ++)
			{
				console.log(results[i])
			}
			console.log("test result2: " + results);
			if(results.length > 0){
				response.send(`User ${username} exists!`);
			} else{
				// Insert user to database
				connection.query("INSERT INTO accounts (username, password, email) VALUES ?",[user],function(error, results, fields) {
					if (error) throw error;
					console.log(results)
				})	
				response.send(`User ${username} created!`);
			}
		})
	} 
	else{
		response.send('Field(s) are empty!');
	}
});

app.post('/changepassword', function(request, response) {
	let username = request.body.username;
	let password = request.body.password;

	console.log(passwordUpdate);
	connection.query("UPDATE accounts SET password = ? WHERE username = ?", [password, username], function(error, results, fields) {
		if (error) throw error;
		console.log(results);
	})
	response.send('Password changed!');
});

app.post('/updtemail', function(request, response) {
	let username = request.body.username;
	let email = request.body.email;

	connection.query("UPDATE accounts SET email = ? WHERE username = ?", [email, username], function(error, results, fields) {
		if (error) throw error;
		console.log(results);
	})
	response.send('Email updated!');	
});

app.listen(4000);
console.log("Server running")
