import {Response, Router} from "express";
import {authMiddleware} from "../middlewares/auth/auth.middleware";
import {postValidation} from "../middlewares/validators/post.validator";
import {
    Pagination,
    RequestWithBody,
    RequestWithParams,
    RequestWithParamsAndBody, RequestWithParamsAndQuery,
    RequestWithQuery,
    ResponseType
} from "../types";
import {HTTP_STATUSES} from "../utils";
import {ObjectId} from "mongodb";
import {PostQueryRepository} from "../repository/post.query.repository";
import {PostService} from "../services/post.service";
import {CreatePostType, PostIdType, QueryPostInputModel, UpdatePostType} from "../models/posts.input.models";
import {OutputPostType, ViewPostType} from "../models/posts.output.models";
import {CommentService} from "../services/comment.service";
import {CommentRepository} from "../repository/comment.repository";
import {CommentQueryRepository} from "../repository/comment.query.repository";
import {tokenMiddleware} from "../middlewares/auth/auth.bearer.middleware";
import {contentValidation} from "../middlewares/validators/auth.validator";
import {CreateCommentModel} from "../models/comments.input.models";
import {CommentsOutputModels} from "../models/comments.output.models";
export const postsRouter = Router({})
// Get posts with Pagination
postsRouter.get('/', async (req: RequestWithQuery<QueryPostInputModel>, res: ResponseType<Pagination<OutputPostType>>) => {
    const posts = await PostQueryRepository.getAll({...req.query})
    return res.status(HTTP_STATUSES.OK_200).send(posts)
})
// Get post by id
postsRouter.get('/:id', async (req: RequestWithParams<PostIdType>, res: Response<ViewPostType>) => {
    const id = req.params.id
    if(!ObjectId.isValid(id))
    {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return;
    }
    const post = await PostService.getPostById(id)
    if (!post) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    } else {
        res.status(HTTP_STATUSES.OK_200).send(post)
    }
})
postsRouter.get('/:id/comments', async (req: RequestWithParamsAndQuery<PostIdType,QueryPostInputModel >, res: ResponseType<Pagination<CommentsOutputModels>>) => {
    const commentId = req.params.id
    if(!ObjectId.isValid(commentId))
    {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return;
    }
    const post = await PostQueryRepository.getById(commentId)
    if (!post) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }
    const comments = await CommentQueryRepository.getByIdSort(commentId, {...req.query})
    if(!comments){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
    return res.status(HTTP_STATUSES.OK_200).send(comments)
})

// Create post
postsRouter.post('/',authMiddleware, postValidation(), async (req: RequestWithBody<CreatePostType>, res: ResponseType<OutputPostType>) => {
    const createdPost = await PostService.createPost({...req.body})
    if(!createdPost) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
        return
    }
    return res.status(HTTP_STATUSES.CREATED_201).send(createdPost)
})

postsRouter.post('/:id/comments', tokenMiddleware, contentValidation, async (req: RequestWithParamsAndBody<PostIdType,CreateCommentModel>, res: ResponseType<CommentsOutputModels>) => {
    const commentId = req.params.id
    if(!ObjectId.isValid(commentId))
    {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return;
    }
    const post = await PostQueryRepository.getById(commentId)
    if (!post) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }

    const createdCommment = await CommentService.createCommentToPost(commentId, {...req.body})
    if(!createdCommment) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
        return
    }
    return res.status(HTTP_STATUSES.CREATED_201).send(createdCommment)
})
// Update post by id
postsRouter.put('/:id', authMiddleware, postValidation(), async (req: RequestWithParamsAndBody<PostIdType, UpdatePostType>, res: Response) => {
    const id = req.params.id
    if(!ObjectId.isValid(id)){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
    const postIsUpdated = await PostService.updatePost(id, {...req.body})
    if(!postIsUpdated) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
    return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})
// Delete post by id
postsRouter.delete('/:id',authMiddleware, async (req: RequestWithParams<PostIdType>, res: Response) => {
    const id = req.params.id
    if(!ObjectId.isValid(id)){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
    const postIsDeleted = await PostService.deletedPost(id)
    if (!postIsDeleted) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
    return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})