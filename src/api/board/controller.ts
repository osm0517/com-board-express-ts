import { Request, Response } from "express"
import { Board } from "../../models/domain/Board"
import { BoardText } from "../../models/domain/Board_text"
import {Op} from 'sequelize'
import { JsonObject } from "swagger-ui-express"

//입력값이 몇인지를 확인하고 계산해서 반환해줌
const pageOffset = (inputPage:number) => {
  return inputPage * 4;
};
//1페이지에 얼마나 표시해줄지를 정해줌
const pageLimit:number = 4;

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
  //파라미터 정보를 이용해서 원하는 정보만 보냄
  read : async (req:Request, res:Response) => {
    const {page} = req.params;
    //1페이지에 얼마나 들어갈지 설정
    const offset:any = 4;
    const v = parseInt(page)
    try {
      const boardData = await Board.findAll({
        //lt => op.lt : 4 => a < 4
        //gt는 반대
        //lte => op.lte : 4 => a <= 4
        //gte는 반대
        where : {
          [Op.and]:[
            {id : {[Op.gt] : (v-1)*offset}},
            {id : {[Op.lte] : v*offset}}
          ]
          
        }
      })
      if(!boardData) res.status(400).json({message : `db에서 데이터를 정상적으로 가져오지 못함`})
      res.status(200).json(boardData)
    } catch (err) {
      res.status(400).json({message : `read 중 catch에서 걸림${err}`})
    }
  },
  detail : async (req:Request, res:Response) => {
    const detail:any = req.query.detail;
    try {
      //본문을 가져오는 내용을 추가해야됨
      //exclude를 사용해서 설정
      //스크랩 횟수와 댓글 수 등은 아직 표현을 하지 못한 상태임
      const boardText = await Board.findOne({
        attributes : ["userid", "title"],
        include : [{model : BoardText, as: 'userBoardId', attributes :["boardtext"]}],
        where:{
        id : detail
      }});
      if(!boardText) return res.status(400).json({message : "db에서 정상적으로 데이터를 가져오지 못함"});
      res.status(200).json(boardText);
    } catch (err) {
      res.status(400).json({message : `catch문에서 걸림${err}`})
    }
  },
  search : async (req:Request, res:Response) => {
    //쿼리로 넘어온 값을 저장함
    const keyword:any = req.query.keyword;
    //해당 값에서 공백을 제외한 문자를 리스트로 저장
    const value:String[] = keyword.split(" ");
    //where절에서 사용할 오브젝트를 저장할 리스트
    let opValueList:JsonObject = []
    //공백을 제외한 값을 리시트에 저장함
    value.map(v => {
      opValueList.push({title : `%${v}%`})
      opValueList.push({text : `%${v}%`})
    })
    try {
      const searchResult = await Board.findAll({
        attributes : ["title", "id"],
        where : {
          [Op.or]: opValueList
        },
        limit : pageLimit,
        offset : pageOffset(pageLimit)
      })
      if(!searchResult) return res.status(400).json({ message : "db에서 정보를 가져오지 못함" })
      res.status(200).json({
        message : "db에서 정보를 정상적으로 가져옴",
        data : searchResult
    })
      console.log(searchResult)
    } catch (err) {
      res.status(400).json({ message : `search를 시행하는 중 err가 발생 ${err}`})
    }
  }

}

module.exports = {
  process,

}