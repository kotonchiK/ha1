import {UserQueryRepository} from "../repository/users.query.repository";
import {UserRepository} from "../repository/user.repository";
import {CreateInputUserModel} from "../models/users.input.models";
import {OutputUserType} from "../models/users.output.models";
import bcrypt from "bcrypt"
import {UserDb} from "../db/types/user.types";
export class UsersService {
    static async createUser(userModel:CreateInputUserModel):Promise<OutputUserType | null> {
        const passwordSalt = await bcrypt.genSalt()
        const passwordHash = await this._generateHash(userModel.password, passwordSalt)
        const newUser:UserDb = {
            login:userModel.login,
            email:userModel.email,
            password:passwordHash,
            createdAt:new Date().toISOString()
        }
        const createdUserId = await UserRepository.createUser(newUser)
        if(!createdUserId)
        {
            return null
        }
        return UserQueryRepository.getUserById(createdUserId)
    }
    static async deleteUser(userId:string):Promise<boolean|null> {
        const user = await UserQueryRepository.getUserById(userId)
        if(!user){
            return null
        }
        return await UserRepository.deleteById(userId)
    }


    static async _generateHash(str:string, salt:string) {return bcrypt.hash(str, salt)}
}