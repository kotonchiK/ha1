import dotenv from 'dotenv'
import {MongoClient} from "mongodb";
import {BlogDb} from "../features/blogs/models/db/blog-db";
import {PostDb} from "../features/posts/models/db/post-db";
dotenv.config()

export const port = 80

const uri = process.env.MONGO_URL || "mongodb://localhost:27017"

const client = new MongoClient(uri)

export const database = client.db('blogs-db')

export const blogsCollection = database.collection<BlogDb>('blogs')
export const postsCollection = database.collection<PostDb>('posts')

export const runDb = async () => {
    try{
        await client.connect()

        console.log('Client connected to DB')
        console.log(`Example app listening on port ${port}`)
    } catch (e) {
        console.log(e)

        await client.close()
    }
}








