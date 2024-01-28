import {SortDirection} from "mongodb";

export type QueryPostnputModel = {
    sortBy?: string
    sortDirection:SortDirection
    pageNumber?:number
    pageSize?:number
}