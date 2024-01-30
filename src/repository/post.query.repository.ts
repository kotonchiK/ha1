import {CreatePostType, OutputPostType, UpdatePostType, ViewPostType} from "../models/posts.models";
import {blogsCollection, postsCollection} from "../db/db";
import {postMapper} from "../mappers/post.mapper";
import {ObjectId, SortDirection} from "mongodb";
import {BlogRepository} from "./blog.repository";
import {Pagination} from "../types";
import {OutputBlogType} from "../models/blogs.models";
import {BlogQueryRepository} from "./blog.query.repository";


export type SortData = {
    sortBy: string
    sortDirection:SortDirection
    pageNumber:number
    pageSize:number
}



export class PostQueryRepository {

    static async getAll(sortData:SortData): Promise<Pagination<OutputPostType>> {
        const {sortBy, sortDirection, pageNumber, pageSize} = sortData
        const posts = await postsCollection
            .find({})
            .sort(sortBy, sortDirection)
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .toArray()

        const totalCount = await postsCollection.countDocuments({})

        const pagesCount = Math.ceil(totalCount/pageSize)

        return {
            pageSize,
            page:pageNumber,
            pagesCount,
            totalCount,
            items: posts.map(postMapper)
        }


    }

    static async getByIdSort(id:string, sortData: SortData):Promise<Pagination<OutputPostType>> {
        const blogId = id
        const {sortBy, sortDirection, pageNumber, pageSize} = sortData
        const filter = {"blogId":blogId}
        const posts = await postsCollection

            .find(filter)
            .sort(sortBy, sortDirection)
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .toArray()

        const totalCount = await postsCollection.countDocuments(filter)

        const pagesCount = Math.ceil(totalCount/pageSize)

        return {
            pageSize,
            page:pageNumber,
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