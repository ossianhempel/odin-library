

let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
        return `${title} by ${author}, ${pages}, ${read}`;
    }
}

book1 = new Book('Project Hail Mary', 'Andy Weir', 320, 'Not read');
book2 = new Book('Frankenstein', 'Mary Shelley', 225, 'Read');
book3 = new Book('Foundation', 'Isaac Asimov', 556, 'Not read');

function addBookToLibrary(book) {
    this.book = book
    myLibrary.push(book)
}

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);


dataRow = document.querySelector('.first-data-row');
// bookCell1 = document.createElement('td');
// bookCell2 = document.createElement('td');
// bookCell1.textContent = "New book";
// bookCell2.textContent = "Another book";

// dataRow.appendChild(bookCell1);
// dataRow.appendChild(bookCell2);

function printLibrary(aLibrary) {
    aLibrary.forEach(book => {
        let currentBook = book.title;
        // console.log(currentBook);
        bookCell = document.createElement('td');
        dataRow.appendChild(bookCell);
        bookCell.textContent = currentBook;
        
    });
        
        


    // for(let i = 0; i <= aLibrary.length; i++) {
    //     console.log(i.title);
        // let currentBook = aLibrary[i].title;
        // console.log(currentBook);
        // console.log(currentBook.title);
        
        
}



printLibrary(myLibrary);