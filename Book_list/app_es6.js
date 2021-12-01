class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  // Add book
  addBookToList(book) {
    const html = `
            <tr>
                <th>${book.title}</th>
                <th>${book.author}</th>
                <th>${book.isbn}</th>
                <th><a href="#" class="delete">X</a></th>
            </tr>
        `;

    document.getElementById('book-list').insertAdjacentHTML('afterbegin', html);
  }

  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
    document.getElementById('title').focus();
  }

  // Alert window
  showAlert(msg, className) {
    const html = `
            <div class="alert ${className}">${msg}</div>
        `;
    document
      .getElementById('book-form')
      .insertAdjacentHTML('beforebegin', html);

    setTimeout(function () {
      document.querySelector('.alert').remove();
    }, 3000);
  }

  deleteBook(target) {
    if (target.classList.contains('delete')) {
      target.closest('tr').remove();
    }
  }
}

class Storage {
  static getBooks() {
    let books;

    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBook(book) {
    const books = Storage.getBooks();

    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }
  static remobeBook(isbn) {
    const books = Storage.getBooks();

    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
  static displayBooks() {
    const books = Storage.getBooks();

    const ui = new UI();

    books.forEach((book) => {
      ui.addBookToList(book);
    });
  }
}

document.addEventListener('DOMContentLoaded', Storage.displayBooks);

document.querySelector('#book-form').addEventListener('submit', function (e) {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;

  const book = new Book(title, author, isbn);
  const ui = new UI();

  if (title === '' || author === '' || isbn === '') {
    ui.showAlert('Please fill in all forms', 'error');
    return;
  }

  ui.addBookToList(book);
  Storage.addBook(book);
  ui.showAlert('Book added', 'success');
  ui.clearFields();

  e.preventDefault();
});

document.getElementById('book-list').addEventListener('click', function (e) {
  const ui = new UI();

  ui.deleteBook(e.target);
  if (e.target.classList.contains('delete')) {
    ui.showAlert('Book deleted', 'success');
    console.log(e.target.parentElement.previousElementSibling.textContent);
    Storage.remobeBook(
      e.target.parentElement.previousElementSibling.textContent
    );
  }

  e.preventDefault();
});
