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

app.get('/find-by-isbn-author', (req, res) => { // get method to retrieve the details of the book by isbn and author
  const { isbn, author } = req.query;

  fs.readFile('books.txt', (err, data) => { // reads the file to retrieve the book details
    const lines = data.toString().split('\n');
    const foundBooks = [];

    for (const line of lines) { // loops through each line in the file
      const [bookName, bookISBN, bookAuthor, yearPublished] = line.split(',');
      if (bookISBN === isbn && bookAuthor === author) { // checks if ISBN and author matches
        foundBooks.push({ bookName, isbn: bookISBN, author: bookAuthor, yearPublished }); // pushes the found book to the array
      }
    }

    if (foundBooks.length > 0) {
      return res.send(foundBooks); // sends matched book details
    } else {
      return res.send({ success: false, message: 'Book not found' });
    }
  });
});

app.get('/find-by-author', (req, res) => { // get method to retrieve the details of the book by author
  const { author } = req.query;

  fs.readFile('books.txt', (err, data) => { // reads the file to retrieve the book details
    const lines = data.toString().split('\n'); // splitting file data by lines
    const booksByAuthor = [];

    for (const line of lines) { // loops through each line in the file
      const [bookName, bookISBN, bookAuthor, yearPublished] = line.split(',');
      if (bookAuthor === author) { // checks if author matches
        booksByAuthor.push({ bookName, isbn: bookISBN, author: bookAuthor, yearPublished }); // pushes the found book in the array
      }
    }

    if (booksByAuthor.length > 0) {
      return res.send(booksByAuthor); // sends the details of the found book by author
    } else {
      return res.send({ success: false, message: 'Book not found' });
    }
  });
});

app.listen(3000, () => { console.log('Server started at port 3000')} );