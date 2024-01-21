export type PostIdType = {
    id:string
}

export type CreatePostType = {
    title:string
    shortDescription:string
    content:string
    blogId:string
    blogName:string
}

export type UpdatePostType = CreatePostType

export type ViewPostType = {
    id:string
    title:string
    shortDescription:string
    content:string
    blogId:string
    blogName:string
    createdAt:string
}

export type OutputPostType = ViewPostType

