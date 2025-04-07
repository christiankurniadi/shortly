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
    errorMessage.textContent = error.message
    errorMessage.style.display = "block"
  }
})

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("copyBtn")) {
    const copyLink = event.target.dataset.link
    navigator.clipboard.writeText(copyLink)
  }
})

// Use concise arrow function syntax
// const getShortlink = async (keyword) => {
//   const response = await fetch(
//     `https://api.shrtco.de/v2/shorten?url=${keyword}`
//   )
//   const data = await response.json()
//   return data.result
// }

const getShortlink = async (keyword) => {
  const trimmedUrl = keyword.trim()
  const formData = new URLSearchParams()
  formData.append("url", trimmedUrl)

  // const response = await fetch("https://cleanuri.com/api/v1/shorten", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/x-www-form-urlencoded",
  //   },
  //   body: formData.toString(),
  // })

  // const data = await response.json()

  const response = await fetch("http://localhost:3000/shorten", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: keyword }),
  })
  const data = await response.json()

  if (data.error) {
    throw new Error(data.error)
  }

  // Return in the same structure your UI expects
  return {
    original_link: trimmedUrl,
    full_short_link: data.result_url,
  }
}

// const createShortenedLink = (linkData) => `
//   <div class="shortened-link-wrapper">
//     <p class="longVersion">${linkData.original_link}</p>
//     <div class="link-wrapper">
//       <a href="${linkData.full_short_link}" target="_blank" class="shortlink">${linkData.short_link}</a>
//       <button class="copyBtn" data-link="${linkData.full_short_link}">Copy</button>
//     </div>
//   </div>
// `

const createShortenedLink = (linkData) => `
  <div class="shortened-link-wrapper">
    <p class="longVersion">${linkData.original_link}</p>
    <div class="link-wrapper">
      <a href="${linkData.full_short_link}" target="_blank" class="shortlink">${linkData.full_short_link}</a>
      <button class="copyBtn" data-link="${linkData.full_short_link}">Copy</button>
    </div>
  </div>
`
