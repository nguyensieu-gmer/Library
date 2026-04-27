class Book {
  constructor(id, title, author, pages, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  switchStatus() {
    this.read = !this.read;
  }

  getBookObject() {
    return {
      id: this.id,
      title: this.title,
      author: this.author,
      pages: this.pages,
      read: this.read,
    };
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    this.books.push(book);
  }

  removeBook(id) {
    this.books = this.books.filter((book) => book.id !== id);
  }

  getBook(id) {
    return this.books.find((book) => book.id === id);
  }

  getLibrary() {
    return this.books.map((book) => book.getBookObject());
  }

  setLibrary(books) {
    this.books = [];
    books.forEach((item) => {
      const book = new Book(
        item.id,
        item.title,
        item.author,
        item.pages,
        item.read,
      );
      this.books.push(book);
    });
  }
}

class viewLibrary {
  constructor(container) {
    this.container = container;
  }

  makeBookDivItem(book) {
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
    h3Pages.textContent = book.pages + "";
    div.append(h3Pages);

    let statusBtn = document.createElement("button");
    statusBtn.classList.add("read_status");
    if (!book.read) {
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

    return div;
  }

  render(books) {
    this.container.innerHTML = "";
    books.forEach((book) => {
      this.container.appendChild(this.makeBookDivItem(book));
    });
  }
}

class AppController {
  constructor() {
    this.library = new Library();
    this.localStorageKey = "library";

    this.booksElement = document.querySelector(".books");
    this.view = new viewLibrary(this.booksElement);

    this.form = document.querySelector("#add_dialog form");
    this.dialog = document.getElementById("add_dialog");
    this.addBtn = document.getElementById("add_book");

    this.init();
  }

  renderLibrary() {
    const data = JSON.parse(localStorage.getItem(this.localStorageKey)) || []; // null || []
    this.library.setLibrary(data);
    this.view.render(this.library.books);
  }

  save() {
    localStorage.setItem(
      this.localStorageKey,
      JSON.stringify(this.library.getLibrary()),
    );
  }

  init() {
    this.renderLibrary();

    this.addBtn.addEventListener("click", (e) => this.dialog.showModal());
    this.form.addEventListener("submit", (e) => this.handleAddBook(e));
    this.booksElement.addEventListener("click", (e) =>
      this.handleClickEvent(e),
    );
  }

  handleAddBook(e) {
    if (e.submitter.value === "cancel") return;

    const title = this.form.elements["title"].value.trim() || "No title";
    const author = this.form.elements["author"].value.trim() || "No author";
    const pages = this.form.elements["pages"].value.trim() || "0";
    const read = this.form.elements["read"].checked;
    const id = crypto.randomUUID();

    const book = new Book(id, title, author, pages, read);
    this.library.addBook(book);

    this.save();
    this.renderLibrary();
    this.dialog.close();
    this.form.reset();
  }

  handleClickEvent(e) {
    const read_status = e.target.closest(".read_status");
    const remove = e.target.closest(".remove");

    if (read_status) {
      const id = read_status.closest(".book_style").dataset.id;
      let book = this.library.getBook(id);
      book.switchStatus();

      this.save();
      this.renderLibrary();
      return;
    }

    if (remove) {
      const id = remove.closest(".book_style").dataset.id;
      this.library.removeBook(id);

      this.save();
      this.renderLibrary();
      return;
    }
  }
}

new AppController();
