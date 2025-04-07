import express from "express"
import fetch from "node-fetch"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"

const app = express()
const PORT = process.env.PORT || 3000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Enable CORS and body parsing
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve static files
app.use("/js", express.static(path.join(__dirname, "app/js")))
app.use("/scss", express.static(path.join(__dirname, "app/scss")))
app.use("/dist", express.static(path.join(__dirname, "dist")))
app.use("/images", express.static(path.join(__dirname, "images")))

// Serve index.html on root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"))
})

// Proxy endpoint
app.post("/shorten", async (req, res) => {
  try {
    const { url } = req.body
    const params = new URLSearchParams()
    params.append("url", url.trim())

    const response = await fetch("https://cleanuri.com/api/v1/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    })

    const data = await response.json()
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: "Proxy error" })
  }
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
