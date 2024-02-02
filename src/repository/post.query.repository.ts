import  {postsCollection} from "../db/db";
import {postMapper} from "../mappers/post.mapper";
import {ObjectId, SortDirection} from "mongodb";
import {Pagination} from "../types";
import {OutputPostType} from "../models/posts.output.models";
type SortData = {
    sortBy?:string | undefined
    sortDirection:SortDirection
    pageNumber?:number | undefined
    pageSize?:number | undefined
}
export class PostQueryRepository {
    static async getAll(reqQuery:SortData): Promise<Pagination<OutputPostType>> {
        const sortData = {
            sortBy: reqQuery.sortBy ?? "createdAt",
            sortDirection:reqQuery.sortDirection ?? "desc",
            pageNumber:reqQuery.pageNumber ? +reqQuery.pageNumber : 1,
            pageSize:reqQuery.pageSize ? +reqQuery.pageSize:10
        }
        const posts = await postsCollection
            .find({})
            .sort(sortData.sortBy, sortData.sortDirection)
            .skip((sortData.pageNumber - 1) * sortData.pageSize)
            .limit(sortData.pageSize)
            .toArray()

        const totalCount = await postsCollection.countDocuments({})
        const pagesCount = Math.ceil(totalCount/sortData.pageSize)
        return {
            pageSize:sortData.pageSize,
            page:sortData.pageNumber,
            pagesCount,
            totalCount,
            items: posts.map(postMapper)
        }
    }
    static async getByIdSort(id:string, reqQuery: SortData):Promise<Pagination<OutputPostType>> {
        const blogId = id
        const sortData = {
            sortBy: reqQuery.sortBy ?? "createdAt",
            sortDirection:reqQuery.sortDirection ?? "desc",
            pageNumber:reqQuery.pageNumber ? +reqQuery.pageNumber : 1,
            pageSize:reqQuery.pageSize ? +reqQuery.pageSize : 10,
        }
        const filter = {"blogId":blogId}
        const posts = await postsCollection
            .find(filter)
            .sort(sortData.sortBy, sortData.sortDirection)
            .skip((sortData.pageNumber - 1) * sortData.pageSize)
            .limit(sortData.pageSize)
            .toArray()
        const totalCount = await postsCollection.countDocuments(filter)
        const pagesCount = Math.ceil(totalCount/sortData.pageSize)
        return {
            pageSize:sortData.pageSize,
            page:sortData.pageNumber,
            pagesCount,
            totalCount,
            items: posts.map(postMapper)
        }
    }
    static async getById(id: string):Promise<OutputPostType | null> {
        const post = await postsCollection.findOne({_id: new ObjectId(id)})
        if(!post) {
            return null
        }
        return postMapper(post)
    }
}