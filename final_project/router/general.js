const express = require('express');
let books = require('./booksdb.js');
let isValid = require('./auth_users.js').isValid;
let users = require('./auth_users.js').users;
const public_users = express.Router();

// Check if a user with the given username already exists
const doesExist = (username) => {
  // Filter the users array for any user with the same username
  let userswithsamename = users.filter((user) => {
    return user.username === username;
  });
  // Return true if any user with the same username is found, otherwise false
  if (userswithsamename.length > 0) {
    return true;
  } else {
    return false;
  }
};

public_users.post('/register', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username == '' || password == '' || !username || !password) {
    return res
      .status(404)
      .json({ message: 'Please provide usernamen and password' });
  }

  // Check if both username and password are provided
  if (username && password) {
    // Check if the user does not already exist
    if (!doesExist(username)) {
      // Add the new user to the users array
      users.push({ username: username, password: password });
      return res
        .status(200)
        .json({ message: `User '${username}' successfully registered. Now you can login` });
    } else {
      return res.status(404).json({ message: `User with the name ${username} already exists!` });
    }
  }
  // Return error if username or password is missing
  return res.status(404).json({ message: 'Unable to register user.' });

});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  let titles = [];
  for (let key in books) {
    if (books.hasOwnProperty(key)) {
      titles.push(books[key].title);
    }
  }

  return res.status(200).json(titles);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const book = books[req.params.isbn];
  return res.status(200).json(book);
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const reqAuthor = req.params.author.replace('&', ' ');
  let apiReturn = [];
  for (let key in books) {
    if (books.hasOwnProperty(key)) {
      if (books[key].author == reqAuthor) {
        apiReturn.push({
          isbn: key,
          title: books[key].title,
          reviews: books[key].reviews,
        });
      }
    }
  }
  return res.status(200).json(apiReturn);
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  const reqTitle = req.params.title.replace('&', ' ');
  let apiReturn = [];
  for (let key in books) {
    if (books.hasOwnProperty(key)) {
      if (books[key].title == reqTitle) {
        apiReturn.push({
          isbn: key,
          author: books[key].author,
          reviews: books[key].reviews,
        });
      }
    }
  }
  return res.status(200).json(apiReturn);
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  const reviews = books[req.params.isbn].reviews;
  return res.status(200).json(reviews);
});

module.exports.general = public_users;
