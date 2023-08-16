const express = require('express');
const app = express();

let books = [
  { id: 1, title: 'Book One', description: 'Description of book one', authorId: 1 },
  { id: 2, title: 'Book Two', description: 'Description of book two', authorId: 2 },
];

let reviews = [
  { id: 1, text: 'Amazing book!', bookId: 1 },
  { id: 2, text: 'Decent read.', bookId: 2 },
];

let authors = [
  { id: 1, name: 'Author One', bio: 'Bio of Author One' },
  { id: 2, name: 'Author Two', bio: 'Bio of Author Two' },
];

app.get("/books",(req,res) => {
    res.json( books );
  });
  
  // get a specific posts
  app.get("/books/:id",(req,res) => {
    // posts/1
    const book = books.find( b => parseInt( b.id ) === parseInt( req.params.id ) );
    // make sure post is available
    if ( book ) {
      res.status(200).json(book);
    } else {
      // error handling
      res.status(400).json({ error: "ID provided is not available" });
    }
  })

  app.get("/reviews",(req,res) => {
    res.json( reviews );
  });
  
  // get a specific posts
  app.get("/reviews/:id",(req,res) => {
    // posts/1
    const review = reviews.find( r => parseInt( r.id ) === parseInt( req.params.id ) );
    // make sure post is available
    if ( review ) {
      res.status(200).json(review);
    } else {
      // error handling
      res.status(400).json({ error: "ID provided is not available" });
    }
  })

  app.get("/authors",(req,res) => {
    res.json( authors );
  });
  
  // get a specific posts
  app.get("/authors/:id",(req,res) => {
    // posts/1
    const author = authors.find( a => parseInt( a.id ) === parseInt( req.params.id ) );
    // make sure post is available
    if ( author ) {
      res.status(200).json(author);
    } else {
      // error handling
      res.status(400).json({ error: "ID provided is not available" });
    }
  })

  // get authors and books
app.get("/authorsbooks", (req, res) => {
    const booksWithAuthors = books.map(book => {
      const author = authors.find(author => author.id === book.authorId);
      return {
        ...book,
        author: {
          name: author.name,
          bio: author.bio
        }
      };
    });
  
    res.json(booksWithAuthors);
  });
  
  // get a authors and books
  app.get("/authorsbooks/:id", (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(book => book.id === bookId);
  
    if (book) {
      const author = authors.find(author => author.id === book.authorId);
      const bookWithAuthor = {
        ...book,
        name: author.name,
        bio: author.bio
      };
  
      res.status(200).json(bookWithAuthor);
    } else {
      res.status(400).json({ error: "Book with the provided ID is not available" });
    }
  });

  // get review and books
app.get("/reviewsbooks", (req, res) => {
    const booksWithReview = reviews.map(review => {
      const book = books.find(book => book.id === review.bookId);
      return {
        ...review,
        book: {
          title: book.title,
          description: book.description
        }
      };
    });
    res.json(booksWithReview);
  });
  // get a review and books
  app.get("/reviewsbooks/:id", (req, res) => {
    const reviewId = parseInt(req.params.id);
    const review = reviews.find(review => review.id === reviewId);
    if (review) {
      const book = books.find(book => book.id === review.bookId);
      const bookWithReview = {
        ...review,
          title: book.title,
      };
      res.status(200).json(bookWithReview);
    } else {
      res.status(400).json({ error: "Book with the provided ID is not available" });
    }
  });

// Your routing and controller code goes here
app.get("/",(req,res) => {
    res.send('<a href="/books">Books</a><a href="/reviews">Reviews</a><a href="/authors">Authors</a><a href="/authorsbooks">Authors and Books</a><a href="/reviewsbooks">Reviews and Books</a>');
  });
  
app.listen(5000, () => {
  console.log('Bookstore app is running on port 5000');
});