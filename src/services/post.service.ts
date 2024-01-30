import {CreateBlogType, OutputBlogType, UpdateBlogType, ViewBlogType} from "../models/blogs.models";
import {BlogRepository} from "../repository/blog.repository";
import {BlogQueryRepository} from "../repository/blog.query.repository";
import {CreatePostType, OutputPostType, UpdatePostType} from "../models/posts.models";
import {PostRepository} from "../repository/post.repository";
import {PostQueryRepository} from "../repository/post.query.repository";
import {BlogDb} from "../db/types/blogs.types";
import {postsCollection} from "../db/db";
import {PostDb} from "../db/types/posts.types";
import {FindCursor, WithId} from "mongodb";

export class PostService {
    static async getPostById(id:string):Promise<OutputPostType | null> {
        return await PostQueryRepository.getById(id)
    }

    static async createPost(createData: CreatePostType): Promise<OutputPostType | null> {
        const createdPostId = await PostRepository.createPost(createData)
        if (!createdPostId) {
            return null
        }
        const post = await PostQueryRepository.getById(createdPostId)
        if (!post) {
            return null
        }
        return post
    }

    static async getPostToBlog(blogId:string):Promise<FindCursor<WithId<PostDb>> | null> {
        const blog = await BlogQueryRepository.getById(blogId)
        if(!blog) {
            return null
        }

        const postId = blog.id

        const posts = postsCollection.find({'blogId': postId})

        return posts
    }

    static  async updatePost(postId: string, updatePostModel:UpdatePostType):Promise<boolean| null> {
        const post = await PostQueryRepository.getById(postId)
        if (!post) {
            return null
        }
        const updatedPost = await PostRepository.updatePost(postId, updatePostModel)

        if (!updatedPost) {
            return null
        }
        return updatedPost
    }

    static async deletedPost(postId:string):Promise<boolean | null> {
        const post = await PostQueryRepository.getById(postId)
        if(!post)
        {
            return null
        }
        return await PostRepository.deleteById(postId)
    }
}