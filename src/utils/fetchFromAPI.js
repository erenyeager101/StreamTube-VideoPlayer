import axios from 'axios';

export const BASE_URL = 'https://youtube-v31.p.rapidapi.com';
export const COMMENT_URL = 'https://youtube-v31.p.rapidapi.com/commentThreads'

const options = {
  params: {
    maxResults: 50,
  },
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
  },
};

export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);

  return data;
};

export const fetchComments = async (videoId) => {
  const { data } = await axios.get(`${COMMENT_URL}?part=snippet&videoId=${videoId}&maxResults=100`, options);

  return data;
};
