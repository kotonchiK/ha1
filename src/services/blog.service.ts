import {BlogRepository} from "../repository/blog.repository";
import {PostRepository} from "../repository/post.repository";
import {PostQueryRepository} from "../repository/post.query.repository";
import {BlogQueryRepository} from "../repository/blog.query.repository";
import {CreateBlogType, CreatePostFromBlogType, UpdateBlogType} from "../models/blogs.input.models";
import {OutputBlogType} from "../models/blogs.output.models";
import {OutputPostType} from "../models/posts.output.models";
export class BlogService {
    static async createBlog(createData:CreateBlogType):Promise<OutputBlogType | null> {
        const newBlog = {
            name:createData.name,
            websiteUrl:createData.websiteUrl,
            description:createData.description,
            isMembership:false
        }
        const createdBlogId = await BlogRepository.createBlog(newBlog)
        if(!createdBlogId){
            return null
        }
        const blog = await BlogQueryRepository.getById(createdBlogId)
        if(!blog){
            return null
        }
        return blog
    }
    static async createPostToBlog(blogId: string, reqBody:CreatePostFromBlogType):Promise<OutputPostType | null> {
        const blog = await BlogRepository.getById(blogId)
        if (!blog) {
            return null
        }
        const newPost = {
            title:reqBody.title,
            shortDescription:reqBody.shortDescription,
            content:reqBody.content,
            blogId,
            blogName: blog.name,
        }
        const createdPostId = await PostRepository.createPost(newPost)
        if(!createdPostId) {
            return null
        }
        const post = await PostQueryRepository.getById(createdPostId)
        if(!post){
            return null
        }
        return post
    }
    static async updateBlog(blogId: string, updateBlogModel:UpdateBlogType):Promise<boolean| null> {
        const blog = await BlogQueryRepository.getById(blogId)
        if (!blog) {
            return null
        }
        const updateBlog = await BlogRepository.updateBlog(blogId, updateBlogModel)
        if(!updateBlog){
            return null
        }
        return updateBlog
    }
    static async deleteBlog(blogId:string):Promise<boolean | null> {
        const blog = await BlogQueryRepository.getById(blogId)
        if (!blog) {
           return null
        }
        return await BlogRepository.deleteById(blogId)
    }
}