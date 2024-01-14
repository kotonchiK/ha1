import {app} from "../src/settings";
import {blogType, VideoDbType} from "../src/types";
import request from 'supertest'
import {videosRouter} from "../src/videos/router/videos-router";

describe('/Blogs API Test', () => {

    let blog: blogType[] = [

    ]


})
describe('/Videos API Tests', () => {





    let video: VideoDbType[] = [
        {
            id: 1,
            title: "test string",
            author: "test author",
            canBeDownloaded: true,
            minAgeRestriction: null,
            createdAt: "2023-12-04T21:42:23.8912",
            publicationDate: "2023-12-84T21:42:2312",
            availableResolutions: [
                "P144"]
        }


    ]
    it('Get all videos', async () => {
        const response: request.Response = await request(app).get('/videos')

        expect(response.status).toBe(200)
        expect(response.body).toEqual(video)


    })
    it('Get video with incorrect ID', async () => {
        const nonExistenVideoId = 999;
        const response = await request(app).get(`/videos/${nonExistenVideoId}`)
        expect(response.status).toBe(404)
    })

    it('Get video with correct id ', async () => {
        const videoId = 1;
        const response = await request(app).get(`/videos/${videoId}`)
        expect(response.status).toBe(200)
    })

    it('Put with correct id', async () => {
        const videoId = 1;
        const putVideo = {
            title: 'Title Updated',
            author: 'Author Updated',
            canBeDownloaded: true,
            minAgeRestriction: 4,
            publicationDate: '2023-12-16T21:32:56.7612',
            availableResolutions: ['P144']
        }

        const response = await request(app).put(`/videos/${videoId}`).send(putVideo)

        expect(response.status).toBe(200)
        expect(response.body.title).toStrictEqual("Title Updated");
        expect(response.body.author).toStrictEqual('Author Updated');
        expect(response.body.availableResolutions).toStrictEqual(["P144"])
        expect(response.body.canBeDownloaded).toBe(true);
        expect(response.body.publicationDate).toStrictEqual("2023-12-16T21:32:56.7612");
        expect(response.body.minAgeRestriction).toBe(4);
    })

    it('Put with the empty body', async () => {

        const videId = 1;
        const putVideo = {};

        const response = await request(app).put(`/videos/${videId}`).send(putVideo)

        expect(response.status).toBe(400)
    })

    test('Put with wrong id', async () => {
        const nonExistentVideoId = 999;
        const updatedVideo = {
            title: 'Title Video Updated',
            author: 'Author Updated',
            canBeDownloaded: true,
            minAgeRestriction: 18,
            publicationDate: '2023-12-16T21:32:56.7612',
            availableResolutions: ['1080']
        }

        const response = await request(app).put(`/videos/${nonExistentVideoId}`).send(updatedVideo)
        expect(response.status).toBe(404)
    })

    test('Post with a the new video', async () => {

        const newVideo = {
            title: 'Fast Auto',
            author: "Dominic",
            availableResolutions:['P1440']
        }

        const response = await request(app).post('/videos').send((newVideo))

        expect(response.status).toBe(201)
        expect(response.body.title).toBe('Fast Auto')
        expect(response.body.author).toBe('Dominic')
        expect(response.body.availableResolutions).toStrictEqual(['P1440'])


    })

    test('Post with the a new video with wrong title ', async () => {
        const newVideo = {title: null, author: 'Dominic', availableResolutions: ['P1080']}


        const response = await request(app).post('/videos').send((newVideo))
        expect(response.status).toBe(400)
    })

    test('Post with the a new video with wrong author', async () => {
        const newVideo = {title: 'Fast Auto', author: null, availableResolutions: ['P1080']}


        const response = await request(app).post('/videos').send((newVideo))
        expect(response.status).toBe(400)
    })

    test('Post with the a new video with wrong availableResolutions', async () => {
        const newVideo = {title: 'Fast Auto', author: 'Dominic', availableResolutions: [null]}


        const response = await request(app).post('/videos').send((newVideo))
        expect(response.status).toBe(400)
    })

    test('Delete all videos', async () => {

        const response = await request(app).delete('/testing/all-data')
        expect(response.status).toBe(204)


    });
    it('Delete video with incorrect ID', async () => {
        const nonExistenVideoId = 999;
        const response = await request(app).delete(`/videos/${nonExistenVideoId}`)
        expect(response.status).toBe(404)
    })

    it('Delete video with correct id ', async () => {
        const videoId = 1;
        const response = await request(app).delete(`/videos/${videoId}`)
        expect(response.status).toBe(204)
    })

});