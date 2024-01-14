import {db} from "../../db/db";
export class PostRepository {

    static getAll() {
        return db.posts
    }

    static getById(id: string) {
        const foundPost = db.posts.find(p => p.id === id)
        return foundPost
    }

    static createPost(title:string, shortDescription:string, content:string,blogId:string,blogName:string) {
        const newPost = {
            id: (new Date().toISOString()),
            title:title,
            shortDescription:shortDescription,
            content:content,
            blogId:blogId,
            blogName:blogName
        };
        db.posts.push(newPost)
        return newPost
    }
    static updatePost(id: string, title:string, shortDescription:string, content:string,blogId:string,blogName:string) {
        let foundPost = db.posts.find(p => p.id === id)
        if(foundPost) {
            foundPost.title = title;
            foundPost.shortDescription = shortDescription;
            foundPost.content = content;
            foundPost.blogId = blogId;
            foundPost.blogName = blogName;
            return true
        } else { return false}
    }

    static deleteById(id:string) {
        let foundPost = db.posts.find(b => b.id === id)
        if(foundPost){
            db.posts = db.posts.filter(p => p.id !== id)
            return true
        } else {
            return false
        }

    }


}