import {BlogRepository} from "../repository/blog-repository";
import {HTTP_STATUSES} from "../utils";
import {PostDb} from "../db/types/posts.types";
import {PostRepository} from "../repository/post-repository";
import {PostQueryRepository} from "../repository/post.query.repository";
import {CreateBlogType, CreatePostFromBlogType, OutputBlogType, UpdateBlogType} from "../models/blogs.models";
import {OutputPostType} from "../models/posts.models";
import {BlogQueryRepository} from "../repository/blog.query.repository";

export class BlogService {

    static async createBlog(createData:CreateBlogType):Promise<OutputBlogType | null> {

        const createdBlogId = await BlogRepository.createBlog(createData)

        if(!createdBlogId){
            return null
        }
        const blog = await BlogQueryRepository.getById(createdBlogId)

        if(!blog){
            return null
        }

        return blog

    }
    static async createPostToBlog(blogId: string, createPostModel:CreatePostFromBlogType):Promise<OutputPostType | null> {

        const {title,shortDescription,content} = createPostModel
        const blog = await BlogRepository.getById(blogId)

        if (!blog) {
            return null
        }

        const newPost: PostDb = {
            title,
            shortDescription,
            content,
            blogId,
            blogName: blog.name,
            createdAt: new Date().toISOString()
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