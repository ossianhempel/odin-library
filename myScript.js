

let myLibrary = [];

function Book(title, author, pages, status) {
    this.title = title
    this.author = author
    this.pages = pages
    this.status = status
    this.info = function() {
        return `${title} by ${author}, ${pages}, ${status}`;
    }
}


function addLocalStorage() {
    // localStorage.setItem(
    // 'library', 
    // JSON.stringify(
    //    [ {
    //         title: "Project Hail Mary",
    //         author: "Andy Weir", 
    //         pages: 320,
    //         status: "Not read"
    //     },
    //     {
    //         title: "Frankenstein",
    //         author: "Mary Shelley", 
    //         pages: 225,
    //         status: "Read"
    //     }]
    // ))
    myLibrary = JSON.parse(localStorage.getItem('library')) || [];
    saveAndRenderBooks();
};

// The objective is to get these created through the form instead!
book1 = new Book('Project Hail Mary', 'Andy Weir', 320, 'Not read');
book2 = new Book('Frankenstein', 'Mary Shelley', 225, 'Read');
book3 = new Book('Foundation', 'Isaac Asimov', 556, 'Not read');

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
    saveAndRenderBooks();
 
}

// addBookToLibrary(book1, book2, book3);

cardContainer = document.querySelector('.card-container');


function renderCard(book) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.textContent = book.title;
    cardContainer.appendChild(card);
};

function saveAndRenderBooks() {
    localStorage.setItem('library', JSON.stringify(myLibrary));
    myLibrary.forEach(book => {
        renderCard(book);
    });   
};


const modal = document.querySelector('#modal');
const addBookButton = document.querySelector('.add-book-button');
const modalClose = document.querySelector(".modal-close");

addBookButton.addEventListener('click', () =>{
    modal.style.display = "block";
});

modalClose.addEventListener('click', () => {
    modal.style.display = "none";
});

window.addEventListener('click', function(e) {
    if (e.target == modal) {
        modal.style.display = "none";
    };
});

const addBookForm = document.querySelector('.add-book-form');
addBookForm.addEventListener('submit', (e) => {
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
        newBook['book-read'] = false
    }
    addBookToLibrary(newBook['book-title'], newBook['book-author'], newBook['book-pages'], newBook['book-read']);
});


addLocalStorage();
localStorage.clear();






