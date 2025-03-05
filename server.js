import express from 'express'; // importing express
import fs from 'fs'; // importing filesystem module

const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));

// POST method for adding books to books.txt
app.post('/add-book', (req, res) => {
  const { bookName, isbn, author, yearPublished } = req.body;

  // validating if all fields are provided and not empty
  if (!bookName?.trim() || !isbn?.trim() || !author?.trim() || !yearPublished?.trim()) {
    return res.send({ success: false });
  }

  // formats book data into a string
  const bookData = `${bookName.trim()},${isbn.trim()},${author.trim()},${yearPublished.trim()}
`;
  
  fs.appendFile('books.txt', bookData, (err) => { // appending book data to books.txt file
    if (err) {
      return res.send({ success: false, message: 'Error saving book data' });
    }
    return res.send({ success: true });
  });
});