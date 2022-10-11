import { Request, Response } from "express"
import { Board } from "../../models/domain/Board"
import { BoardText } from "../../models/domain/Board_text"
import {Op} from 'sequelize'

const process = {
  write : async (req:Request, res:Response) => {
    const {title, userId, categoryId, stackId, text} = req.body;
    try {
      const writeInfo = await Board.create({
        userId : userId,
        categoryId : categoryId,
        stackId : stackId,
        title: title,
      })
      if(!writeInfo) return res.status(400).json({message : `db에 정상적으로 게시물 정보가 생성되지 않음`})
      
      const writeText = await BoardText.create({
        boardText : text,
        boardId : writeInfo.id
      })
      if(!writeText) return res.status(400).json({message : `db에 정상적으로 게시물 내용이 생성되지 않음`})
      res.status(200).json({message : `db에 정상적으로 게시물 정보가 생성됨`})
    } catch (err) {
      res.status(400).json({msg : `write 중 catch에서 걸림${err}`})
    }
  },
//   //파라미터 정보를 이용해서 원하는 정보만 보냄
//   read : async (req:Request, res:Response) => {
//     const {page} = req.params;
//     //1페이지에 얼마나 들어갈지 설정
//     const offset:any = 4;
//     const v = parseInt(page)
//     try {
//       const boardData = await Board.findAll({
//         //lt => op.lt : 4 => a < 4
//         //gt는 반대
//         //lte => op.lte : 4 => a <= 4
//         //gte는 반대
//         where : {
//           [Op.and]:[
//             {idx : {[Op.gt] : (v-1)*offset}},
//             {idx : {[Op.lte] : v*offset}}
//           ]
          
//         }
//       })
//       res.status(200).json(boardData)
//     } catch (err) {
//       res.status(400).json({msg : "write 중 catch에서 걸림"})
//     }
//   },
//   detail : async (req:Request, res:Response) => {
//     const detail:any = req.query.detail;
//     try {
//       //본문을 가져오는 내용을 추가해야됨
//       //exclude를 사용해서 설정
//       const text = await Board.findAll({where:{
//         idx : detail
//     }});
//       console.log(detail);
//       res.status(200).json(text)
//     } catch (err) {
//       res.status(400).json("에러발생 => " + err)
//     }
//   }

}

module.exports = {
  process,

}