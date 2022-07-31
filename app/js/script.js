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

shorten.addEventListener("click", async function () {
  const inputKeyword = document.querySelector(".input-keyword")
  const shortlink = await getShortlink(inputKeyword.value)
  console.log(shortlink)
  updateUI(shortlink)
})

function getShortlink(keyword) {
  return fetch("https://api.shrtco.de/v2/shorten?url=" + keyword)
    .then((response) => response.json())
    .then((response) => response.result)
}

function updateUI(m) {
  const shortenedLink = showDiv(m)
  const shortenedDiv = document.querySelector(".shortened")
  shortenedDiv.innerHTML += shortenedLink
}

function showDiv(m) {
  return `<div class="shortened-link-wrapper">
            <a href="${m.original_link}" target="_blank" class="longVersion">${m.original_link}</a>
            <a href="${m.full_short_link}" target="_blank" class="shortlink">${m.full_short_link}</a>
          </div>
          `
}
