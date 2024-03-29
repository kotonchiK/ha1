import {Router} from "express";
import {blogsCollection, database, postsCollection, usersCollection} from "../db/db";
import {HTTP_STATUSES} from "../utils";
export const testRouter = Router({})
testRouter.delete('/', async (req, res) => {
        await blogsCollection.deleteMany({})
        await postsCollection.deleteMany({})
        await usersCollection.deleteMany({})
        await database.dropDatabase()
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)})