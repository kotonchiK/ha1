import {Request} from "express";



export type RequestWithBody<B> = Request<{}, {}, B, {}>;

export type RequestWithQuery<P> = Request<{},{},{}, P>

export type RequestWithParams<P> = Request<P>

export type RequestWithParamsAndBody<P, B> = Request<P, {}, B>




