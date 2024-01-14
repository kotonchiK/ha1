import {Router, Response, Request} from "express";
import {authMiddleware} from "../../middleware/auth/auth-middleware";
import {blogValidation} from "../validator/blog-validator";
import {db} from "../../db/db";
import {BlogsType} from "../../db/types/blogs.types";
import {QueryBlogsModule} from "../models/QueryBlogsModule";
import {RequestWithBody, RequestWithParams, RequestWithQuery} from "../../types";
import {BlogRepository} from "../repository/blog-repository";
import {URIParamsBlogIdModel} from "../models/URIParamsBlogIdModel";
import {BlogsViewModel} from "../models/BlogsViewModel";
import {CreateBlogModel} from "../models/CreateBlogModel";


export const blogsRouter = Router({})

blogsRouter.get('/',(req:RequestWithQuery<QueryBlogsModule>, res:Response) => {
    const blogs = BlogRepository.getAll()
    res.send(blogs)
})

blogsRouter.get('/:id',(req:RequestWithParams<URIParamsBlogIdModel>, res:Response<BlogsViewModel>) => {
    const id = req.params.id
    const blog = BlogRepository.getById(id)
    if(!blog) {
        res.sendStatus(404)
        return
    } else
    {
        res.send(blog)
    }
})

blogsRouter.delete('/:id', authMiddleware, (req:Request, res:Response) => {

    const deleteBlog = BlogRepository.deleteById(req.params.id)
    if(!deleteBlog) {
        res.sendStatus(404)
        return
    }
    res.sendStatus(204)
})

blogsRouter.post('/', authMiddleware, blogValidation(), (req:RequestWithBody<CreateBlogModel>, res:Response) => {

    const {name, description, websiteUrl} = req.body

    const newBlog = BlogRepository.createBlog(name, description, websiteUrl)

    res.status(201).send(newBlog)
})

blogsRouter.put('/:id',authMiddleware, blogValidation(), (req:Request, res:Response) => {

    const {id, name, description, websiteUrl} = req.body

    const updateBlog = BlogRepository.updateBlog(id, name, description, websiteUrl)

    if(!updateBlog) {
        res.sendStatus(404)
        return
    }
    const blog = BlogRepository.deleteById(id)
    res.status(204).send(blog)
})

