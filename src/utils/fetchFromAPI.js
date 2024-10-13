import axios from 'axios';

// YouTube Data API base URL
export const BASE_URL = 'https://youtube.googleapis.com/youtube/v3';

// API key for Google API
const API_KEY = 'AIzaSyDMTlBdi6Hpse4iRatlLE7es3SQpayJcfI';

// Fetch data from YouTube API with optional pageToken for pagination
export const fetchFromAPI = async (url, params = {}, pageToken = '') => {
  try {
    // Append API key and pageToken to the params object
    const response = await axios.get(`${BASE_URL}/${url}`, {
      params: {
        ...params,
        key: API_KEY, // include the API key
        pageToken,    // include pageToken for pagination if provided
        maxResults: 50, // Increase this to get the maximum number of videos
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching data from YouTube API:', error);
    throw error;
  }
};

// Example function to fetch videos with pagination
export const fetchVideos = async (searchQuery) => {
  let allVideos = [];
  let nextPageToken = '';

  do {
    const { items, nextPageToken: newPageToken } = await fetchFromAPI('search', {
      part: 'snippet',
      q: searchQuery,
      type: 'video',
      maxResults: 50, // Maximum allowed per request
    }, nextPageToken);

    allVideos = [...allVideos, ...items]; // Accumulate results
    nextPageToken = newPageToken; // Update nextPageToken for next request

  } while (nextPageToken); // Continue fetching until no more pages

  return allVideos;
};
