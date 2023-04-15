const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');

const { sequelize } = require('sequelize');


// Set up middleware to parse request body
app.use(bodyParser.urlencoded({ extended: true }));

// Set the view engine to use EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Define a route to render the user registration form
app.get('/register', (req, res) => {
  res.render('register');
});

// Define a route to handle the user registration form submission
app.post('/register', async (req, res) => {
  // Retrieve the email and password from the request body
  const { email, password, confirm_password } = req.body;

  // Check if the email is already in use
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(400).send('Email address already in use');
  }

  // Check if the password and confirm password fields match
  if (password !== confirm_password) {
    return res.status(400).send('Passwords do not match');
  }

  // Hash the password using bcrypt before storing in the database
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user with the email and hashed password
  const newUser = await User.create({ email, password: hashedPassword });

  // Redirect the user to the login page after successful registration
  res.redirect('/login');
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

