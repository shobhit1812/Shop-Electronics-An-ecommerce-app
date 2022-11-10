const mongoose = require("mongoose")

require("dotenv").config()

const connectionStr = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.ergpkid.mongodb.net/DigitalShop?retryWrites=true&w=majority`

mongoose
  .connect(connectionStr, { useNewUrlparser: true })
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log(err))

mongoose.connection.on("error", (err) => {
  console.log(err)
})
