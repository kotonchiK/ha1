import {Request, Response, Router} from "express";
import {authMiddleware} from "../middlewares/auth/auth-middleware";
import {PostRepository} from "../repository/post-repository";
import {postValidation} from "../middlewares/validators/post-validator";
import {
    Pagination,
    RequestWithBody,
    RequestWithParams,
    RequestWithParamsAndBody,
    RequestWithQuery,
    ResponseType
} from "../types";
import {HTTP_STATUSES} from "../utils";
import {CreatePostType, OutputPostType, PostIdType, UpdatePostType, ViewPostType} from "../models/posts.models";
import {ObjectId} from "mongodb";
import {PostQueryRepository} from "../repository/post.query.repository";
import {QueryBlogInputModel} from "../models/query.blog.input.model";
import {BlogIdType, OutputBlogType} from "../models/blogs.models";
import {QueryPostnputModel} from "../models/query.post.input.model";
import {PostService} from "../services/post.service";

export const postsRouter = Router({})



postsRouter.get('/', async (req: RequestWithQuery<QueryPostnputModel>, res: ResponseType<Pagination<OutputPostType>>) => {
    const sortData = {
        sortBy: req.query.sortBy ?? "createdAt",
        sortDirection:req.query.sortDirection ?? "desc",
        pageNumber:req.query.pageNumber ? +req.query.pageNumber : 1,
        pageSize:req.query.pageSize ?  +req.query.pageSize:10
    }

    const posts = await PostQueryRepository.getAll(sortData)
        res.send(posts)
    })

postsRouter.get('/:id', async (req: RequestWithParams<PostIdType>, res: Response<ViewPostType>) => {
        const id = req.params.id

        if(!ObjectId.isValid(id))
        {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
            return;
        }

        const post = await PostQueryRepository.getById(id)
        if (!post) {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        } else {
            res.send(post)
        }
    })

postsRouter.post('/',authMiddleware, postValidation(), async (req: RequestWithBody<CreatePostType>, res: ResponseType<OutputPostType>) => {


        const createData = {
            title:req.body.title,
            shortDescription:req.body.shortDescription,
            content:req.body.content,
            blogId:req.body.blogId,
            blogName:req.body.blogName
        }
        const createdPost = await PostService.createPost(createData)

    if(!createdPost) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
        return
    }

    res.status(HTTP_STATUSES.CREATED_201).send(createdPost)

    })

postsRouter.put('/:id', authMiddleware, postValidation(), async (req: RequestWithParamsAndBody<PostIdType, UpdatePostType>, res: Response) => {

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

        const postIsUpdated = await PostService.updatePost(id, updateData)

    if(!postIsUpdated) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)

    })

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
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})