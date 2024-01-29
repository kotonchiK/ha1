import {Router, Response, Request} from "express";
import {authMiddleware} from "../middlewares/auth/auth-middleware";
import {blogValidation} from "../middlewares/validators/blog-validator";
import {
    Pagination, ParamType,
    RequestWithBody,
    RequestWithParams,
    RequestWithParamsAndBody, RequestWithParamsAndQuery,
    RequestWithQuery,
    ResponseType
} from "../types";
import {BlogRepository} from "../repository/blog-repository";
import {
    BlogIdType,
    CreateBlogType,
    CreatePostFromBlogType,
    OutputBlogType,
    UpdateBlogType,
    ViewBlogType
} from "../models/blogs.models";
import {ObjectId} from "mongodb";
import {HTTP_STATUSES} from "../utils";
import {QueryBlogInputModel} from "../models/query.blog.input.model";
import {BlogQueryRepository} from "../repository/blog.query.repository";
import {createPostFromBlogValidation} from "../middlewares/validators/post-validator";
import {PostDb} from "../db/types/posts.types";
import {PostRepository} from "../repository/post-repository";
import {PostQueryRepository} from "../repository/post.query.repository";
import {OutputPostType} from "../models/posts.models";
import {BlogService} from "../services/blog.service";
import {PostService} from "../services/post.service";
import {QueryPostnputModel} from "../models/query.post.input.model";

export const blogsRouter = Router({})

blogsRouter.get('/', async (req: RequestWithQuery<QueryBlogInputModel>, res: ResponseType<Pagination<OutputBlogType>>) =>{

    const sortData = {
        searchNameTerm:req.query.searchNameTerm ?? null,
        sortBy: req.query.sortBy ?? "createdAt",
        sortDirection:req.query.sortDirection ?? "desc",
        pageNumber:req.query.pageNumber ? +req.query.pageNumber : 1,
        pageSize:req.query.pageSize ?? 10
    }

        const blogs = await BlogQueryRepository.getAll(sortData)
        res.send(blogs)
    })

blogsRouter.get('/:id', async (req: RequestWithParams<BlogIdType>, res: Response<ViewBlogType>) => {
        const id = req.params.id

        if(!ObjectId.isValid(id)){
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
            return;
        }
        const blog = await BlogQueryRepository.getById(id)
        if (!blog) {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
            return
        } else {
            res.send(blog)
        }
    })

blogsRouter.get('/:id/posts', async (req: RequestWithParamsAndQuery<BlogIdType,QueryPostnputModel>, res: ResponseType<Pagination<OutputPostType> | null>) =>{

    const blogId = req.params.id
    if(!ObjectId.isValid(blogId))
    {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
    const sortData = {
        sortBy: req.query.sortBy ?? "createdAt",
        sortDirection:req.query.sortDirection ?? "desc",
        pageNumber:req.query.pageNumber ? +req.query.pageNumber : 1,
        pageSize:req.query.pageSize ?? 10,
    }
    const posts = await PostQueryRepository.getByIdSort(blogId, sortData)
    if(!posts){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }

    res.send(posts)
})

blogsRouter.post('/', authMiddleware, blogValidation(), async (req: RequestWithBody<CreateBlogType>, res: ResponseType<OutputBlogType>) => {

        const {name, description, websiteUrl} = req.body

        const newBlog = {
            name,
            websiteUrl,
            description,
            isMembership:false,
            createdAt: new Date().toISOString()
        }
        const createdBlog = await BlogService.createBlog(newBlog)

    if(!createdBlog) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
        return
    }
    res.status(HTTP_STATUSES.CREATED_201).send(createdBlog)

    })

blogsRouter.post('/:id/posts', authMiddleware, createPostFromBlogValidation(), async (req: RequestWithParamsAndBody<ParamType ,CreatePostFromBlogType>, res: ResponseType<OutputPostType>) => {
    const id = req.params.id
    if (!ObjectId.isValid(id)) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
        return
    }
    const createPostFromBlogModel = {
        title:req.body.title,
        shortDescription:req.body.shortDescription,
        content:req.body.content
    }
    const post = await BlogService.createPostToBlog(id, createPostFromBlogModel)

    if(!post){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }

    res.status(HTTP_STATUSES.CREATED_201).send(post)


})

blogsRouter.put('/:id', authMiddleware, blogValidation(), async (req: RequestWithParamsAndBody<BlogIdType, UpdateBlogType>, res: Response) => {

        const id = req.params.id

        if(!ObjectId.isValid(id)) {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
            return
        }

        const updateData = {
            name:req.body.name,
            description:req.body.description,
            websiteUrl:req.body.websiteUrl
        }

        const blogIsUpdated = await BlogService.updateBlog(id, updateData)
    if(!blogIsUpdated) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)

    })

blogsRouter.delete('/:id', authMiddleware, async (req: RequestWithParams<BlogIdType>, res: Response) => {

        const id = req.params.id

        if(!ObjectId.isValid(id))
        {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
            return
        }

        const blogIsDeleted = await BlogService.deleteBlog(id)

    if(!blogIsDeleted) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    })

const  a = 1

// get - blogs/id/posts

// pagination get
