import {db} from "../../db/db";

export class postRepository {

    static getAll() {
        return db.posts
    }

    static getById(id: number) {
        const postFind = db.posts.find(b => +b.id === id)
        return postFind
    }

}