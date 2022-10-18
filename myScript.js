// main div holding all the books/cards
const cardContainer = document.querySelector('.card-container')
const addBookButton = document.querySelector('.add-book-button');
const modal = document.querySelector('#modal');
const modalClose = document.querySelector(".modal-close");

window.addEventListener('click', function(e) {
    if (e.target == modal) {
        modal.style.display = "none";
    };
});

modalClose.addEventListener('click', () => {
    modal.style.display = "none";
});

addBookButton.addEventListener('click', () =>{
    modal.style.display = "block";
    document.querySelector('.form-title').textContent = "Add Book";
    document.querySelector('.form-add-button').textContent = "Add";
});





function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.id = Math.floor(Math.random() * 1000000);
};

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
    renderCards();
};

const addBookForm = document.querySelector('.add-book-form');
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const data = new FormData(e.target);
    let newBook = {}
    for(let [name,value] of data) {
        if(name === 'book-read') {
            newBook["book-read"] = true; 
        } else {
            newBook[name] = value || "";
        }
    }
    if(!newBook['book-read']) {
        newBook['book-read'] = false;
    } 
    // pushes a book to the library
    if(document.querySelector('.form-title').textContent === "Edit Book") {
        let id = e.target.id;
        let editBook = myLibrary.filter((book) => book.id == id)[0];
        editBook.title = newBook['book-title'];
        editBook.author = newBook['book-author'];
        editBook.pages = newBook['book-pages'];
        editBook.read = newBook['book-read'];
        renderCards();
    } else {
        addBookToLibrary(
            newBook["book-title"],
            newBook["book-author"],
            newBook["book-pages"],
            newBook["book-read"]
        );
    }; 
    addBookForm.reset();
    modal.style.display="none";
});

let myLibrary = [];


// helper function to create html elements with textcontent and classes
function createCardElement(el, content, className) {
    const element = document.createElement(el);
    element.textContent = content;
    element.setAttribute('class', className);
    return element;
};

// helper function to create an input checkbox for if book is read with event listener
function createReadElement(cardItem, book) {
    const read = document.createElement('div');
    read.setAttribute('class', 'book-read');
    read.appendChild(createCardElement("h1", "Read?", "book-read-title"));
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.addEventListener('click', (e) => {
        if(e.target.checked) {
            cardItem.setAttribute('class', 'card book read-checked');
            book.read = true;
            renderCards();
        } else {
            cardItem.setAttribute('class', 'card book read-unchecked');
            book.read = false;
            renderCards();
        }
    });
    if(book.read) {
        input.checked = true;
        cardItem.setAttribute("class", "card book read-checked")
    }
    read.appendChild(input);
    return read;
};

function editBook(book) {
    modal.style.display = 'block';
    document.querySelector(".form-title").textContent = "Edit Book";
    document.querySelector('.form-add-button').textContent = "Edit";
    document.querySelector('.add-book-form').setAttribute('id', book.id);
    document.querySelector('#book-title').value = book.title || "";
    document.querySelector('#book-author').value = book.title || "";
    document.querySelector('#book-pages').value = book.title || "";
    document.querySelector('#book-read').checked = book.read;
}

function createEditButton(book) {
    const editButton = document.createElement("button");
    editButton.setAttribute("class", "edit-button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => {
        editBook(book);
    });
    return editButton;
};

function deleteBook(index) {
    myLibrary.splice(index, 1);
    renderCards();
}

// function to create all of the book content 
function createCardItem(book, index) {
    const cardItem = document.createElement('div');
    cardItem.setAttribute('id', index);
    cardItem.setAttribute('key', index);
    cardItem.setAttribute('class', 'card book');
    cardItem.appendChild(
        createCardElement("h1", `Title: ${book.title}`, 'book-title')
    );
    cardItem.appendChild(
        createCardElement("h1", `Author: ${book.author}`, 'book-author')
    );
    cardItem.appendChild(
        createCardElement("h1", `Pages: ${book.pages}`, 'book-pages')
    );
    cardItem.appendChild(createReadElement(cardItem, book));    
    cardItem.appendChild(createCardElement("button", "X", "card-delete"));
    cardItem.appendChild(createEditButton(book));

    cardItem.querySelector('.card-delete').addEventListener('click', () => {
        deleteBook(index);
    })

    cardContainer.insertAdjacentElement("afterbegin", cardItem);
};

// render the cards 
function renderCards(book, index) {
    cardContainer.textContent = '';
    myLibrary.map((book, index) => {
        createCardItem(book, index);
    });
};

// render on page load
renderCards();










