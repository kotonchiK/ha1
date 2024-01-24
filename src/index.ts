import {port, runDb} from "./db/db";
import express from "express";
import {blogsRouter} from "./features/blogs/routers/blogs-router";
import {postsRouter} from "./features/posts/router/posts-router";
import {testRouter} from "./test/test-router";

export const app = express()
export const jsonBodyMiddleWare = express.json()

app.use(jsonBodyMiddleWare)

app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)
app.use('/testing/all-data', testRouter)

app.listen(port, async () => {
    await runDb()
})