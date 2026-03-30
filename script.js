class Book{
    constructor(title, author, pages, read){
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    switchStatus(){
        this.read = !(this.read);
    }
}

function screenControler(){
    const btnaddBook = document.getElementById("add_book");
    const dialogadd = document.getElementById("add_dialog"); // dialogadd
    const books = document.querySelector(".books"); // screen controler books remove button
    const form = dialogadd.querySelector("form");

    let myLibrary = [];

    function addBookToLibrary(title, author, pages, read) {
        let book = new Book(title, author, pages, read);
        myLibrary.push(book);
    }

    function booksListener(e){
        if (e.target.classList.contains("remove")){
            let id = e.target.parentNode.dataset.id;
            
            myLibrary = myLibrary.filter(book => book.id !== id); // change myLibrary 
            displayBooks();
        }
        if (e.target.classList.contains("read_status")){
            let id = e.target.parentNode.dataset.id;
            
            let removeEle = myLibrary.find(book => book.id === id); // change myLibrary 

            removeEle.switchStatus();
            if (removeEle.read){
                e.target.classList.remove("not_read");
                e.target.textContent = "read";
            } else {
                e.target.classList.add("not_read");
                e.target.textContent = "not read";
            }
        }
    }

    // screen controler books 
    books.addEventListener("click", booksListener);

    function displayBooks(){
        books.innerHTML = "";

        for (let book of myLibrary){ // change myLibrary
            let div = document.createElement("div");
            div.classList.add("book_style");
            div.setAttribute("data-id", book.id);

            let h2Title = document.createElement("h2");
            h2Title.textContent = book.title;
            div.appendChild(h2Title);

            let h3Author = document.createElement("h3");
            h3Author.textContent = book.author;
            div.appendChild(h3Author);

            let h3Pages = document.createElement("h3");
            h3Pages.textContent = book.pages + '';
            div.append(h3Pages);

            let statusBtn = document.createElement("button");
            statusBtn.classList.add("read_status")
            if (!book.read){
                statusBtn.classList.add("not_read");
                statusBtn.textContent = "not read";
            } else {
                statusBtn.textContent = "read";
            }
            div.appendChild(statusBtn);

            let removeBtn = document.createElement("button");
            removeBtn.classList.add("remove");
            removeBtn.textContent = "remove";
            div.appendChild(removeBtn);

            books.appendChild(div);
        }
    }

    // dialog
    btnaddBook.addEventListener("click", (e) => {
        e.preventDefault();

        dialogadd.showModal();
    });

    dialogadd.addEventListener("click", e => { // dialogadd
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

        let title = !document.getElementById("title").value ? "No title" : document.getElementById("title").value;
        let author = !document.getElementById("author").value ? "No author" : document.getElementById("author").value;
        let pages = !document.getElementById("pages").value ? "0" : document.getElementById("pages").value;
        let read =  !document.getElementById("read").checked;

        addBookToLibrary(title, author, pages, read); // addBookToLibrary will myLibraby class function

        displayBooks();

        dialogadd.close();
    })
}

screenControler();