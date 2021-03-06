const btnHamburger = document.querySelector("#btnHamburger")
const header = document.querySelector(".header")
const overlay = document.querySelector(".header__overlay")
const body = document.querySelector("body")

btnHamburger.addEventListener("click", function () {
  header.classList.toggle("open")
  overlay.classList.toggle("fade-in")
  overlay.classList.toggle("fade-out", !overlay.classList.contains("fade-in"))
  // Overflow hidden
  //   if (header.classList.contains("open")) {
  //     body.classList.add("noscroll");
  //   } else {
  //     body.classList.remove("noscroll");
  //   }
})

const shorten = document.querySelector(".shortenBtn")
const feature = document.querySelector(".features__shortlink")
const shortened = document.createElement("a")

shorten.addEventListener("click", function () {
  const inputKeyword = document.querySelector(".input-keyword")
  fetch("https://api.shrtco.de/v2/shorten?url=" + inputKeyword.value)
    .then((response) => response.json())
    .then((data) => (shortened.innerHTML = data.result.full_short_link))

  setTimeout(function () {
    shortened.setAttribute("href", `${shortened.innerHTML}`)
    shortened.setAttribute("target", "_blank")
    feature.appendChild(shortened)
  }, 1000)
})
