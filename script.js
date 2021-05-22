// Query Selectors
const library = document.querySelector('.library');
const form = document.querySelector('.add-book-form');
const addBookBtn = document.querySelector('#add');
const cancelBtn = document.querySelector('#cancel');
const toggle = document.querySelector('.check-read');

const formTitle = document.querySelector('#title');
const formAuthor = document.querySelector('#author');
const formPages = document.querySelector('#pages');
const formRead = document.querySelector('#read-value');

// Event Listeners
addBookBtn.addEventListener('click', addBookToLibrary);
cancelBtn.addEventListener('click', closeForm);
toggle.addEventListener('click', function() {
    if (toggle.textContent.includes('This book has not been read.')) {
        toggle.textContent = 'This book has been read. (Click to change)';
    } else {
        toggle.textContent = 'This book has not been read. (Click to change)';
    }
})

// localStorage magic. This enables setting and getting objects and arrays.
Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObject = function(key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
}

let myLibrary = [];

function Book(title, author, pages, hasBeenRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.hasBeenRead = hasBeenRead
}

Book.prototype.info = function() {
    return `<h1>${this.title}</h1> <h2>by ${this.author}</h2> <p>${this.pages} pages</p> <span class='read'>${this.readStatus()}</span>`;
}

Book.prototype.readStatus = function() {
    let status = (this.hasBeenRead ? 'Read' : 'Unread');
    localStorage.setObject('books', myLibrary);
    return status;
}

function addBookToLibrary() {
    if (formTitle.value == "" || formAuthor.value == "" || formPages.value == "") {
        return;
    } else {

    let title = formTitle.value;
    let author = formAuthor.value;
    let pages = formPages.value;
    let hasBeenRead = checkRead();
    
    // Creates a Book object and pushes it to the myLibrary array
    myLibrary.push(new Book(title, author, pages, hasBeenRead));
    displayBooks(title, author, pages, hasBeenRead);
    clearInputs();
    document.getElementById('form-pop-up').style.display = 'none';
    }
    localStorage.setObject('books', myLibrary)
}

function checkRead() {
    if (toggle.textContent.includes('This book has not been read.')) {
        return false;
    } else {
        return true;
    }
}


retrieveBooksFromStorage()


function displayBooks() {

    while (library.firstChild) {
        library.removeChild(library.firstChild)
    }

    // Creates book cards and then adds the book's info
    for (let i=0; i<myLibrary.length; i++) {
        bookCard = document.createElement('div');
        bookCard.classList.add('book');
        library.appendChild(bookCard);
        addXToBook(i);
        bookCard.innerHTML += myLibrary[i].info();

        //removes books by clicking the X
        allBookX[i].addEventListener('click', function(){
            myLibrary.splice(i, 1);
            localStorage.setObject('books', myLibrary);
            displayBooks();
        })
    }

    let newBook = document.createElement('div');
    newBook.classList.add('new-book');
    newBook.textContent = '+';
    newBook.addEventListener('click', openForm);
    library.appendChild(newBook);

    accessReadStatus();
}

// this adds the X to the book card and with some mouse hover magic
function addXToBook(i){
    bookX = document.createElement('span');
    bookX.classList.add('book-x');
    bookX.textContent = '✕';
    bookCard.appendChild(bookX);
    allBookX = document.getElementsByClassName('book-x');
    // X's are shown by default if on mobile
    if (window.innerWidth >= 500) {
        bookCard.addEventListener('mouseover', function() {
            allBookX[i].style.opacity = '100%';
        })
        bookCard.addEventListener('mouseleave', function() {
            allBookX[i].style.opacity = '0';
        })
    } else {
        allBookX[i].style.opacity = '100%';
    }
}

function openForm() {
    document.getElementById('form-pop-up').style.display = 'block';
}

function closeForm() {
    document.getElementById('form-pop-up').style.display = 'none';
}

function clearInputs() {
    formTitle.value = null;
    formAuthor.value = null;
    formPages.value = null;
    toggle.textContent = 'This book has not been read. (Click to change)';
}

function accessReadStatus() {
    readStatus = document.getElementsByClassName('read');
    for (let i=0; i<readStatus.length; i++) {
        readStatus[i].addEventListener('click', function () {
            myLibrary[i].hasBeenRead = !myLibrary[i].hasBeenRead;
            displayBooks();
        });
    }
}

// Creats the books again through the Book object after pulling from localStorage
function retrieveBooksFromStorage() {
    if (!localStorage.length) return;
    let retrievedBooks = localStorage.getObject('books');
    for (let i=0; i<retrievedBooks.length; i++) {
        myLibrary.push(new Book(retrievedBooks[i].title, retrievedBooks[i].author, retrievedBooks[i].pages, retrievedBooks[i].hasBeenRead));
    }
}

displayBooks();