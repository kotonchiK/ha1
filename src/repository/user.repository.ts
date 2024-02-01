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
        const getUser = await database.collection<UserDb>('users').findOne({$or: [{login: user.login}, {email:user.login}]})
        if(!getUser){
            return null
        }

        const userPassword= await UsersService._generateHash(user.password, getUser.salt)

        const isPassword = await bcrypt.compare(userPassword, getUser.password)
        if(!isPassword) {
            return null
        }
        return this.mapperUserToServiceUser(getUser)
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

    static async mapperUserToServiceUser(User:WithId<UserDb>) {
        return {
            id:User._id.toString(),
            login:User.login,
            email:User.email,
            password:User.password,
            createdAt:User.createdAt
        }
    }
}