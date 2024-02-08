import {CommentsOutputModels} from "../models/comments.output.models";
import {ObjectId, SortDirection} from "mongodb";
import {commentMapper} from "../mappers/comment.mapper";
import {commentsCollection, postsCollection} from "../db/db";
import {Pagination} from "../types";
import {OutputPostType} from "../models/posts.output.models";
import {postMapper} from "../mappers/post.mapper";
type SortData = {
    sortBy?:string | undefined
    sortDirection:SortDirection
    pageNumber?:number | undefined
    pageSize?:number | undefined
}
export class CommentQueryRepository {

    static async getByIdSort(id:string, reqQuery: SortData):Promise<Pagination<CommentsOutputModels>> {
        const commentId = id
        const sortData = {
            sortBy: reqQuery.sortBy ?? "createdAt",
            sortDirection:reqQuery.sortDirection ?? "desc",
            pageNumber:reqQuery.pageNumber ? +reqQuery.pageNumber : 1,
            pageSize:reqQuery.pageSize ? +reqQuery.pageSize : 10,
        }
        const filter = {"id":commentId}
        const comments = await commentsCollection
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
            items: comments.map(commentMapper)
        }
    }

    static async getById(id:string):Promise<CommentsOutputModels | null> {
        const comment = await commentsCollection.findOne({_id:new ObjectId(id)})
        if(!comment){
            return null
        }
        return commentMapper(comment)
    }

}