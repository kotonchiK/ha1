import {WithId} from "mongodb";
import {OutputBlogType} from "../models/models";
import {BlogDbType} from "../models/db/blog-db";

export const blogMapper = (blog:WithId<BlogDbType>):OutputBlogType => {
    return {
        id:blog._id.toString(),
        name:blog.name,
        description:blog.description,
        websiteUrl:blog.websiteUrl,
        createdAt:blog.createdAt,
        isMembership:blog.isMembership
    }
}