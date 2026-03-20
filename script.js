const BtnaddBook = document.getElementById("add_book");
const Dialogadd = document.getElementById("add_dialog");

BtnaddBook.addEventListener("click", (e) => {
    e.preventDefault();

    Dialogadd.showModal();
});