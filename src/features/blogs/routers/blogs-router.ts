import express, {Router, Response, Request} from "express";
import {authMiddleware} from "../../../middlewares/auth/auth-middleware";
import {blogValidation} from "../validators/blog-validator";
import {RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery} from "../../../types";
import {BlogRepository} from "../repositories/blog-repository";
import {BlogIdType, CreateBlogType, UpdateBlogType, OutputBlogType, ViewBlogType} from "../models/models";
import {ObjectId} from "mongodb";
import {HTTP_STATUSES} from "../../../utils";

export const blogsRouter = Router({})




blogsRouter.get('/', async (req: Request, res: Response) => {
        const blogs = await BlogRepository.getAll()
        res.send(blogs)
    })

blogsRouter.get('/:id', async (req: RequestWithParams<BlogIdType>, res: Response<ViewBlogType>) => {
        const id = req.params.id

        if(!ObjectId.isValid(id)){
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
            return;
        }
        const blog = await BlogRepository.getById(id)
        if (!blog) {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
            return
        } else {
            res.send(blog)
        }
    })

blogsRouter.post('/', authMiddleware, blogValidation(), async (req: RequestWithBody<CreateBlogType>, res: Response) => {

        const createData  = {
            name:req.body.name,
            description:req.body.description,
            websiteUrl:req.body.websiteUrl
        }

        const newBlog = await BlogRepository.createBlog(createData)

        res
            .status(HTTP_STATUSES.CREATED_201)
            .send(newBlog)

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

        const blog = await BlogRepository.getById(id)
        if (!blog) {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
            return
        }

        const updateBlog = await BlogRepository.updateBlog(id, updateData)

        if(!updateBlog){
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

        const deleteBlog = await BlogRepository.deleteById(id)
        if (!deleteBlog) {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
            return
        }
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    })
