import { app } from './settings'
import {videosRouter} from "./videos/router/videos-router";
import {blogsRouter} from "./blogs/router/blogs-router";
import {postsRouter} from "./posts/router/posts-router";

const port = process.env.PORT || 3999


app.use('/videos', videosRouter)

app.use('/blogs', blogsRouter)

app.use('/posts', postsRouter)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

