import {Request, Response} from "express";

export type ParamType = {id:string}
export type RequestWithParams<P> = Request<P>
export type RequestWithQuery<Q> = Request<{},{},{}, Q>
export type RequestWithBody<B> = Request<{}, {}, B, {}>;
export type RequestWithParamsAndBody<P, B> = Request<P, {}, B>
export type RequestWithParamsAndQuery<P, Q> = Request<P, {}, {}, Q>
export type RequestType = Request<{}, {}, {}, {}>
export type ResponseType<T> = Response<T, {}>
export type Pagination<I> = {
    pagesCount:number
    page:number
    pageSize:number
    totalCount:number
    items: I[]
}