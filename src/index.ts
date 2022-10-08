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
//백과 프론트 간 통신에서 cors error를 방지해줌
app.use(cors())
//cookie 값을 가져올 수 있음
app.use(cookieParser())
//passport 초기화 모듈
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
