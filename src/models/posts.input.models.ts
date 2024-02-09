  import {SortDirection} from "mongodb";

export type PostIdType = {
    id:string
}

export type CreatePostType = {
    title:string
    shortDescription:string
    content:string
    blogId:string
}

export type UpdatePostType = {
    title:string
    shortDescription:string
    content:string
    blogId:string
    blogName:string
}

export type QueryPostInputModel = {
    sortBy?: string
    sortDirection:SortDirection
    pageNumber?:number
    pageSize?:number
}