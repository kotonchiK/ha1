import {blogs} from "../settings";


export class blogRepository {

    static getAll() {
        return blogs
    }

    static getById(id: number) {
        const blogFind = blogs.find(b => b.id === id)
        return blogFind
    }

}