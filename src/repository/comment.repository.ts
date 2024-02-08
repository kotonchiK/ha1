import {commentsCollection, postsCollection} from "../db/db";
import {ObjectId} from "mongodb";
import {UpdatePostType} from "../models/posts.input.models";
import {CreateCommentModel} from "../models/comments.input.models";
import {BlogRepository} from "./blog.repository";
import {PostRepository} from "./post.repository";

export class CommentRepository {


    static async createComment(createData: CreateCommentModel):Promise<string | null>{
        const newComment = {
            content: createData.content,
            commentatorInfo: {
                userId:createData.userId,
                userLogin:createData.login
            },
            createdAt: new Date().toISOString()
        }
        const comment = await commentsCollection.insertOne(newComment)
        return comment.insertedId.toString()

    }

    static async deleteById(id:string):Promise<boolean | null> {
        const deletedComment = await commentsCollection.deleteOne({_id:new ObjectId(id)})
        if(!deletedComment) {
            return null
        }
        return !!deletedComment.deletedCount
    }

    static async updateCommentById(id:string, content:string):Promise<boolean> {

        const updateComment = await commentsCollection.updateOne({_id:new ObjectId(id)}, {
            $set:{
                content: content
            }
        })
        return !!updateComment.matchedCount

    }

}