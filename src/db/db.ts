import dotenv from 'dotenv'
import {MongoClient} from "mongodb";
import {BlogDbType} from "../features/blogs/models/db/blog-db";
import {PostDbType} from "../features/posts/models/db/post-db";
dotenv.config()

export const port = process.env.PORT || 3999


const mongoURI = process.env.MONGO_URL || 'mongodb://0.0.0.0:27017'

const client = new MongoClient(mongoURI)

const database = client.db('blogs')

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


console.log(process.env.MONGO_URL)
//output - mongodb+srv://a:a@ava.epzello.mongodb.net/?retryWrites=true&w=majority
