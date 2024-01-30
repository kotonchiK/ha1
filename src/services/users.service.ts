import {UserQueryRepository} from "../repository/users.query.repository";
import {UserRepository} from "../repository/user.repository";
import {CreateUserType} from "../models/users.input.models";
import {OutputUserType} from "../models/users.output.models";

export class UsersService {

    static async createUser(createData:CreateUserType):Promise<OutputUserType | null> {
        const createUserId = await UserRepository.createUser(createData)
        if(!createUserId){
            return null
        }
        const user = await UserQueryRepository.getUserById(createUserId)
        if(!user) {
            return null
        }
        return user
    }
    static async deleteUser(userId:string):Promise<boolean | null> {
        const user = await UserQueryRepository.getUserById(userId)
        if(!user){
            return null
        }
        return await UserRepository.deleteById(userId)
    }

}

