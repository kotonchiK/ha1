export type BlogIdType= {
    id:string
}

export type CreateBlogType = {
    name:string
    description:string
    websiteUrl:string
}

export type UpdateBlogType = CreateBlogType

export type ViewBlogType = {
    id:string
    name:string
    description:string,
    websiteUrl:string
    createdAt:string,
    isMembership:boolean

}

export type OutputBlogType = ViewBlogType
