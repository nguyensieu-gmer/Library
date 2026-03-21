const btnaddBook = document.getElementById("add_book");
const dialogadd = document.getElementById("add_dialog");

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