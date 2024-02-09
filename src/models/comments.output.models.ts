export type CommentsOutputModels = {
    id: string,
    content: string,
    commentatorInfo: {
        userId:string,
        userLogin: string
    },
    createdAt: string
}