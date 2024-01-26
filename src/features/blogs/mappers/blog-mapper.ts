import {WithId} from "mongodb";
import {OutputBlogType} from "../models/models";
import {BlogDb} from "../models/db/blog-db";

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

const a = 1;