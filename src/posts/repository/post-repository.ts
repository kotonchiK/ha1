import {posts} from "../../settings";

export class postRepository {

    static getAll() {
        return posts
    }

    static getById(id: number) {
        const postFind = posts.find(b => +b.id === id)
        return postFind
    }

}