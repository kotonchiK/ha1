import {Router, Response, Request} from "express";
import {authMiddleware} from "../middleware/auth/auth-middleware";
import {blogValidation} from "../validators/blog-validator";
import {blogRepository} from "../repositories/blog-repository";
import {blogs} from "../settings";
import { blogType } from "../types";


export const blogsRouter = Router({})

blogsRouter.get('/',(req, res) => {

    const blogs = blogRepository.getAll()
    res.status(200).send(blogs)

})

blogsRouter.get('/:id',(req:Request, res:Response) => {
    const id = +req.params.id
    const blog:blogType|undefined = blogs.find(b => +(b.id) === id)

    if(!blog) {
        res.sendStatus(404)
        return
    } else
    {
        res.status(200).send(blog)
    }
})

blogsRouter.delete('/:id', authMiddleware, (req:Request, res:Response) => {
    for(let i:number = 0; i < blogs.length; i++) {
        if(+(blogs[i].id) === +req.params.id) {
            blogs.splice(i, 1)
            res.sendStatus(204)
            return
        }
    }
    res.sendStatus(404)
})

blogsRouter.post('/', authMiddleware, blogValidation(), (req:Request, res:Response) => {

    const id = req.body.id
    const name = req.body.name
    const description = req.body.description
    const websiteUrl = req.body.websiteUrl


    const newBlog = {
        id,
        name,
        description,
        websiteUrl
    }
    blogs.push(newBlog)
    res.status(201).send(newBlog)
})

blogsRouter.put('/:id',authMiddleware, blogValidation(), (req:Request, res:Response) => {
   // if(Object.keys(req.body).length === 0 && req.body.constructor === Object) {
   //     res.sendStatus(400)
   //     return
   // }


    let name = req.body.name
    let description = req.body.description
    let websiteUrl = req.body.websiteUrl

    let blog = blogs.find((b):boolean => +(b.id) === +req.params.id)

    if(blog) {
        blog.name = name
        blog.description = description
        blog.websiteUrl = websiteUrl
        res.status(204).send(blog)
    } else {
        res.sendStatus(404)
    }
})

