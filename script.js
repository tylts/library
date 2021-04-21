const library = document.querySelector('.library');

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295 pages', 'not read yet');
const twilight = new Book('Twilight', 'Stephanie Meyer', '544 pages', 'read');

let myLibrary = [theHobbit, twilight];

function Book(title, author, pages, hasBeenRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.hasBeenRead = hasBeenRead
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.hasBeenRead}`;
}

function addBookToLibrary() {
    let title = prompt('Title:');
    let author = prompt('Author:')
    let pages = prompt('How many pages?')
    let hasBeenRead = prompt('Have you read this book?')

    myLibrary.push(new Book(title, author, pages, hasBeenRead));
    clearLibrary();
    displayBooks();
}

function displayBooks() {
    for (let i=0; i<myLibrary.length; i++) {
        bookCard = document.createElement('div');
        bookCard.classList.add('book');
        library.appendChild(bookCard);
        bookCard.textContent = myLibrary[i].info();
    }
}

function clearLibrary() {
    while (library.firstChild) {
        library.removeChild(library.firstChild)
    }
}

displayBooks();