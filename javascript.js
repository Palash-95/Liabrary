/* eslint-disable no-inner-declarations */
/* eslint-disable no-restricted-syntax */
const myLibrary = [
  {
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    pages: 332,
    read: 'Read',
  },
  {
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    pages: 332,
    read: 'Read',
  },
  {
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    pages: 332,
    read: 'Read',
  },
];

const body = document.body;
const cardHolder = document.querySelector('.cardHolder');
const dimmedOverlay = document.querySelector('#dimmed-overlay');
const form = document.querySelector('form');
form.addEventListener('submit', createBook);

const formButton = document.querySelector('#showForm');
formButton.addEventListener('click', showForm);

function showForm(event) {
  form.style.display = 'flex';
  dimmedOverlay.style.display = 'block';

  event.stopPropagation();

  window.addEventListener('click', (event) => {
    if (!form.contains(event.target)) {
      form.style.display = 'none';
      dimmedOverlay.style.display = 'none ';
    }
  });
}

makeCards();

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read ? 'Read' : 'Not read';
}

function addBookToLibrary(bookObj) {
  myLibrary.push(bookObj);
  makeCards();
}

function createBook(event) {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.querySelector("input[name='read']:checked");

  let book = new Book(title, author, pages, read);

  addBookToLibrary(book);
  form.style.display = 'none';
  dimmedOverlay.style.display = 'none ';
  form.reset();
}

function makeCards() {
  cardHolder.innerHTML = '';

  for (const book of myLibrary) {
    const card = document.createElement('div');
    card.innerHTML = `<p>"${book.title}"</p>
                      <p>${book.author}</p>
                      <p>${book.pages} pages</p>`;

    const index = myLibrary.indexOf(book);
    card.setAttribute('data', index);

    const readButton = document.createElement('button');
    function setReadStatus() {
      if (book.read === 'Read') {
        readButton.textContent = 'Read';
        readButton.style.backgroundColor = 'var(--light-green)';
      } else {
        readButton.textContent = 'Not read';
        readButton.style.backgroundColor = 'var(--light-red)';
      }
    }

    setReadStatus();

    readButton.addEventListener('click', () => {
      book.read = (book.read === 'Read') ? 'Not read' : 'Read';
      setReadStatus();
    });

    card.appendChild(readButton);

    const remove = document.createElement('button');
    remove.textContent = 'Remove';
    remove.addEventListener('click', removeBook);
    card.appendChild(remove);

    cardHolder.appendChild(card);
  }
}

function removeBook(e) {
  let index = e.target.parentNode.getAttribute('data');
  myLibrary.splice(+index, 1);
  makeCards();
}