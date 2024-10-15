const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    let titles = [];
    for (let key in books) {
        if (books.hasOwnProperty(key)) {
            titles.push(books[key].title);
        }
    }
    //console.log(JSON.stringify(titles));
    //return JSON.stringify(titles);

  return res.status(200).json(titles);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const book = books[req.params.isbn];
  return res.status(200).json(book);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const reqAuthor = req.params.author
  for (let key in books) {
    if (books.hasOwnProperty(key)) {
        if (books[key].author == reqAuthor) {
            let apiReturn = books[key]
        };
    }
}
  return res.status(200).json(apiReturn);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
