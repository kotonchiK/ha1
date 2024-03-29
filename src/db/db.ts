import dotenv from 'dotenv'
import {MongoClient} from "mongodb";
import {BlogDb} from "./types/blogs.types";
import {PostDb} from "./types/posts.types";
import {UserDb} from "./types/user.types";
import {CommentsDb} from "./types/comments.types";
dotenv.config()

const uri = process.env.MONGO_URL || "mongodb://localhost:27017"

const client = new MongoClient(uri)
export const database = client.db('blogs-db')
export const blogsCollection = database.collection<BlogDb>('blogs')
export const postsCollection = database.collection<PostDb>('posts')
export const usersCollection = database.collection<UserDb>('users')
export const commentsCollection = database.collection<CommentsDb>('comments')
export const runDb = async () => {
    try{
        await client.connect()

        console.log(uri)
        console.log('Client connected to DB')
        console.log(`Example app listening on port ${process.env.PORT}`)
    } catch (e) {
        console.log(e)

        await client.close()
    }
}