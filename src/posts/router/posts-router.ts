import {Request, Response, Router} from "express";
import {authMiddleware} from "../../middleware/auth/auth-middleware";
import {PostRepository} from "../repository/post-repository";
import {postValidation} from "../validator/post-validator";
import {db} from "../../db/db";
import {RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery} from "../../types";
import {QueryPostsModule} from "../models/QueryPostsModule";
import {URIParamsPostIdModel} from "../models/URIParamsPostIdModel";
import {PostsViewModel} from "../models/PostsViewModel";
import {CreatePostModel} from "../models/CreateBlogModel";
import {UpdatePostModule} from "../models/UpdatePostModule";


export const postsRouter = Router({})
postsRouter.get('/',(req:RequestWithQuery<QueryPostsModule>, res:Response) => {
    const posts = PostRepository.getAll()
    res.send(posts)
})

postsRouter.get('/:id',(req:RequestWithParams<URIParamsPostIdModel>, res:Response<PostsViewModel>) => {
    const id = req.params.id
    const post = PostRepository.getById(id)
    if(!post) {
        res.sendStatus(404)
        return
    } else
    {
        res.send(post)
    }
})

postsRouter.delete('/:id', authMiddleware, (req:Request, res:Response) => {
   const deletePost = PostRepository.deleteById(req.params.id)
    if(!deletePost) {
        res.sendStatus(404)
        return
    }
    res.sendStatus(204)
})

postsRouter.post('/', authMiddleware, postValidation(), (req:RequestWithBody<CreatePostModel>, res:Response) => {

    const {title, shortDescription, content, blogId, blogName} = req.body

    const newPost = PostRepository.createPost(title, shortDescription, content, blogId, blogName)
    db.posts.push(newPost)
    res.status(201).send(newPost)
})

postsRouter.put('/:id',authMiddleware, postValidation(), (req:RequestWithParamsAndBody<URIParamsPostIdModel, UpdatePostModule>, res:Response) => {

    const id = req.params.id
    const {title, shortDescription, content, blogId, blogName} = req.body

    const updatePost = PostRepository.updatePost(id, title, shortDescription, content, blogId, blogName)

    if(!updatePost) {
        res.sendStatus(404)
        return

    }
    res.sendStatus(204)


})

