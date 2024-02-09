export type CommentIdType = {
    id:string
}

export type CommentUpdateType = {
    id:string
    content:string
}

export type UpdateCommentModel = {
    login:string
    email:string
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