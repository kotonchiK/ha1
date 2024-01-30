import {port, runDb} from "./db/db";
import express from "express";
import {blogsRouter} from "./routers/blogs.router";
import {postsRouter} from "./routers/posts.router";
import {testRouter} from "./test/test-router";
import {authRouter} from "./routers/auth.router";
import {usersRouter} from "./routers/users.router";

export const app = express()
export const jsonBodyMiddleWare = express.json()


app.use(jsonBodyMiddleWare)

app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)
app.use('/testing/all-data', testRouter)
app.use('/auth/login', authRouter)
app.use('/users',usersRouter)

app.listen(port, async () => {
    await runDb()
})