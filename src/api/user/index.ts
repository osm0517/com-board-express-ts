const router = require("express").Router()
const userService = require("./user.service")

router.get("/", userService.test)

module.exports = router
export {}
