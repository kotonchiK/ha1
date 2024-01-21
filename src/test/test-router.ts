import express, {Router} from "express";
import {blogsCollection, postsCollection} from "../db/db";
import {HTTP_STATUSES} from "../utils";

export const testRouter = () => {
    const router = express.Router()

    router.delete('/', async (req, res) => {
        await blogsCollection.deleteMany({})
        await postsCollection.deleteMany({})

        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    })

    return router
}