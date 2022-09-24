import express from "express"
import sequelize from "./models"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(cookieParser())

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
