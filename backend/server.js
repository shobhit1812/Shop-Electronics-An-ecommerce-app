const express = require("express")
const cors = require("cors")
const app = express()
const http = require("http")
require("dotenv").config()
const stripe = require("stripe")(process.env.STRIPE_SECRET)
require("./connection")
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server, {
  cors: "http://localhost:3001",
  methods: ["GET", "POST", "PATCH", "DELETE"],
})
const PORT = process.env.PORT

const User = require("./models/User")
const userRoutes = require("./routes/userRoutes")
const productRoutes = require("./routes/productRoutes")
const orderRoutes = require("./routes/orderRoutes")
const imageRoutes = require("./routes/imageRoutes")

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use("/users", userRoutes)
app.use("/products", productRoutes)
app.use("/orders", orderRoutes)
app.use("/images", imageRoutes)

app.post("/api.stripe.com'/create-payment", async (req, res) => {
  const { amount } = req.body
  console.log(amount)
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "inr",
      payment_method_types: ["card"],
      description: "For testing",
    })
    res.status(200).json(paymentIntent)
  } catch (e) {
    console.log("Error aagaya", e.message)
    res.status(400).json(e.message)
  }
})

app.get("/", (req, res) => {
  res.send("WORKING")
})

server.listen(PORT, () => {
  console.log(`Server is working on http://localhost:${PORT}`)
})

app.set("socketio", io)
