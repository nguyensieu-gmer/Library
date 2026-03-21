const btnaddBook = document.getElementById("add_book");
const dialogadd = document.getElementById("add_dialog");
const books = document.querySelector(".books");
const form = dialogadd.querySelector("form");


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

    console.log(title, author, pages, read);

    dialogadd.close();
})

