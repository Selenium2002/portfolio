// Book Class: Represents a Book
class Book{
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    } 
}


// UI Class: Handles UI Tasks
class UI {
    static displayBooks(){
        const books = Store.getBooks();

        books.forEach(book => UI.addBookToList(book))
    }
    static addBookToList(book) {
        const list = document.querySelector("#bookList");
        const row = document.createElement("tr");

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
        list.appendChild(row);
    }

    static deleteBook(el) {
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const division = document.createElement("div");
        division.className = `alert alert-${className}`;
        division.appendChild(document.createTextNode(message));
        const containerDiv = document.querySelector(".container");
        const formElement = document.querySelector("#bookForm");
        containerDiv.insertBefore(division, formElement);

        // Vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000)
    }

    static clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}


// Store Class: Handles Storage
class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();
        books.forEach((book, index) => {
            if(book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}


// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks)

// Event: Add a Book
const addBook = document.querySelector("#bookForm");

addBook.addEventListener('submit', e => {
    // Prevent Actual Submit
    e.preventDefault(); 

    // Get Form Values 
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    // Validate
    if(title === '' || author === '' || isbn === '') {
        UI.showAlert('Please fill in all fields', 'danger');
    }else{
        // Instantiate a Book
        const book = new Book(title, author, isbn);
    
        // Add a Book to UI
        UI.addBookToList(book);

        // Add a Book to Store
        Store.addBook(book);

        // Show Success Message
        UI.showAlert('Book Added', 'success');
        
        // Clear Fields
        UI.clearFields();
    }
    
})


// Event: Remove a Book 
const removeBook = document.querySelector('#bookList');

removeBook.addEventListener('click', e => {
    // Remove a Book From UI
    UI.deleteBook(e.target);

    // Remove a Book From Store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // Remove info Message
    UI.showAlert('Book Removed', 'info')
    
})
