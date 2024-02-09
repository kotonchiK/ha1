import {Router, Response} from "express";
import {RequestWithParams, RequestWithParamsAndBody} from "../types";
import {CommentsOutputModels} from "../models/comments.output.models";
import {
    CommentIdType,
    DeleteCommentModel,
    InputCommentModel,
    UpdateCommentModel
} from "../models/comments.input.models";
import {ObjectId} from "mongodb";
import {HTTP_STATUSES} from "../utils";
import {CommentService} from "../services/comment.service";
import {tokenMiddleware} from "../middlewares/auth/auth.bearer.middleware";
import {ViewUserType} from "../models/users.output.models";
import {contentValidation} from "../middlewares/validators/auth.validator";

export const commentRouter = Router({})

commentRouter.get('/:id', async (req:RequestWithParams<CommentIdType>,res:Response<CommentsOutputModels>) => {
    const id = req.params.id
    if(!ObjectId.isValid(id))
    {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
    const comment = await CommentService.getCommentById(id)
    if(!comment){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    } else {
        res.status(HTTP_STATUSES.OK_200).send(comment)
    }
})

commentRouter.delete('/:id', tokenMiddleware,
    async (req:RequestWithParamsAndBody<CommentIdType, CommentIdType>, res:Response) => {
    const commentId = req.params.id
    if(!ObjectId.isValid(commentId)){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
    const isCommentDeleted = await CommentService.deleteComment(commentId, req.body.id)
        if(isCommentDeleted === 404) {
            return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        }
        if(isCommentDeleted === 403) {
            return res.sendStatus(HTTP_STATUSES.NOT_OWNER_403)
        }
        return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})

commentRouter.put('/:id', tokenMiddleware, contentValidation(),
    // content validation
    async (req: RequestWithParamsAndBody<CommentIdType, UpdateCommentModel>, res:Response) => {
        const commentId = req.params.id
        if(!ObjectId.isValid(commentId)){
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
            return
        }
        const updateData = {
            userId:req.body.userId,
            content:req.body.content
        }

        const isCommentUpdated = await CommentService.updateComment(commentId, updateData)

        if(isCommentUpdated === 404){
            return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        }
        if(isCommentUpdated === 403){
            return res.sendStatus(HTTP_STATUSES.NOT_OWNER_403)
        }
        return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})