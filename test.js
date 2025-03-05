import needle from 'needle'; //importing needle module fot HTTP req

// POST request to add book
needle.post('http://localhost:3000/add-book', {
  bookName: 'Harry Potter and the Philosopher’s Stone',
  isbn: '978-0-7475-3269-9',
  author: 'J.K Rowling',
  yearPublished: '1997'
}, (err, res) => {
    console.log(res.body);
}
);
needle.post('http://localhost:3000/add-book', {
  bookName: 'Harry Potter and the Chamber of Secrets',
  isbn: '0-7475-3849-2',
  author: 'J.K Rowling',
  yearPublished: '1998'
}, (err, res) => {
    console.log(res.body);
}
);
needle.post('http://localhost:3000/add-book', {
  bookName: 'The Little Prince',
  isbn: '978-0156012195',
  author: 'Saint-Exupery',
  yearPublished: '1943'
}, (err, res) => {
    console.log(res.body);
}
);

// GET request by ISBN and author
needle.get('http://localhost:3000/find-by-isbn-author?isbn=978-0-7475-3269-9&amp;author=J.K+Rowling', 
  (err, res) => {
    console.log(res.body);
  }
);

// GET request by author only
needle.get('http://localhost:3000/find-by-author?author=J.K+Rowling', 
  (err, res) => {
    console.log(res.body);
  }
);