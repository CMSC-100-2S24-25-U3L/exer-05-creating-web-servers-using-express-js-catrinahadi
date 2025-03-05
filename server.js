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

// GET method to find book by ISBN and Author
app.get('/find-by-isbn-author', (req, res) => {
  const { isbn, author } = req.query; // extracting ISBN and author from query parameters

  fs.readFile('books.txt', (err, data) => {
    if (err) {
      return res.send('Error reading file');
    }

    const lines = data.toString().split('\n'); // splitting file data by lines
    let result = '';

    // loops through each line in the file
    for (const line of lines) {
      if (!line.trim()) continue; // skip empty lines
      const [bookName, bookISBN, bookAuthor, yearPublished] = line.split(',');
      // checks if ISBN and author match
      if (bookISBN === isbn && bookAuthor === author) {
        result += `<p><strong>${bookName}</strong><br> ISBN: ${bookISBN}<br> Author: ${bookAuthor}<br> Year Published: ${yearPublished}</p>`;
      }
    }

    // sends matched book details
    if (result) {
      return res.send(result);
    } else {
      return res.send({ success: false, message: 'Book not found'});
    }
  });
});

// GET method to find book by Author Only
app.get('/find-by-author', (req, res) => {
  const { author } = req.query; // extracting author from query parameters

  fs.readFile('books.txt', (err, data) => {
    if (err) {
      return res.send('Error reading file');
    }

    const lines = data.toString().split('\n'); // splitting file data by lines
    let result = '';

    
    for (const line of lines) {// loops through each line in the file
      if (!line.trim()) continue; // skip empty lines
      const [bookName, bookISBN, bookAuthor, yearPublished] = line.split(',');
      // checks if author matches
      if (bookAuthor === author) {
        result += `<p><strong>${bookName}</strong><br> ISBN: ${bookISBN}<br> Author: ${bookAuthor}<br> Year Published: ${yearPublished}</p>`;
      }
    }

    if (result) { // sends the details of the found book by author
      return res.send(result);
    } else {
      return res.send({ success: false, message: 'Book not found'});
    }
  });
});
//afafafa
app.listen(3000, () => { console.log('Server started at port 3000')} );
