import {AvailableResolutions, VideoDbType} from "../types";

let videos: VideoDbType[] = [{
    id:1,
    title:'test string',
    author:'test author',
    canBeDownloaded: true,
    minAgeRestriction: null,
    createdAt:"2023-12-04T21:42:23.8912",
    publicationDate:'2023-12-84T21:42:2312',
    availableResolutions:['P144']

}]

export const videosRepository = {

    getVideoById(id:number) {
        let video:VideoDbType|undefined = videos.find(v => v.id === id)
        return video;
    },
    deleteVideoById (id:number):boolean {
        for(let i:number = 0; i < videos.length; i++) {
            if(videos[i].id === id) {
                videos.splice(i, 1);
                return true;
            }
        }return false;
    },

    createVideo (title:string, author:string, availableResolutions: [], canBeDownloaded:boolean,minAgeRestriction:number) {
        const createdAt= new Date();
        const publicationDate= new Date();

        publicationDate.setDate(createdAt.getDate() + 1)
        const newVideo:VideoDbType = {
            id: +(new Date()),
            title: title,
            author: author,
            canBeDownloaded:canBeDownloaded,
            minAgeRestriction:minAgeRestriction,
            createdAt: createdAt.toISOString(),
            publicationDate: publicationDate.toISOString(),
            availableResolutions: availableResolutions
        }
        videos.push(newVideo)
        return newVideo;
    },

};