import {SortDirection} from "mongodb";

export type QueryUserInputModel = {
    searchEmailTerm:string
    searchLoginTerm:string
    sortBy?: string
    sortDirection:SortDirection
    pageNumber?:number
    pageSize?:number
}

export type CreateUserType = {
    id:string
    login:string
    email:string
    createdAt:string
}