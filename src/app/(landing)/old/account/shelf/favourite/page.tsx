import BookCard2 from './book-item'
import React from 'react'

const FavoritePage = () => {
    const releases = [
        {
            "_id": "6538004c7ca940e8b4160a9e",
            "slug": "atomic-habit-0697-1698168908234",
            "title": "atomic habit",
            "desc": "<p>self help book</p>",
            "categoryId": "6535132e907cbde099bc91d3",
            "genres": [
                "genre2"
            ],
            "img": {
                "image": "79d67b05e49b321e-1698168907374-0.jpg",
                "uid": "79d67b05e49b321e",
                "path": "p1",
                "_id": "6538004c7ca940e8b4160a9f"
            },
            "pageNo": 234,
            "authorName": "James Clear",
            "instanceCount": 0,
            "availableCnt": 0,
            "likesCount": 0,
            "dislikesCount": 0,
            "createdAt": "2023-10-24T17:35:08.242Z",
            "updatedAt": "2023-10-31T19:27:03.939Z",
            "__v": 0,
            "authorId": "65414897b7027916049a953c",
            "language": "English"
        },
        {
            "_id": "653801117ca940e8b4160b0b",
            "slug": "cant-hurt-me-2567-1698169105108",
            "title": "cant hurt me",
            "desc": "<p>the best book ever</p>",
            "categoryId": "6535140c907cbde099bc91f7",
            "genres": [
                "genre2"
            ],
            "img": {
                "image": "dfd34bba9968f1ca-1698169104357-0.jpg",
                "images": [
                    "dfd34bba9968f1ca-1698169104769-0.jpg"
                ],
                "uid": "dfd34bba9968f1ca",
                "path": "p1",
                "_id": "653801117ca940e8b4160b0c"
            },
            "pageNo": 234,
            "authorName": "David Goggins",
            "instanceCount": 0,
            "availableCnt": 0,
            "likesCount": 0,
            "dislikesCount": 0,
            "createdAt": "2023-10-24T17:38:25.110Z",
            "updatedAt": "2023-10-31T19:36:59.767Z",
            "__v": 0,
            "authorId": "654144f0b7027916049a94df",
            "language": "English"
        },
        {
            "_id": "653801a57ca940e8b4160b5a",
            "slug": "the-power-of-now-8026-1698169253636",
            "title": "the power of now",
            "desc": "<p>i like this book</p>",
            "categoryId": "6535140c907cbde099bc91f7",
            "genres": [
                "genre2"
            ],
            "img": {
                "image": "10e0b765ca42fc68-1698169253080-0.jpg",
                "images": [
                    "10e0b765ca42fc68-1698169253362-0.jpg"
                ],
                "uid": "10e0b765ca42fc68",
                "path": "p1",
                "_id": "653801a57ca940e8b4160b5b"
            },
            "pageNo": 34,
            "authorName": "Eckhart Tolle",
            "instanceCount": 0,
            "availableCnt": 0,
            "likesCount": 0,
            "dislikesCount": 0,
            "createdAt": "2023-10-24T17:40:53.638Z",
            "updatedAt": "2023-10-31T19:37:07.580Z",
            "__v": 0,
            "authorId": "654146aeb7027916049a94fe",
            "language": "English"
        },
        {
            "_id": "65380a2f7ca940e8b4160c6a",
            "slug": "power-2352-1698171439519",
            "title": "power",
            "desc": "<p>powerful book</p>",
            "categoryId": "6535140c907cbde099bc91f7",
            "genres": [
                "Science,Self-help"
            ],
            "img": {
                "image": "3b15545da405e184-1698171439198-0.png",
                "uid": "3b15545da405e184",
                "path": "p1",
                "_id": "65380a2f7ca940e8b4160c6b"
            },
            "pageNo": 221,
            "authorName": " Naomi Alderman",
            "instanceCount": 0,
            "availableCnt": 0,
            "likesCount": 0,
            "dislikesCount": 0,
            "createdAt": "2023-10-24T18:17:19.521Z",
            "updatedAt": "2023-10-31T19:37:16.015Z",
            "__v": 0,
            "authorId": "65414d87b7027916049a96e4",
            "language": "English"
        }
    ]
    return (
        <div className="flex flex-col w-full gap-4 h-full mb-20 bg-slate-200 px-4 md:px-10 py-8 rounded-lg">
            {releases?.map((book, i) => {
                return <BookCard2 key={i} book={book} category='sth'/>
            })
            }
        </div >
    )
}

export default FavoritePage