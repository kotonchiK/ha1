import {runDb} from "./db/db";
import express from "express";
import {RouterPaths} from "./routerPaths";
import {blogsRouter} from "./features/blogs/routers/blogs-router";
import {postsRouter} from "./features/posts/router/posts-router";
import {testRouter} from "./test/test-router";

export const port= 3000
export const app = express()

app.listen(port, async () => {
await runDb()
})

export const jsonBodyMiddleWare = express.json()

app.use(jsonBodyMiddleWare)

app.use(RouterPaths.blogs, blogsRouter)
app.use(RouterPaths.posts, postsRouter)
app.use(RouterPaths.testing, testRouter)