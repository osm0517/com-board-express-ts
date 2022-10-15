import { Request, Response } from "express";
import { Board } from '../../models/domain/Board';
import { Scrap } from '../../models/domain/Scrap';


const process = {
    create : async (req : Request, res : Response) => {
        const boardId:number = Number(req.params.board_id);
        //차후에 passport를 완벽하게 구현 후에 유저 아이디를 넣음
        //넣어야하는 값은 user table에 본인 pk값을 넣음
        const userId:number = 1;
        try {
            const createScrap = await Scrap.findCreateFind({
                where : {
                    userId : userId,
                    boardId : boardId
                }
            });
            if(!createScrap) return res.status(400).json({ message : "db에 정상적으로 저장하지 못함" });
            res.status(200).json({ message : "db에 정상적으로 데이터가 저장됨" })
        } catch (err) {
            res.status(400).json({ message : `create scrap을 진행하는 중 catch에 걸림 => ${err}` });
        }
        
    },
    delete : async (req : Request, res : Response) => {
        const boardId:number = Number(req.params.board_id);
        //차후에 passport를 완벽하게 구현 후에 유저 아이디를 넣음
        //넣어야하는 값은 user table에 본인 pk값을 넣음
        const userId:number = 1;
        try {
            const deleteScrap = await Scrap.destroy({
                where : {
                    userId : userId,
                    boardId : boardId
                }
            });
            if(!deleteScrap) return res.status(400).json({ message : "db에 데이터를 지우지 못함" });
            res.status(200).json({ message : "db에서 데이터를 정상적으로 지움" });
        } catch (err) {
            res.status(400).json({ message : "delete scrap을 진행하는 중 catch에 걸림" });
        }
    },
    read : async (req : Request, res : Response) => {
        const boardId:number = Number(req.params.board_id);

        try {
            const scrapNumber = await Scrap.count({
                where : { boardId : boardId }
            });
            if(!scrapNumber) return res.status(400).json({ message : "db에서 데이터를 가져오지 못함" });
            res.status(200).json(scrapNumber);
        } catch (err) {
            res.status(400).json({ message : "scrapNumber read를 진행하는 중 catch에 걸림" });
        }
    },
    list : async (req : Request, res : Response) => {
        const userId:number = Number(req.params.user_id);
        const scrapList = await Scrap.findAll({
            where : { userId : userId }
        });
        if(!scrapList) return res.status(400).json({ message : "db에서 데이터를 가져오지 못함" });
        res.status(200).json(scrapList);
    },
}

module.exports = {
    process,

}