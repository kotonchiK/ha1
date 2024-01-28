export type BlogIdType= {
    id:string
}

export type CreateBlogType = {
    name:string
    description:string
    websiteUrl:string
    isMembership: boolean
    createdAt: string
}

export type UpdateBlogType = { name:string
    description:string
    websiteUrl:string }

export type ViewBlogType = {
    id:string
    name:string
    description:string,
    websiteUrl:string
    createdAt:string,
    isMembership:boolean

}

export type OutputBlogType = {
    id:string
    name:string
    description:string,
    websiteUrl:string
    createdAt:string,
    isMembership:boolean
}

export type CreatePostFromBlogType = {
    title:string
   shortDescription:string
    content:string
}
