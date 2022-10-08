const router = require("express").Router()
const ctrl = require("./user.service")

//회원가입(22.10.04 test)
router.post("/signup", ctrl.processing.signup)
//이메일 중복 확인(22.10.05 test)
router.get("/overlap/email", ctrl.processing.check)
//이메일 인증(22.10.05 test)
router.get("/auth/email", ctrl.processing.auth)
//인증 이메일 발송(22.10.04 test)
router.get("/auth/email/send", ctrl.processing.send)
//로그인
// router.get("/login", ctrl.process.login)
// //정보 찾기
// router.post("/search/:type", ctrl.process.search)
// //정보 변경
// router.put("/change/:type", ctrl.process.change)

// router.delete("/delete", ctrl.process.delete)

router.get("/test", ctrl.processing.test)

module.exports = router
export {}