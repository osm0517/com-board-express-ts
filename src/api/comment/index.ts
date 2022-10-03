const router = require("express").Router()
const ctrl = require("./controller")

//댓글 생성
router.post("/:board_id", ctrl.process.write);
//댓글 수정
router.patch("/:comment_id", ctrl.process.patch);
//댓글 삭제
router.delete("/:comment_id", ctrl.process.delete);  
//댓글 리스트 조회
router.get("/:board_id", ctrl.process.read);  


module.exports = router
export {}