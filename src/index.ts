import {port, runDb} from "./db/db";
import express from "express";
import {blogsRouter} from "./routers/blogs.router";
import {postsRouter} from "./routers/posts.router";
import {testRouter} from "./test/test-router";
import {usersRouter} from "./routers/users.router";
export const app = express()
export const jsonBodyMiddleWare = express.json()


app.use(jsonBodyMiddleWare)

app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)
app.use('/testing/all-data', testRouter)
app.use('/users',usersRouter)

export const startApp =  async () => {
    await runDb()
    app.listen(process.env.PORT || port, () => {
        console.log(`app started on ${port} port`)
    })
}
startApp()

// /** @type {import('ts-jest').JestConfigWithTsJest} */
// module.exports = {
//     preset: 'ts-jest',
//     testEnvironment: 'node',
//     testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
//     testTimeout: 100000,
// };

// "test:e2e": "jest --config jest-e2e.json --runInBand --detectOpenHandles --forceExit",