import axios from "axios";

export async function searchVideos(q: string) {
  const data = await axios.get(
    "https://www.googleapis.com/youtube/v3/search",
    {
      params: {
        part: "snippet",
        maxResults: "3",
        key: process.env.NEXT_PUBLIC_YOUTUBE_KEY,
        q,
      },
    }
  );
  return data;
}
