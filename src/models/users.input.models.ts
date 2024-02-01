import {SortDirection} from "mongodb";
import exp from "node:constants";

export type QueryUserInputModel = {
    searchEmailTerm:string
    searchLoginTerm:string
    sortBy?: string
    sortDirection:SortDirection
    pageNumber?:number
    pageSize?:number
}

export type CreateInputUserModel= {
    login:string
    email:string
    password:string
}

export type LoginOrEmailModel = {
    loginOrEmail:string
    password:string
}