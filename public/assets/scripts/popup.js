const saveButton = document.querySelector(".save-button");
const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".close-button");

saveButton.addEventListener("click", function () {
  popup.classList.remove("visually-hidden");
});

closeButton.addEventListener("click", function () {
  popup.classList.add("visually-hidden");
});
