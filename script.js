const library = document.querySelector('.library');
const addFormBtn = document.querySelector('#add-book-btn');
const form = document.querySelector('.add-book-form');
const addBookBtn = document.querySelector('#add');
const cancelBtn = document.querySelector('#cancel');

const formTitle = document.querySelector('#title');
const formAuthor = document.querySelector('#author');
const formPages = document.querySelector('#pages');
const formRead = document.querySelector('#read-value');

addFormBtn.addEventListener('click', openForm);
addBookBtn.addEventListener('click', addBookToLibrary);
cancelBtn.addEventListener('click', closeForm);

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', false);
const twilight = new Book('Twilight', 'Stephanie Meyer', '544', true);

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
    let title = formTitle.value;
    let author = formAuthor.value;
    let pages = formPages.value;
    let hasBeenRead = formRead.checked;

    myLibrary.push(new Book(title, author, pages, hasBeenRead));
    displayBooks();
    clearInputs();
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

function openForm() {
    document.getElementById('form-pop-up').style.display = 'block';
    addFormBtn.style.display = 'none';
}

function closeForm() {
    document.getElementById('form-pop-up').style.display = 'none';
    addFormBtn.style.display = null;
}

function clearInputs() {
    formTitle.value = null;
    formAuthor.value = null;
    formPages.value = null;
    formRead.checked = null;
}

displayBooks();