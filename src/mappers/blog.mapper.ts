import {WithId} from "mongodb";
import {BlogDb} from "../db/types/blogs.types";
import {OutputBlogType} from "../models/blogs.output.models";
export const blogMapper = (blog:WithId<BlogDb>):OutputBlogType => {
    return {
        id:blog._id.toString(),
        name:blog.name,
        description:blog.description,
        websiteUrl:blog.websiteUrl,
        createdAt:blog.createdAt,
        isMembership:blog.isMembership
    }
}