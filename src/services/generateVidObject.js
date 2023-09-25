import fs from "fs";
import https from "https";
import { randomUUID } from "crypto";
import axios from "axios";
import FormData from "form-data";
import { pullStats } from "./pullStats.js";

const OUTPUT_FOLDER = "tmp";
const OPEN_AI_URL = "https://api.openai.com/v1/audio/transcriptions";

//Create folder tmp if it does not exist
const createFolder = () => {
  const folder = `./src/${OUTPUT_FOLDER}`;
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }
};

//Download audio
const downloadAudio = async (url, format) => {
  await createFolder();

  const fileName = `${randomUUID()}.${format}`;
  const filePath = `./src/${OUTPUT_FOLDER}/${fileName}`;

  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const fileStream = fs.createWriteStream(filePath);
      res.pipe(fileStream);

      fileStream.on("error", (error) => {
        reject(error);
      });

      fileStream.on("finish", () => {
        fileStream.close();
        resolve(filePath);
      });
    });
  });
};

//Transcribe audio
const transcribeAudio = async (audioFilePath) => {
  const formData = new FormData();
  formData.append("file", fs.createReadStream(audioFilePath));
  formData.append("model", "whisper-1");
  formData.append("response_format", "json");

  const config = {
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      ...formData.getHeaders(),
    },
  };

  try {
    const response = await axios.post(OPEN_AI_URL, formData, config);
    return response.data;
  } catch (error) {
    console.error(
      "Error posting to OpenAI:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const generateVidObject = async (obj) => {
  const audioFormats = obj.formats.filter(
    (format) =>
      format?.resolution === "audio only" &&
      format?.format_note === "medium" &&
      format?.ext === "webm"
  );
  const audioUrl = audioFormats[0].url;

  // Download the audio file
  const filePath = await downloadAudio(audioUrl, "webm");

  // Transcribe the audio
  try {
    const transcriptData = await transcribeAudio(filePath);
    const stats = await pullStats(transcriptData.text);
    // Clean up: delete the downloaded audio file to save space (optional)
    fs.unlinkSync(filePath);
    return {
      channel: obj?.channel,
      title: obj?.fulltitle,
      upload_date: obj?.upload_date,
      view_count: obj?.view_count,
      thumbnail: obj?.thumbnail,
      description: obj?.description,
      transcription: transcriptData.text,
      stats: stats,
    };
  } catch (e) {
    fs.unlinkSync(filePath);
    return null;
  }
};
