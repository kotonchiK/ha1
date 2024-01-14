import {db} from "../../db/db";


export class BlogRepository {

    static getAll() {
        return db.blogs
    }

    static getById(id: string) {
        const foundBlog = db.blogs.find(b => b.id === id)
        return foundBlog
    }

    static createBlog(name:string, description:string, websiteUrl:string) {
        const newBlog = {
            id: (new Date().toISOString()),
            name:name,
            description:description,
            websiteUrl:websiteUrl
        };
        db.blogs.push(newBlog)
        return newBlog
    }
    static updateBlog(id:string, name:string, description:string, websiteUrl:string) {
        let foundBlog = db.blogs.find(b => b.id === id)
        if(foundBlog) {
            foundBlog.name = name;
            foundBlog.description = description;
            foundBlog.websiteUrl = websiteUrl
            return true
        } else { return false}
    }

    static deleteById(id:string) {
        let foundBlog = db.blogs.find(b => b.id === id)
        if(foundBlog){
            db.blogs = db.blogs.filter(b => b.id !== id)
            return true
        } else {
            return false
        }

    }


}