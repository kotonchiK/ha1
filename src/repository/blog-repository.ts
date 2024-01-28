import {CreateBlogType, OutputBlogType, UpdateBlogType, ViewBlogType} from "../models/blogs.models";
import {blogsCollection} from "../db/db";
import {blogMapper} from "../mappers/blog-mapper";
import {ObjectId} from "mongodb";
import {BlogDb} from "../db/types/blogs.types";

export class BlogRepository {

    static async getById(id: string):Promise<BlogDb | null> {
        const blog = await blogsCollection.findOne({_id: new ObjectId(id)})

        if(!blog) {
            return null
        }

        return blog
    }
    static async createBlog(createData: CreateBlogType):Promise<string | null> {
        const newBlog = {
            ...createData,
            createdAt: new Date().toISOString(),
            isMembership:false
        }
        const blog = await blogsCollection.insertOne({...newBlog})

        return blog.insertedId.toString()
    }
    static async updateBlog(id:string, updateData:UpdateBlogType):Promise<boolean> {
        const foundBlog = await blogsCollection.updateOne({_id:new ObjectId(id)}, {
            $set:{
                name:updateData.name,
                description:updateData.description,
                websiteUrl:updateData.websiteUrl
            }
        })

        return !!foundBlog.matchedCount
    }

    static async deleteById(id:string):Promise<boolean> {
        const foundBlog = await blogsCollection.deleteOne({_id:new ObjectId(id)})

        return !!foundBlog.deletedCount
    }
}