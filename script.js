const btnaddBook = document.getElementById("add_book");
const dialogadd = document.getElementById("add_dialog");
const books = document.querySelector(".books");
const form = dialogadd.querySelector("form");

const myLibrary = [];


// book
function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.switchStatus = function(){
    this.read = !(this.read);
}

function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

function displayBooks(){
    for (let book of myLibrary){
        let div = document.createElement("div");
        div.classList.add("book_style");

        let h1Title = document.createElement("h1");
        h1Title.textContent = book.title;
        div.appendChild(h1Title);

        let h2Author = document.createElement("h2");
        h2Author.textContent = book.author;
        div.appendChild(h2Author);

        let h2Pages = document.createElement("h2");
        h2Pages.textContent = book.pages + '';
        div.append(h2Pages);

        let statusBtn = document.createElement("button");
        if (!book.read){
            statusBtn.classList.add("not_read");
            statusBtn.textContent = "Not read";
        } else {
            statusBtn.textContent = "Read";
        }
        div.appendChild(statusBtn);

        let removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        div.appendChild(removeBtn);

        books.appendChild(div);
    }
}

// dialog
btnaddBook.addEventListener("click", (e) => {
    e.preventDefault();

    dialogadd.showModal();
});

dialogadd.addEventListener("click", e => {
  const dialogDimensions = dialogadd.getBoundingClientRect()
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    dialogadd.close()
  }
})

form.addEventListener("submit", (e) => {
    let submitter = e.submitter;
    if (submitter.value === "cancel"){
        return;
    }

    e.preventDefault();

    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let read =  document.getElementById("read").checked;

    addBookToLibrary(title, author, pages, read);

    books.innerHTML = "";
    displayBooks();

    dialogadd.close();
})

// craft
// addBookToLibrary("a", "b", 12, false)
// console.log(myLibrary)
// displayBooks();
