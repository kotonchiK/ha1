export type CommentsOutputModels = {
    id: string,
    content: string,
    commentatorInfo: commentatorInfo
    createdAt: string
}

export type commentatorInfo = {
    userId:string
    userLogin:string
}