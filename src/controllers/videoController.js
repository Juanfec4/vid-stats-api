import { generateVidObject } from "../services/generateVidObject.js";
import validators from "../utils/validators.js";
import youtubeDl from "youtube-dl-exec";

const YT_CONFIG = {
  dumpSingleJson: true,
  noCheckCertificates: true,
  noWarnings: true,
  preferFreeFormats: true,
  addHeader: ["referer:youtube.com", "user-agent:googlebot"],
};

const MAX_DURATION = 3;

const handleGetVideo = async (req, res) => {
  const { video_url } = req.query;
  //No param for video_url
  if (!video_url) {
    return res.status(400).json({
      message: `missing video_url param, [video_url:<url>].`,
    });
  }
  //param video_url is not a URL
  if (!validators.isValidUrl(video_url)) {
    return res.status(400).json({
      message: `Invalid video_url, ${video_url} is not a URL.`,
    });
  }
  let video = await youtubeDl(video_url, YT_CONFIG);

  if (!validators.isValidDuration(video.duration_string, MAX_DURATION)) {
    return res.status(400).json({
      message: `Video too long, (since the system uses OPEN AI there's a cap set to ${MAX_DURATION} minutes), uploaded video is ${video.duration_string} long.`,
    });
  }

  video = await generateVidObject(video);

  if (video === null) {
    return res.status(500).json({
      message: `OPEN AI Server error. Please try again later.`,
    });
  }

  return res.status(200).json({
    video,
  });
};

export default {
  handleGetVideo,
};
