import {VideoType} from "./types/videos.types";
import {PostType} from "./types/posts.types";
import {BlogsType} from "./types/blogs.types";

export type DbType = {
    videos: VideoType[],
    blogs: BlogsType[],
    posts: PostType[]
}
export let db:DbType = {
    videos:[
        {id:1,
    title:'test string',
    author:'test author',
    canBeDownloaded: true,
    minAgeRestriction: null,
    createdAt:"2023-12-04T21:42:23.8912",
    publicationDate:'2023-12-84T21:42:2312',
    availableResolutions:['P144']}
    ],
    blogs:[
        {id: 'id',
        name: 'name',
        description: 'description',
        websiteUrl: "https://badsite.com"}
    ],
    posts:[
        {id: 'id',
        title: 'title',
        shortDescription: 'string',
        content: 'string',
        blogId: 'blogId',
        blogName: 'blogName'}
    ]
}
