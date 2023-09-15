const mysql = require("mysql2");
const express = require("express");
const { body, validationResult } = require("express-validator");
const app = express();
require("dotenv").config();

const connection = mysql.createConnection({
  host: "172.17.0.3", // Adres hosta bazy danych. Jeśli działa na innym hoście lub w kontenerze, podaj odpowiedni adres.
  user: "root",
  password: "1234", // Twoje hasło
  database: "sommm", // Nazwa bazy danych
  port: 3306, // Port bazy danych
});

connection.connect((err) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Connection with MySQL done Yaaay!");
    // Tutaj możesz wykonywać zapytania SQL do bazy danych.
  }
});

app.use(express.static("FrontEnd"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/FrontEnd/index.html");
});

// Handle POST request to add a book
app.post("/addBook", (req, res) => {
  const { title, description, coverURL, rate } = req.body;

  // Insert the book data into the database
  const sql =
    "INSERT INTO books (title, description, coverURL, rate) VALUES (?, ?, ?, ?)";
  connection.query(
    sql,
    [title, description, coverURL, rate],
    (error, results) => {
      if (error) {
        console.error("Error adding the book:", error);
        res.status(500).json({ message: "Error adding the book" });
      } else {
        console.log("Book added successfully:", results);
        res.status(200).json({ message: "Book added successfully" });
      }
    }
  );
});

// Handle GET request to retrieve all books
app.get("/getBooks", (req, res) => {
  // Query the database to fetch all book records
  const sql = "SELECT * FROM books";
  connection.query(sql, (error, results) => {
    if (error) {
      console.error("Error fetching books:", error);
      res.status(500).json({ message: "Error fetching books" });
    } else {
      // Send the fetched books as JSON response
      res.status(200).json(results);
    }
  });
});

app.listen(3000, () => {
  console.log(`Server is running`);
});
