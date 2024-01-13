import { app } from './settings'
import {videosRouter} from "./routers/videos-router";
import {blogsRouter} from "./routers/blogs-router";

const port = process.env.PORT || 3999

app.use('/videos', videosRouter)

app.use('/blogs', blogsRouter)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

