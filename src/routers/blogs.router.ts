import {Router, Response} from "express";
import {authMiddleware} from "../middlewares/auth/auth.middleware";
import {blogValidation} from "../middlewares/validators/blog.validator";
import {
    Pagination, ParamType,
    RequestWithBody,
    RequestWithParams,
    RequestWithParamsAndBody, RequestWithParamsAndQuery,
    RequestWithQuery,
    ResponseType
} from "../types";
import {BlogRepository} from "../repository/blog.repository";
import {ObjectId} from "mongodb";
import {HTTP_STATUSES} from "../utils";
import {BlogQueryRepository} from "../repository/blog.query.repository";
import {createPostFromBlogValidation} from "../middlewares/validators/post.validator";
import {PostQueryRepository} from "../repository/post.query.repository";
import {BlogService} from "../services/blog.service";
import {
    BlogIdType,
    CreateBlogType,
    CreatePostFromBlogType,
    QueryBlogInputModel,
    UpdateBlogType
} from "../models/blogs.input.models";
import {OutputBlogType, ViewBlogType} from "../models/blogs.output.models";
import {QueryPostInputModel} from "../models/posts.input.models";
import {OutputPostType} from "../models/posts.output.models";
export const blogsRouter = Router({})
// Get all blogs
blogsRouter.get('/', async (req: RequestWithQuery<QueryBlogInputModel>, res: ResponseType<Pagination<OutputBlogType>>) =>{
        const blogs = await BlogQueryRepository.getAll({...req.query})
       return res.status(HTTP_STATUSES.OK_200).send(blogs)
    })
// Get blog by id
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
        }
        return res.status(HTTP_STATUSES.OK_200).send(blog)
    })
// Get posts by blog with id
blogsRouter.get('/:id/posts', async (req: RequestWithParamsAndQuery<BlogIdType,QueryPostInputModel>, res: ResponseType<Pagination<OutputPostType> | null>) =>{
    const blogId:string = req.params.id
    if(!ObjectId.isValid(blogId))
    {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
    const blog = await BlogRepository.getById(blogId)
    if(!blog) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
    const posts = await PostQueryRepository.getByIdSort(blogId, {...req.query})
    if(!posts){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
    return res.status(HTTP_STATUSES.OK_200).send(posts)
})
// Create blog
blogsRouter.post('/', authMiddleware, blogValidation(), async (req: RequestWithBody<CreateBlogType>, res: ResponseType<OutputBlogType>) => {
    const createdBlog = await BlogService.createBlog({...req.body})
    if(!createdBlog) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
        return
    }
    return res.status(HTTP_STATUSES.CREATED_201).send(createdBlog)
    })
// Create post by BlogId
blogsRouter.post('/:id/posts', authMiddleware, createPostFromBlogValidation(), async (req: RequestWithParamsAndBody<ParamType ,CreatePostFromBlogType>, res: ResponseType<OutputPostType>) => {
    const id = req.params.id
    if (!ObjectId.isValid(id)) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
        return
    }
    const post = await BlogService.createPostToBlog(id, {...req.body})
    if(!post){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
    return res.status(HTTP_STATUSES.CREATED_201).send(post)
})
// Update blog by id
blogsRouter.put('/:id', authMiddleware, blogValidation(), async (req: RequestWithParamsAndBody<BlogIdType, UpdateBlogType>, res: Response) => {
    const id = req.params.id
    if(!ObjectId.isValid(id)) {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
            return
        }
    const blogIsUpdated = await BlogService.updateBlog(id, {...req.body})
    if(!blogIsUpdated) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
   return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})
// Delete blog by id
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
    return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})