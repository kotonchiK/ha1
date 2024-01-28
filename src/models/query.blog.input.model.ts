import {SortDirection} from "mongodb";

export type QueryBlogInputModel = {
    searchNameTerm:string
    sortBy?: string
    sortDirection:SortDirection
    pageNumber?:number
    pageSize?:number
}