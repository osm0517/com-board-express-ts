const router = require("express").Router()

// router.use("/user", require("./user"))
router.use("/board", require("./board"))
router.use("/comment", require("./comment"))
router.use("/count", require("./board_count"))
router.use("/scrap", require("./board_scrap"))

module.exports = router
export {}
