export type CommentIdType = {
    id:string
}

export type CommentUpdateType = {
    userId:string
    content:string
}

export type UpdateCommentModel = {
    userId:string
    content:string
}

export type DeleteCommentModel = {
    userId:string
    login:string
    email:string

}

export type InputCommentModel = {
    userId:string
    login:string
    email:string
}

export type CreateCommentModel = {
    userId:string
    login:string
    email:string
    content:string
}