// Cache frequently used DOM elements
const btnHamburger = document.querySelector("#btnHamburger")
const header = document.querySelector(".header")
const overlay = document.querySelector(".header__overlay")
const body = document.body
const shortenBtn = document.querySelector(".shortenBtn")
const inputKeyword = document.querySelector(".input-keyword")
const errorMessage = document.querySelector(".error_message")
const shortenedDiv = document.querySelector(".shortened")

// Add event listeners using arrow functions
btnHamburger.addEventListener("click", () => {
  header.classList.toggle("open")
  overlay.classList.toggle("fade-in")
  overlay.classList.toggle("fade-out", !overlay.classList.contains("fade-in"))
  body.classList.toggle("noscroll", header.classList.contains("open"))
})

shortenBtn.addEventListener("click", async () => {
  try {
    if (!inputKeyword.value) {
      inputKeyword.classList.add("error")
      errorMessage.textContent = "Please add a link"
      errorMessage.style.display = "block"
      inputKeyword.style.color = "#f46262"
      shortenBtn.classList.add("mt")
    } else {
      inputKeyword.classList.remove("error")
      errorMessage.textContent = ""
      inputKeyword.style.color = "hsl(257, 7%, 63%)"
      shortenBtn.classList.remove("mt")
      const shortlink = await getShortlink(inputKeyword.value)
      const shortenedLink = createShortenedLink(shortlink)
      shortenedDiv.insertAdjacentHTML("beforeend", shortenedLink)
    }
  } catch (error) {
    console.error(error)
  }
})

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("copyBtn")) {
    const copyLink = event.target.dataset.link
    navigator.clipboard.writeText(copyLink)
  }
})

// Use concise arrow function syntax
const getShortlink = async (keyword) => {
  const response = await fetch(
    `https://api.shrtco.de/v2/shorten?url=${keyword}`
  )
  const data = await response.json()
  return data.result
}

const createShortenedLink = (linkData) => `
  <div class="shortened-link-wrapper">
    <p class="longVersion">${linkData.original_link}</p>
    <div class="link-wrapper">
      <a href="${linkData.full_short_link}" target="_blank" class="shortlink">${linkData.short_link}</a>
      <button class="copyBtn" data-link="${linkData.full_short_link}">Copy</button>
    </div>
  </div>
`
