import {Router, Response, Request} from "express";
import {authMiddleware} from "../../middleware/auth/auth-middleware";
import {blogValidation} from "../validator/blog-validator";
import {QueryBlogsModule} from "../models/QueryBlogsModule";
import {RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery} from "../../types";
import {BlogRepository} from "../repository/blog-repository";
import {URIParamsBlogIdModel} from "../models/URIParamsBlogIdModel";
import {BlogsViewModel} from "../models/BlogsViewModel";
import {CreateBlogModel} from "../models/CreateBlogModel";
import {UpdateBlogModule} from "../models/UpdateBlogModule";


export const blogsRouter = Router({})

blogsRouter.get('/',(req:RequestWithQuery<QueryBlogsModule>, res:Response) => {
    const blogs = BlogRepository.getAll()
    res.send(blogs)
})

blogsRouter.get('/:id',(req:RequestWithParams<URIParamsBlogIdModel>, res:Response) => {
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

blogsRouter.post('/', authMiddleware, blogValidation(), (req:RequestWithBody<CreateBlogModel>, res:Response) => {

    const {name, description, websiteUrl} = req.body

    const newBlog = BlogRepository.createBlog(name, description, websiteUrl)

    res.status(201).send(newBlog)
})

blogsRouter.put('/:id',authMiddleware, blogValidation(), (req:RequestWithParamsAndBody<URIParamsBlogIdModel, UpdateBlogModule>, res:Response) => {

    const id = req.params.id

    const {name, description, websiteUrl} = req.body

    const updateBlog = BlogRepository.updateBlog(id, name, description, websiteUrl)

    if(!updateBlog) {
        res.sendStatus(404)
        return
    }
    res.sendStatus(204)
})

blogsRouter.delete('/:id', authMiddleware, (req:Request, res:Response) => {

    const deleteBlog = BlogRepository.deleteById(req.params.id)
    if(!deleteBlog) {
        res.sendStatus(404)
        return
    }
    res.sendStatus(204)
})
