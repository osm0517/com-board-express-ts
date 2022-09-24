import express from "express"
import sequelize from "./models"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api", require("./api"))

const port = 8002
app.listen(port, async () => {
  console.log(`SERVER ON SUCCESS! PORT : ${port}`)
  await sequelize
    .authenticate()
    .then(async () => {
      console.log("DATABASE CONNECTION SUCCESS")
    })
    .catch((e) => {
      console.log(e)
    })
})
