import {WithId} from "mongodb";
import {PostDb} from "../models/db/post-db";
import {OutputPostType} from "../models/models";

export const postMapper = (post:WithId<PostDb>):OutputPostType => {
    return {
        id:post._id.toString(),
        title:post.title,
        shortDescription:post.shortDescription,
        content:post.content,
        blogId:post.blogId,
        blogName:post.blogName,
        createdAt:post.createdAt
    }
}