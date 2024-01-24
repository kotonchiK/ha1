import dotenv from 'dotenv'
import {MongoClient} from "mongodb";
import {BlogDbType} from "../features/blogs/models/db/blog-db";
import {PostDbType} from "../features/posts/models/db/post-db";
dotenv.config()

export const port = process.env.PORT || 3999

const mongoURI = process.env.MONGO_URL || "mongodb+srv://Anton:Koton1@cluster0.kfcmxjx.mongodb.net/?retryWrites=true&w=majority"

const client = new MongoClient(mongoURI)

export const database = client.db('blogs')

export const blogsCollection = database.collection<BlogDbType>('blogs')
export const postsCollection = database.collection<PostDbType>('posts')

export const runDb = async () => {
    try{

        await client.connect()

        await client.db("blogs-hws").command({ping:1})
        console.log('Client connected to DB')
        console.log(`Example app listening on port ${port}`)
    } catch (e){
        console.log(e)

        await client.close()
    }
}