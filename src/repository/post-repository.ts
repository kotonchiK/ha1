import {CreatePostType, OutputPostType, UpdatePostType, ViewPostType} from "../models/models";
import {postsCollection} from "../db/db";
import {postMapper} from "../mappers/post-mapper";
import {ObjectId} from "mongodb";
import {BlogRepository} from "./blog-repository";

export class PostRepository {

    static async getAll(): Promise<OutputPostType[]> {
        const posts = await postsCollection.find({}).toArray()
        return posts.map(postMapper)
    }

    static async getById(id: string):Promise<OutputPostType | null> {
        const post = await postsCollection.findOne({_id: new ObjectId(id)})

        if(!post) {
            return null
        }

        return postMapper(post)
    }

    static async createPost(createData: CreatePostType):Promise<ViewPostType> {
        const blog = await BlogRepository.getById(createData.blogId)
        const newPost = {
            ...createData,
            blogName: blog!.name,
            createdAt: new Date().toISOString()
        }
        const post = await postsCollection.insertOne({...newPost})

        return {
            ...newPost,
            id:post.insertedId.toString()
        }
    }
    static async updatePost(id: string, updateData: UpdatePostType):Promise<boolean> {
        const foundPost = await postsCollection.updateOne({_id:new ObjectId(id)},{
            $set:{
                title: updateData.title,
                shortDescription: updateData.shortDescription,
                content: updateData.content,
                blogId: updateData.blogId
            }
        })
        return !!foundPost.matchedCount
    }

    static async deleteById(id:string):Promise<boolean> {
        const foundPost = await postsCollection.deleteOne({_id:new ObjectId(id)})

        return !!foundPost.deletedCount
    }
}