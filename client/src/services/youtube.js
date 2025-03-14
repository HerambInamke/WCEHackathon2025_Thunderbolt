import axios from 'axios';

const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

export const fetchYouTubeResources = async (career, skills) => {
  if (!import.meta.env.VITE_YOUTUBE_API_KEY) {
    throw new Error('YouTube API key is not configured');
  }

  try {
    const searchQueries = [
      `${career.name} course playlist`,
      ...skills.map(skill => `${skill} for ${career.name}`)
    ];

    const videoPromises = searchQueries.map(query =>
      axios.get(YOUTUBE_API_URL, {
        params: {
          part: 'snippet',
          maxResults: 3,
          q: query,
          type: 'video',
          videoDuration: 'long', // Fetch videos between 4-20 minutes (long videos can also be used)
          key: import.meta.env.VITE_YOUTUBE_API_KEY,
          relevanceLanguage: 'en'
        }
      })
    );

    const responses = await Promise.all(videoPromises);

    const videos = responses.flatMap(response =>
      response.data.items.map(item => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.medium.url,
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`
      }))
    );

    const uniqueVideos = Array.from(new Map(videos.map(v => [v.id, v])).values());
    return uniqueVideos.slice(0, 3);
  } catch (error) {
    console.error('Error fetching YouTube resources:', error);
    throw error;
  }
};
