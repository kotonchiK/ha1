import {ObjectId, SortDirection} from "mongodb";
import {Pagination} from "../types";
import {OutputBlogType} from "../models/blogs.models";
import {blogsCollection, usersCollection} from "../db/db";
import {blogMapper} from "../mappers/blog.mapper";
import {OutputUserType} from "../models/users.output.models";
import {userMapper} from "../mappers/user.mapper";

export type SortData = {
    searchEmailTerm:string | null
    searchLoginTerm:string | null
    sortBy: string
    sortDirection:SortDirection
    pageNumber:number
    pageSize:number
}

export class UserQueryRepository {

    static async getAllUsers(sortData: SortData): Promise<Pagination<OutputUserType>> {

        const {searchEmailTerm,searchLoginTerm, sortBy, sortDirection, pageNumber, pageSize} = sortData

        let filter = {}

        if (searchLoginTerm) {
            filter = {
                name: {
                    $regex: searchLoginTerm,
                    $options: 'i'
                }
            }
        }
        if (searchEmailTerm) {
            filter = {
                name: {
                    $regex: searchEmailTerm,
                    $options: 'i'
                }
            }
        }

        const users = await usersCollection
            .find(filter)
            .sort(sortBy, sortDirection)
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .toArray()

        const totalCount = await usersCollection.countDocuments(filter)

        const pagesCount = Math.ceil(totalCount / pageSize)

        return {
            pageSize,
            page: pageNumber,
            pagesCount,
            totalCount,
            items: users.map(userMapper)
        }
    }

    static async getUserById(id:string):Promise<OutputUserType| null> {
        const foundUser = await usersCollection.findOne({_id:new ObjectId(id)})
        if(!foundUser){
            return null
        }
        return userMapper(foundUser)
    }
}
