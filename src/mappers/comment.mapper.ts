import {WithId} from "mongodb";
import {CommentsOutputModels} from "../models/comments.output.models";
import {CommentsDb} from "../db/types/comments.types";

export const commentMapper = (comment:WithId<CommentsDb>):CommentsOutputModels => {
    return {
        id:comment._id.toString(),
        content:comment.content,
        commentatorInfo:{
            userId:comment.commentatorInfo.userId,
            userLogin:comment.commentatorInfo.userLogin
        },
        createdAt:comment.createdAt
    }
}