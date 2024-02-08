import {CommentsOutputModels} from "../models/comments.output.models";
import {CommentQueryRepository} from "../repository/comment.query.repository";
import {CommentRepository} from "../repository/comment.repository";
import {CommentUpdateType, CreateCommentModel, InputCommentModel} from "../models/comments.input.models";
import {BlogRepository} from "../repository/blog.repository";
import {PostRepository} from "../repository/post.repository";
import {PostQueryRepository} from "../repository/post.query.repository";

type userType = {
    id:string
    login:string
    email:string
    createdAt:string
}

export class CommentService {

    static async createCommentToPost(postId: string, reqBody:CreateCommentModel):Promise<CommentsOutputModels | null> {
        const post = await PostRepository.getById(postId)
        if (!post) {
            return null
        }
        const createdCommentId = await CommentRepository.createComment(reqBody)
        if(!createdCommentId) {
            return null
        }
        const comment = await CommentQueryRepository.getById(createdCommentId)
        if(!comment){
            return null
        }
        return comment
    }

    static async getCommentById(id:string):Promise<CommentsOutputModels | null> {
        return await CommentQueryRepository.getById(id)
    }

    static async deleteComment(commentId:string, user: InputCommentModel) {
        const comment = await CommentQueryRepository.getById(commentId)
        if(!comment) {
            return 404
        }
        if(user.userId !== comment.commentatorInfo.userId)
        {
            return 403
        }
        return await CommentRepository.deleteById(commentId)
    }

    static async updateComment(commentId:string, user: CommentUpdateType) {
        const comment = await CommentQueryRepository.getById(commentId)
        if(!comment) {
            return 404
        }
        if(user.id !== comment.commentatorInfo.userId){
            return 403
        }
        return await CommentRepository.updateCommentById(commentId, user.content)
    }
}