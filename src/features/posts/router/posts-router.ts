import express, {Request, Response, Router} from "express";
import {authMiddleware} from "../../../middlewares/auth/auth-middleware";
import {PostRepository} from "../repositories/post-repository";
import {postValidation} from "../validator/post-validator";
import {RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery} from "../../../types";
import {HTTP_STATUSES} from "../../../utils";
import {CreatePostType, PostIdType, UpdatePostType, ViewPostType} from "../models/models";
import {ObjectId} from "mongodb";
import {body} from "express-validator";


export const postsRouter = () => {

    const router = express.Router()


    router.get('/', async (req: Request, res: Response) => {
        const posts = await PostRepository.getAll()
        res.send(posts)
    })

    router.get('/:id', async (req: RequestWithParams<PostIdType>, res: Response<ViewPostType>) => {
        const id = req.params.id

        if(!ObjectId.isValid(id))
        {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
            return;
        }
        const post = await PostRepository.getById(id)
        if (!post) {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        } else {
            res.send(post)
        }
    })

    router.post('/',authMiddleware, postValidation(), async (req: RequestWithBody<CreatePostType>, res: Response) => {

        const createData = {
            title:req.body.title,
            shortDescription:req.body.shortDescription,
            content:req.body.content,
            blogId:req.body.blogId,
            blogName:req.body.blogName
        }
        const newPost = await PostRepository.createPost(createData)
        res
            .status(HTTP_STATUSES.CREATED_201)
            .send(newPost)
    })

    router.put('/:id', authMiddleware, postValidation(), async (req: RequestWithParamsAndBody<PostIdType, UpdatePostType>, res: Response) => {

        const id = req.params.id
        if(!ObjectId.isValid(id)){
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
            return
        }
        const updateData = {
            title:req.body.title,
            shortDescription:req.body.shortDescription,
            content:req.body.content,
            blogId:req.body.blogId,
            blogName:req.body.blogName

        }
        const post = await PostRepository.getById(id)
        if(!post) {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
            return
        }
        const updatePost = PostRepository.updatePost(id, updateData)

        if (!updatePost) {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
            return

        }
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)

    })

    router.delete('/:id',authMiddleware, async (req: Request, res: Response) => {

        const id = req.params.id

        if(!ObjectId.isValid(id)){
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
            return
        }

        const deletePost = await PostRepository.deleteById(id)
        if (!deletePost) {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
            return
        }
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    })
    return router
}