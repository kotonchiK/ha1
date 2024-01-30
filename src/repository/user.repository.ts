import {blogsCollection, usersCollection} from "../db/db";
import {ObjectId} from "mongodb";
import {CreateUserType} from "../models/users.input.models";
import {OutputUserType} from "../models/users.output.models";
import {CreateBlogType} from "../models/blogs.models";

export class UserRepository {

    static async createUser(createData: CreateUserType):Promise<string | null> {
        const newUser = {
            ...createData,
            createdAt: new Date().toISOString()
        }
        const user = await usersCollection.insertOne({...newUser})
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