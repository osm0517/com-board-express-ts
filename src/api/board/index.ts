const router = require("express").Router()
const ctrl = require("./controller")

// 글 등록
router.post("/write", ctrl.process.write);
//목록 중 클릭하여 상세보기
// router.get("/read/detail", ctrl.process.detail);
// //게시판 읽기
// router.get("/read/:page", ctrl.process.read);  



module.exports = router
export {}