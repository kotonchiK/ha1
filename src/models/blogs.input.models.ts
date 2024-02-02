import {SortDirection} from "mongodb";

export type BlogIdType = {
    id:string
}

export type CreateBlogType = {
    name:string
    description:string
    websiteUrl:string
    isMembership: boolean
}

export type UpdateBlogType = {
    name:string
    description:string
    websiteUrl:string
}

export type CreatePostFromBlogType = {
    title:string
    shortDescription:string
    content:string
}

export type QueryBlogInputModel = {
    searchNameTerm:string
    sortBy?: string
    sortDirection:SortDirection
    pageNumber?:number
    pageSize?:number
}