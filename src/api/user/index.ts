const router = require("express").Router()
const ctrl = require("./user.service")

//회원가입
router.post("/signup", ctrl.process.signup)
//로그인
router.post("/login", ctrl.process.login)
//정보 찾기
router.post("/search/:type", ctrl.process.search)
//정보 변경
router.put("/change/:type", ctrl.process.change)
// //비밀번호찾기
// router.post("/search/pwd", ctrl.process.)
// //비밀번호변경
// router.put("/change/pwd", ctrl.process.)
// //닉네임변경
// router.put("/change/name", ctrl.process.)
//계정삭제
router.delete("/delete", ctrl.process.delete)

router.post("/test", ctrl.process.test)

module.exports = router
export {}