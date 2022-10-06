import express from "express"
import sequelize from "./models"
import cors from "cors"
import cookieParser from "cookie-parser"
import YAML from "yamljs"
import path from "path"
import swaggerUi from "swagger-ui-express"
import passport from 'passport'

const app = express()

const PassportCofig = require('./utils/passport')
PassportCofig();

const swaggerSpec = YAML.load(
  path.join(__dirname, "./utils/swagger/openapi.yaml")
)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(cookieParser())
app.use(passport.initialize())

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
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
