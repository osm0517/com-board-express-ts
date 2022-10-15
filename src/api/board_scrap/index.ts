const router = require("express").Router()
const ctrl = require("./controller")

//스크랩 생성
router.post("/:board_id", ctrl.process.create);
//스크랩 취소
router.delete("/:board_id", ctrl.process.delete);
//스크랩 개수 조회
router.get("/:board_id", ctrl.process.read);
//스크랩 목록 조회
router.get("/:user_id/list", ctrl.process.list);


module.exports = router
export {}