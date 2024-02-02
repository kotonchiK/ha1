import {blogsCollection, database, usersCollection} from "../db/db";
import {ObjectId, WithId} from "mongodb";
import {OutputUserType} from "../models/users.output.models";
import {CreateBlogType} from "../models/blogs.models";
import {UserDb} from "../db/types/user.types";
import {LoginOrEmailModel} from "../models/users.input.models";
import bcrypt from "bcrypt";
import {UsersService} from "../services/users.service";

export class UserRepository {

    static async getByLoginOrEmail(user:LoginOrEmailModel) {
        const getUser = await database.collection<UserDb>('users').findOne({$or: [{login: user.loginOrEmail}, {email:user.loginOrEmail}]})
        if(!getUser){
            return null
        }

        const isPassword = await bcrypt.compare(user.password, getUser.password)
        if(isPassword) {
            return {
                id:getUser._id.toString(),
                login:getUser.login,
                email:getUser.email,
                createdAt:getUser.createdAt
            }
        }
        return null
    }

    static async createUser(createUser: UserDb):Promise<string | null> {
        const user = await usersCollection.insertOne(createUser)
        return user.insertedId.toString()
    }

    static async deleteById(id: string): Promise<boolean | null> {
        const foundUser = await usersCollection.deleteOne({_id: new ObjectId(id)})
        if (!foundUser) {
            return null
        }
        return !!foundUser.deletedCount
    }
}