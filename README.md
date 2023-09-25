<h1 align="center">Welcome to VidStats API 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.1-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/Juanfec4/vid-stats-api" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

> REST API that enables Youtube video transcriptions & analysis.

### ✨ [Demo](https://vid-stats-api.onrender.com)

## Install

```sh
npm run build
```

## Usage

```sh
npm run start
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DB_CLIENT` = mongodb url

`DB_USER` = mongodb user

`DB_PASS` = mongodb password

`OPENAI_API_KEY` = API KEY

`ALLOW_REGISTER` = TRUE | FALSE

`PORT` = NUMBER

`ORIGIN` = Front end origin

## API Reference

### Register API

```http
  POST /register
```

| Parameter | Type     | Description               |
| :-------- | :------- | :------------------------ |
| `name`    | `string` | **Required**. Your name.  |
| `email`   | `string` | **Required**. Your email. |

#### Response

```json
 {
    "name":"<your name>",
    "email":"<your email>"
    "x-api-key": "<your api key>"
 }
```

### Get Video stats

```http
  GET /api/video
```

| Query parameter | Type     | Description                      |
| :-------------- | :------- | :------------------------------- |
| `video_url`     | `string` | **Required**. YouTube video URL. |

- Will only accept videos shorter than 3 minutes.

#### Request Headers

| Header         | Type     | Description                       |
| :------------- | :------- | :-------------------------------- |
| `x-api-key`    | `string` | **Required**. API key.            |
| `content-type` | `string` | **Required**. "application/json". |

#### Response

```json
{
    "video": {
        "channel": "<channel name>",
        "title": "<video title>",
        "upload_date": "20230925",
        "view_count": 59415,
        "thumbnail": "<thumbnail url>",
        "description": "<description>",
        "transcription": "<transcribed audio>",
        "stats": {
            "occurrences": {
                "1": [
                    "<array>"
                ],
                "2": [
                    "<array>"
                ], <...>
            },
            "longest_word": "<string>",
            "shortest_word": "<string>",
            "avg_word_length": <number>,
            "vocabulary_richness": <score from 0 to 1>,
            "most_common_prefix": "<string>",
            "most_common_suffix": "<string>",
            "common_bigrams": "<string>"
        }
    }
}
```

## Author

👤 **Juan F. Cardenas**

- Website: https://portfolio-site-juanfec4.vercel.app/
- Github: [@Juanfec4](https://github.com/Juanfec4)
- LinkedIn: [@juan-cardenas-aa8a04258](https://linkedin.com/in/juan-cardenas-aa8a04258)

## Show your support

Give a ⭐️ if this project helped you!
