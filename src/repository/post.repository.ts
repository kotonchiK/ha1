import {postsCollection} from "../db/db";
import {postMapper} from "../mappers/post.mapper";
import {ObjectId} from "mongodb";
import {OutputPostType} from "../models/posts.output.models";
import {CreatePostType, UpdatePostType} from "../models/posts.input.models";
import {PostQueryRepository} from "./post.query.repository";
import {BlogRepository} from "./blog.repository";
export class PostRepository {
    static async getById(id: string):Promise<OutputPostType | null> {
        const post = await postsCollection.findOne({_id: new ObjectId(id)})
        if(!post) {
            return null
        }
        return postMapper(post)
    }
    static async createPost(createData: CreatePostType):Promise<string | null > {
        const blog = await BlogRepository.getById(createData.blogId)
        const newPost = {
            ...createData,
            blogName: blog!.name,
            createdAt: new Date().toISOString()
        }
        const post = await postsCollection.insertOne(newPost)
        return post.insertedId.toString()
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
    // static async ccreatePost(createData: CreatePostType):Promise<string | null > {
    //     const blog = await BlogRepository.getById(createData.blogId)
    //     const newPost = {
    //         ...createData,
    //         blogName: blog!.name,
    //         createdAt: new Date().toISOString()
    //     }
    //     const post = await postsCollection.insertOne(newPost)
    //
    //     return post.insertedId.toString()
    //
    // }

}