function Main(){

    myBook = new Book("The Hobbit", "J.R.R Tolkien", 350, true);
    myBook2 = new Book("Harry Potter", "J.K. Rowling", 350, false);
    myBook3 = new Book("Goodbye, things", "Fumio Sasaki", "253", true);

    myLibrary.push(myBook);
    myLibrary.push(myBook2);
    myLibrary.push(myBook3);
    init(myLibrary);

}

//Create book class and constructor
class Book{
    static numBooks = 0;
    constructor(name, author, numPages, isRead){
        this.name = name;
        this.author = author;
        this.numPages = numPages;
        this.isRead = isRead;
        Book.numBooks += 1;
        this.index = Book.numBooks;
    }

    switchReadStatus(newStatus){
        if(this.isRead != newStatus){
            this.isRead = newStatus;
        }
    }

}

//Add books to library array
function addBookToLibrary(){
    //book = {name:"harry", author:"potter", numPages:50, isRead:true}
    
    bookName = document.getElementById("bookNameField").value;
    bookAuthor = document.getElementById("authorNameField").value;
    bookNumPages = document.getElementById("numPagesField").value;
    bookIsRead = document.getElementById("isReadField").checked;

    let book = new Book(bookName, bookAuthor, bookNumPages, bookIsRead);
    myLibrary.push(book);
    addCard(book);
}

function addButtonHandler(){
    if(validateForm()){
        addBookToLibrary()
        console.log(validateForm());
    }
}

//Init function that displays books in the array
function init(myLibrary){
    myLibrary.forEach(element => {
        addCard(element);
    });
    console.log(myLibrary)
}

//Add card and display
function addCard(book){
    //Create elements to be displayed
    const card = document.createElement("div");
    card.className = "card";
    //card.id = "card"+book.index;
    card.id = `card${book.index}`;

    const name = document.createElement("h2");


    const authorAndFieldsBox = document.createElement("div");
    const authorAndPages = document.createElement("span");
    const isReadBox = document.createElement("input");
    isReadBox.type = "checkbox";
    isReadBox.id = `chkbox${book.index}`;
    isReadBox.onclick = isReadCheckboxHandler;

    const removeButton = document.createElement("button");
    removeButton.innerText = "Remove";
    removeButton.className = "btn";
    removeButton.id = book.index;
    removeButton.onclick = removeButtonHandler;

    const space = document.createElement("br");
    //space.id = "break"+book.index;
    space.id = `break${book.index}`;

    //Assign values to elements
    name.innerText = book.name;

    //authorAndPages.innerText = "By "+book.author+", "+book.numPages+" pages, is read:";
    authorAndPages.innerText = `By ${book.author}, ${book.numPages} pages, is read:`;
    isReadBox.checked = book.isRead;
    

    //Organize elements by hierarchy

    authorAndFieldsBox.append(authorAndPages);
    authorAndFieldsBox.append(isReadBox);
    authorAndFieldsBox.append(removeButton);

    
    card.append(name);
    card.append(authorAndFieldsBox);

    //Display card

    let cardContainer = document.getElementById("bookContainer");
    cardContainer.append(space);
    cardContainer.append(card);
    
}

function removeButtonHandler(){
    let index = this.id;//This is the book ID found in the book.index property
    let card = document.querySelector(`#card${index}`);
    let space = document.querySelector(`#break${index}`);
    card.remove();
    space.remove();
    removeBookFromLibrary(index);

    console.log(myLibrary);
}

//let button = document.getElementById("addButton");
//button.onclick = addBookToLibrary;

function removeBookFromLibrary(bookId){
    let idInArray;
    myLibrary.forEach(book => {
        if(book.index == bookId){
            idInArray = myLibrary.indexOf(book);
        }
    });
    myLibrary.splice(idInArray,1);
}

function isReadCheckboxHandler(){
    let checkboxId = this.id;
    checkboxId = checkboxId.slice(6,checkboxId.length)//This is the id of the checkbox
    
    let idInArray;

    myLibrary.forEach(book => {
        if(book.index == checkboxId){
            idInArray = myLibrary.indexOf(book);
        }
    });
    
    myLibrary[idInArray].switchReadStatus(this.checked);

    console.log(checkboxId);
    console.log(myLibrary[idInArray])
    console.log(`status changed to ${this.checked}`);
    console.log(myLibrary);
}

function validateForm() {
    let a = document.querySelectorAll(".form-input");
    let checkboxIsChecked = document.getElementById("isReadField").checked;
    let textboxAreFilled=true;
    a.forEach(textbox => {
        if (textbox.value == null || textbox.value==""){
            textboxAreFilled=false;
        }
    });

    if (textboxAreFilled && checkboxIsChecked) {
      return true;
    }else{
        return false;
    }
}

//Create library array
var myLibrary = [];
Main();