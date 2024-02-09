  import {blogsCollection} from "../db/db";
import {blogMapper} from "../mappers/blog.mapper";
import {ObjectId, SortDirection} from "mongodb";
import {Pagination} from "../types";
import {OutputBlogType} from "../models/blogs.output.models";
type SortData = {
    searchNameTerm:string
    sortBy?:string | undefined
    sortDirection:SortDirection
    pageNumber?:number | undefined
    pageSize?:number | undefined
}
export class BlogQueryRepository {
    static async getAll(reqQuery: SortData): Promise<Pagination<OutputBlogType>> {
        const sortData = {
            searchNameTerm:reqQuery.searchNameTerm ?? null,
            sortBy: reqQuery.sortBy ?? "createdAt",
            sortDirection:reqQuery.sortDirection ?? "desc",
            pageNumber:reqQuery.pageNumber ? +reqQuery.pageNumber : 1,
            pageSize:reqQuery.pageSize ? +reqQuery.pageSize : 10
        }

        const {searchNameTerm, sortBy, sortDirection, pageNumber, pageSize} = sortData

        let filter = {}

        if(searchNameTerm){
            filter = {
                name: {
                    $regex: searchNameTerm,
                    $options: 'i'
                }
            }
        }

        const blogs = await blogsCollection
            .find(filter)
            .sort(sortBy, sortDirection)
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .toArray()

        const totalCount = await blogsCollection.countDocuments(filter)
        const pagesCount = Math.ceil(totalCount/pageSize)

        return {
            pageSize,
            page:pageNumber,
            pagesCount,
            totalCount,
            items: blogs.map(blogMapper)
        }
    }
    static async getById(id: string):Promise<OutputBlogType | null> {
        const blog = await blogsCollection.findOne({_id: new ObjectId(id)})
        if(!blog) {
            return null
        }
        return blogMapper(blog)
    }
}