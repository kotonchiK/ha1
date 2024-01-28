import {Pagination, ParamType, RequestWithParamsAndBody, ResponseType} from "../src/types";
import {QueryBlogInputModel} from "../src/models/query.blog.input.model";
import {OutputPostType} from "../src/models/posts.models";
import {BlogQueryRepository} from "../src/repository/blog.query.repository";
import {HTTP_STATUSES} from "../src/utils";
import {blogsRouter} from "../src/routers/blogs-router";

blogsRouter.get('/:id/posts', async (req: RequestWithParamsAndBody<ParamType,QueryBlogInputModel>, res: ResponseType<Pagination<OutputPostType>>) => {

    const sortData = {
        searchNameTerm: null,
        sortBy: req.query.sortBy ?? "createdAt",
        sortDirection:req.query.sortDirection ?? "desc",
        pageNumber:req.query.pageNumber ? +req.query.pageNumber : 1,
        pageSize:req.query.pageSize ? +req.query.pageSize :10
    }

    const blogs = 1 //await BlogQueryRepository.getAll(sortData)
    if (!blogs) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
    const blogId = req.params.id
  //  const posts = await blogs.
        // дать посты по blogId / проверить посты / вернуть посты
      //  if(!posts) {
       /// res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
      //  return;
  //  }

    //res.status(HTTP_STATUSES.OK_200).send(posts)

})