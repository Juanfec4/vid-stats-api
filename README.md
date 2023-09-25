<h1 align="center">Welcome to VidStats API 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-2.1.1-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/Juanfec4/vid-stats-api" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

> REST API that enables Youtube video transcriptions & analysis.

VidStats API is a REST API that utilizes Whisper AI (Open AI) to generate video transcriptions. The user provides a valid (shorter than 3 minutes) youtube video link, and the server downloads the file, transcribes it and sends back a response with key details, and some stats derived from the text-version of the video.

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

To run this project, you will need to add the following environment variables to your `.env` file:

| Variable         | Type      | Description                                |
| :--------------- | :-------- | :----------------------------------------- |
| `DB_CLIENT`      | `string`  | **Required**. Mongodb url.                 |
| `DB_USER`        | `string`  | **Required**. Mongodb user.                |
| `DB_PASS`        | `string`  | **Required**. Mongodb password.            |
| `OPENAI_API_KEY` | `string`  | **Required**. Api key.                     |
| `ALLOW_REGISTER` | `boolean` | **Required**. `True` or `False`.           |
| `PORT`           | `number`  | **Required**. Port.                        |
| `ORIGIN`         | `string`  | **Required**. Front end origin (for CORS). |

## API Reference

### Register API

Used to get an "x-api-key". (currently disabled by `.env`).

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

Used to get video stats from a specific video by passing in the video's url. (max 3 minutes).

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
        "upload_date": "<number>",
        "view_count": "<number>",
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
                ], "<...>"
            },
            "longest_word": "<string>",
            "shortest_word": "<string>",
            "avg_word_length": "<number>",
            "vocabulary_richness": "<score from 0 to 1>",
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
