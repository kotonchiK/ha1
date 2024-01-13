import {Request, Response, Router} from "express";
import {postType} from "../types";
import {posts} from "../settings";
import {authMiddleware} from "../middleware/auth/auth-middleware";
import {postRepository} from "../repositories/post-repository";
import {postValidation} from "../validators/post-validator";

export const postsRouter = Router({})
postsRouter.get('/',(req, res) => {

    const posts = postRepository.getAll()
    res.status(200).send(posts)

})

postsRouter.get('/:id',(req:Request, res:Response) => {
    const id = req.params.id
    const post:postType|undefined = posts.find(b => b.id === id)

    if(!post) {
        res.sendStatus(404)
        return
    } else
    {
        res.status(200).send(post)
    }
})

postsRouter.delete('/:id', authMiddleware, (req:Request, res:Response) => {
    for(let i:number = 0; i < posts.length; i++) {
        if(posts[i].id === req.params.id) {
            posts.splice(i, 1)
            res.sendStatus(204)
            return
        }
    }
    res.sendStatus(404)
})

postsRouter.post('/', authMiddleware, postValidation(), (req:Request, res:Response) => {

    const {id, title, shortDescription, content, blogId, blogName} = req.body


    const newPost = {
        id,
        title,
        shortDescription,
        content,
        blogId,
        blogName
    }
    posts.push(newPost)
    res.status(201).send(newPost)
})

postsRouter.put('/:id',authMiddleware, postValidation(), (req:Request, res:Response) => {
    // if(Object.keys(req.body).length === 0 && req.body.constructor === Object) {
    //     res.sendStatus(400)
    //     return
    // }

    let title = req.body.title
    let shortDescription = req.body.shortDescription
    let content = req.body.content
    let blogId = req.body.blogId
    let blogName = req.body.blogName

    let post = posts.find((b):boolean => b.id === req.params.id)

    if(post) {
        post.title = title
        post.shortDescription = shortDescription
        post.content = content
        post.blogId = blogId
        post.blogName = blogName
        res.status(204).send(post)
    } else {
        res.sendStatus(404)
    }
})

