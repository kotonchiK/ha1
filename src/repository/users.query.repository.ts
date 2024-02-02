import {ObjectId, SortDirection} from "mongodb";
import {Pagination} from "../types";
import {usersCollection} from "../db/db";
import {OutputUserType} from "../models/users.output.models";
import {userMapper} from "../mappers/user.mapper";
export type SortData = {
    searchEmailTerm: string;
    searchLoginTerm: string;
    sortBy?: string | undefined;
    sortDirection: SortDirection;
    pageNumber?: number | undefined;
    pageSize?: number | undefined;
}
export class UserQueryRepository {
    static async getAllUsers(reqQuery: SortData): Promise<Pagination<OutputUserType>> {
        const sortData = {
            searchLoginTerm:reqQuery.searchLoginTerm ?? null,
            searchEmailTerm:reqQuery.searchEmailTerm ?? null,
            sortBy:reqQuery.sortBy ?? "createdAt",
            sortDirection:reqQuery.sortDirection ?? "desc",
            pageNumber:reqQuery.pageNumber ? +reqQuery.pageNumber : 1,
            pageSize:reqQuery.pageSize ? +reqQuery.pageSize : 10
        }
        const {searchLoginTerm, searchEmailTerm, sortBy, sortDirection, pageNumber, pageSize} = sortData
        const filter = {
            $or: [
                {email:{$regex:searchEmailTerm || '', $options:'i'}},
                {login:{$regex:searchLoginTerm || '', $options:'i'}}
            ]
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
    static async getUserById(userId:string):Promise<OutputUserType| null> {
        const foundUser = await usersCollection.findOne({_id:new ObjectId(userId)})
        if(!foundUser){
            return null
        }
        return userMapper(foundUser)
    }
}