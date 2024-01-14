import {Request, Response, Router} from "express";
import {authMiddleware} from "../../middleware/auth/auth-middleware";
import {postRepository} from "../repository/post-repository";
import {postValidation} from "../validator/post-validator";
import {PostType} from "../../db/types/posts.types";
import {db} from "../../db/db";

export const postsRouter = Router({})
postsRouter.get('/',(req, res) => {

    const posts = postRepository.getAll()
    res.status(200).send(posts)

})

postsRouter.get('/:id',(req:Request, res:Response) => {
    const id = req.params.id
    const post:PostType|undefined = db.posts.find(b => b.id === id)

    if(!post) {
        res.sendStatus(404)
        return
    } else
    {
        res.status(200).send(post)
    }
})

postsRouter.delete('/:id', authMiddleware, (req:Request, res:Response) => {
    for(let i:number = 0; i < db.posts.length; i++) {
        if(db.posts[i].id === req.params.id) {
            db.posts.splice(i, 1)
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
    db.posts.push(newPost)
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

    let post = db.posts.find((b):boolean => b.id === req.params.id)

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

