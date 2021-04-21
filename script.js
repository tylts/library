const library = document.querySelector('.library');
const addBtn = document.querySelector('#add-book');
const form = document.querySelector('.add-book-form');


addBtn.addEventListener('click', buildForm);

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295 pages', false);
const twilight = new Book('Twilight', 'Stephanie Meyer', '544 pages', true);

let myLibrary = [theHobbit, twilight];

function Book(title, author, pages, hasBeenRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.hasBeenRead = hasBeenRead
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.readStatus()}`;
}

Book.prototype.readStatus = function() {
    return (this.hasBeenRead ? 'read' : 'has not read')
}

function addBookToLibrary() {
    let title = prompt('Title:');
    let author = prompt('Author:');
    let pages = prompt('How many pages?');
    let hasBeenRead = true;

    myLibrary.push(new Book(title, author, pages, hasBeenRead));
    displayBooks();
}

function displayBooks() {
    while (library.firstChild) {
        library.removeChild(library.firstChild)
    }
    for (let i=0; i<myLibrary.length; i++) {
        bookCard = document.createElement('div');
        bookCard.classList.add('book');
        library.appendChild(bookCard);
        bookCard.textContent = myLibrary[i].info();
    }
}

function buildForm() {
    form.innerHTML = '<form><label for="title">Title:</label><input type="text"></input></form>'
}

displayBooks();