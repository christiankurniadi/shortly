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
const errorMessage = document.querySelector(".error_message")
const inputKeyword = document.querySelector(".input-keyword")

shorten.addEventListener("click", async function () {
  try {
    if (inputKeyword.value == "") {
      inputKeyword.classList.add("error")
      errorMessage.innerHTML = "Please add a link"
      errorMessage.style.display = "block"
      inputKeyword.style.color = "#f46262"
      // shorten.style.marginTop = "0.8rem"
      shorten.classList.add('mt')
      // inputKeyword.style.marginBottom = "30px"
    } else {
      errorMessage.innerHTML = ""
      inputKeyword.classList.remove("error")
      shorten.classList.remove("mt")
      // inputKeyword.style.marginBottom = "15px"
      inputKeyword.style.color = "hsl(257, 7%, 63%)"
      const shortlink = await getShortlink(inputKeyword.value)
      updateUI(shortlink)
    }
  } catch (err) {
    console.log(err)
  }
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

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("copyBtn")) {
    const copyLink = e.target.dataset.link
    console.log(copyLink)
    navigator.clipboard.writeText(copyLink)
  }
})

function showDiv(m) {
  return `<div class="shortened-link-wrapper">
            <p  class="longVersion">${m.original_link}</p>
            <div class="link-wrapper">
            <a href="${m.full_short_link}" target="_blank" class="shortlink">${m.short_link}</a>
            <button class="copyBtn" data-link="${m.full_short_link}">Copy</button>
            </div>
          </div>
          `
}
