import {NextFunction, Request, Response} from "express";
import {jwtService} from "../../application/jwt-service";
import {UserQueryRepository} from "../../repository/users.query.repository";
export const tokenMiddleware = async (req:Request, res:Response, next:NextFunction) => {
    if (!req.headers.authorization){
        res.sendStatus(401)
        return
    }
    const token = req.headers.authorization.split(' ')[1]

    const userId = await jwtService.getUserIdByToken(token)
    if(!userId){
        res.sendStatus(401)
        return
    }
    const user = await UserQueryRepository.getUserById(userId)
    req.body = user
    next()
}

const authMiddleware = async (req:Request, res:Response, next:NextFunction) => {

    if(!req.headers.authorization){
        res.sendStatus(401)
        return
    }
    const authorizationType = req.headers.authorization.split(' ')[0]
   // BASIC
    if(authorizationType === 'Basic')
    {
        if (req.headers.authorization !== 'Basic YWRtaW46cXdlcnR5'){
            res.sendStatus(401)
            return
        }
        return next();
    }
    // BEARER
    if(authorizationType === 'Bearer'){
        const token = req.headers.authorization.split(' ')[1]
        const userId = await jwtService.getUserIdByToken(token)
        if(userId){
            req.body = await UserQueryRepository.getUserById(userId)
            next()
        }
       return res.sendStatus(401)
    }
    return res.sendStatus(401)
}