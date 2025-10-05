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
        const storedBooks = [
            {
                title: 'Book One',
                author: 'Ismail Khalifa',
                isbn: '304050'
            },
            {
                title: 'Book Two',
                author: 'Ahmed Mohammed',
                isbn: '097825'
            },
            {
                title: 'Book Three',
                author: 'Noor Ibrahim',
                isbn: '028472'
            }
        ];
        const books = storedBooks;
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

        // Show Success Message
        UI.showAlert('Book Added', 'success');
        
        // Clear Fields
        UI.clearFields();
    }
    
})


// Event: Remove a Book 
const removeBook = document.querySelector('#bookList');

removeBook.addEventListener('click', e => {
    UI.deleteBook(e.target);

    // Remove 
    UI.showAlert('Book Removed', 'info')
    
})
