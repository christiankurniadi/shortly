const btnHamburger = document.querySelector("#btnHamburger");
const header = document.querySelector(".header");
const overlay = document.querySelector(".header__overlay");
const body = document.querySelector("body");

btnHamburger.addEventListener("click", function () {
  header.classList.toggle("open");
  overlay.classList.toggle("fade-in");
  overlay.classList.toggle("fade-out", !overlay.classList.contains("fade-in"));
  // Overflow hidden
  //   if (header.classList.contains("open")) {
  //     body.classList.add("noscroll");
  //   } else {
  //     body.classList.remove("noscroll");
  //   }
});
