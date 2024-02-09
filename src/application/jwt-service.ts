import jwt from "jsonwebtoken"
import {UserDb} from "../db/types/user.types";
import {ObjectId} from "mongodb";
import {settings} from "../settings";
import {UserViewModel} from "../models/users.input.models";

export const jwtService = {
    async createJWT (user: UserViewModel ) {
        const token = jwt.sign({userId:user.id}, settings.JWT_SECRET, {expiresIn:'100h'})
        return token
        // { resultCode:0,
        //     data:{
        //         token:token
        //     }
        // }
    },
    async getUserIdByToken(token:string):Promise<ObjectId | null> {
        try{
            const result: any = jwt.verify(token, settings.JWT_SECRET)
            return new ObjectId(result.userId)
        } catch (error){
            return null
        }
    }


}