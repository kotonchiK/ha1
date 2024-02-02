import {SortDirection} from "mongodb";

export type CreateInputUserModel = {
    login:string
    email:string
    password:string
}

export type UserIdType = {
    id:string
}

export type LoginOrEmailModel = {
    loginOrEmail:string
    password:string
}

export type QueryUserInputModel = {
    searchEmailTerm:string
    searchLoginTerm:string
    sortBy?: string
    sortDirection:SortDirection
    pageNumber?:number
    pageSize?:number
}