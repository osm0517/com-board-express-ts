const router = require("express").Router()
const ctrl = require("./user.service")

//회원가입
router.post("/signup", ctrl.processing.signup)
//이메일 중복 확인
router.get("/overlap/email", ctrl.processing.check)
//이메일 인증
router.get("/auth/email", ctrl.processing.auth)
//인증 이메일 발송
router.get("/auth/email/send", ctrl.processing.send)
//로그인
// router.post("/login", ctrl.process.login)
// //정보 찾기
// router.post("/search/:type", ctrl.process.search)
// //정보 변경
// router.put("/change/:type", ctrl.process.change)

// router.delete("/delete", ctrl.process.delete)

// router.post("/test", ctrl.process.test)

module.exports = router
export {}