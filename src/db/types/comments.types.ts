export type CommentsDb = {
    content: string,
    commentatorInfo: commentatorInfo
    createdAt: string
}

export type commentatorInfo = {
    userId:string
    userLogin:string
}