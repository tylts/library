const library = document.querySelector('.library');
const form = document.querySelector('.add-book-form');
const addBookBtn = document.querySelector('#add');
const cancelBtn = document.querySelector('#cancel');
const toggle = document.querySelector('.check-read');

const formTitle = document.querySelector('#title');
const formAuthor = document.querySelector('#author');
const formPages = document.querySelector('#pages');
const formRead = document.querySelector('#read-value');

addBookBtn.addEventListener('click', addBookToLibrary);
cancelBtn.addEventListener('click', closeForm);
toggle.addEventListener('click', function() {
    if (toggle.textContent.includes('This book has not been read.')) {
        toggle.textContent = 'This book has been read. (Click to change)';
    } else {
        toggle.textContent = 'This book has not been read. (Click to change)';
    }
})

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', false);
const twilight = new Book('Twilight', 'Stephanie Meyer', '544', true);

let myLibrary = [theHobbit, twilight];

function Book(title, author, pages, hasBeenRead) {
    this.title = title
    this.author = author
    this.pages = pages + ' pages'
    this.hasBeenRead = hasBeenRead
}

Book.prototype.info = function() {
    return `<h1>${this.title}</h1> <h2>by ${this.author}</h2> <p>${this.pages}</p> <span class='read'>${this.readStatus()}</span>`;
}

Book.prototype.readStatus = function() {
    return (this.hasBeenRead ? 'Read' : 'Unread')
}

function addBookToLibrary() {
    if (formTitle.value == "" || formAuthor.value == "" || formPages.value == "") {
        return;
    } else {

    let title = formTitle.value;
    let author = formAuthor.value;
    let pages = formPages.value;
    let hasBeenRead = checkRead();

    myLibrary.push(new Book(title, author, pages, hasBeenRead));
    displayBooks();
    clearInputs();
    document.getElementById('form-pop-up').style.display = 'none';
    }
}

function checkRead() {
    if (toggle.textContent.includes('This book has not been read.')) {
        return false;
    } else {
        return true;
    }
}

function displayBooks() {
    while (library.firstChild) {
        library.removeChild(library.firstChild)
    }
    for (let i=0; i<myLibrary.length; i++) {
        bookCard = document.createElement('div');
        bookCard.classList.add('book');
        library.appendChild(bookCard);
        addXToBook(i);
        bookCard.innerHTML += myLibrary[i].info();

        //removes books by clicking the X
        allBookX[i].addEventListener('click', function(){
            myLibrary.splice(i, 1);
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

function addXToBook(i){
    bookX = document.createElement('span');
    bookX.classList.add('book-x');
    bookX.textContent = '✕';
    bookCard.appendChild(bookX);
    allBookX = document.getElementsByClassName('book-x');
    bookCard.addEventListener('mouseover', function() {
        allBookX[i].style.opacity = '100%';
    })
    bookCard.addEventListener('mouseleave', function() {
        allBookX[i].style.opacity = '0';
    })
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

displayBooks();