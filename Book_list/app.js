// Book contructor

function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI constructo
function UI() {}
UI.prototype.addBookToList = function (book) {
  const html = `
        <tr>
            <th>${book.title}</th>
            <th>${book.author}</th>
            <th>${book.isbn}</th>
            <th><a href="#" class="delete">X</a></th>
        </tr>
    `;
  document.getElementById('book-list').insertAdjacentHTML('afterbegin', html);
};

UI.prototype.clearFields = function () {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
};
UI.prototype.showAlert = function (msg, className) {
  const html = `
        <div class="${className} alert">${msg}</div>
    `;
  document.querySelector('#book-form').insertAdjacentHTML('beforebegin', html);

  setTimeout(function () {
    document.querySelector('.alert').remove();
  }, 3000);
};

UI.prototype.deleteBook = function (target) {
  if (target.classList.contains('delete')) {
    target.closest('tr').remove();
  }
};

function Starge() {}

Storage.getBooks = function () {
  let books;

  if (localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }
  return books;
};

Storage.addBook = function (book) {
  const books = Storage.getBooks();

  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
};
Storage.removeBook = function (isbn) {
  const books = Storage.getBooks();

  books.forEach((book, index) => {
    if (book.isbn === isbn) {
      books.splice(index, 1);
    }
  });

  localStorage.setItem('books', JSON.stringify(books));
};
Storage.displayBooks = function () {
  const books = Storage.getBooks();

  const ui = new UI();

  books.forEach((book) => {
    ui.addBookToList(book);
  });
};

document.addEventListener('DOMContentLoaded', Storage.displayBooks);

document.querySelector('#book-form').addEventListener('submit', function (e) {
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;

  const book = new Book(title, author, isbn);
  const ui = new UI();

  if (title === '' || author === '' || isbn === '') {
    ui.showAlert('Please fill in all forms', 'error');

    return;
  }
  ui.addBookToList(book);
  Storage.addBook(book);

  ui.clearFields();
  ui.showAlert('Book Added!', 'success');

  isbn.value = '';

  console.log(book);
  e.preventDefault();
});

document.querySelector('#book-list').addEventListener('click', function (e) {
  const ui = new UI();
  ui.deleteBook(e.target);

  if (e.target.classList.contains('delete')) {
    ui.showAlert('Book deleted', 'success');
    Storage.removeBook(
      e.target.parentElement.previousElementSibling.textContent
    );
  }
});
