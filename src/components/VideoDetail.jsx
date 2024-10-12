import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack, Card, CardContent } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { Videos, Loader } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const { id } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
      .then((data) => setVideoDetail(data.items[0]));

    fetchFromAPI(`commentThreads?part=snippet&videoId=${id}&maxResults=5`)
      .then((data) => {
        const fetchedComments = data.items.map(comment => ({
          id: comment.id,
          text: comment.snippet.topLevelComment.snippet.textDisplay,
          author: comment.snippet.topLevelComment.snippet.authorDisplayName,
          publishedAt: comment.snippet.topLevelComment.snippet.publishedAt,
        }));
        setComments(fetchedComments);
      });

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      .then((data) => setVideos(data.items));
  }, [id]);

  if (!videoDetail?.snippet) return <Loader />;

  const {
    snippet: { title, channelId, channelTitle, publishedAt },
    statistics: { viewCount, likeCount },
  } = videoDetail;

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#181818", padding: 2 }}>
      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        {/* Video Player Section */}
        <Box flex={1} sx={{ flexGrow: 1 }}>
          <Box sx={{ width: "100%", zIndex: 1 }}>
            <ReactPlayer 
              url={`https://www.youtube.com/watch?v=${id}`} 
              className="react-player" 
              controls 
              width="100%"
              height="auto"
            />
            <Card sx={{ backgroundColor: "#202020", marginTop: 2 }}>
              <CardContent>
                <Typography color="#fff" variant="h5" fontWeight="bold" gutterBottom>
                  {title}
                </Typography>
                <Stack direction="row" justifyContent="space-between" sx={{ color: "#fff" }} py={1} px={2}>
                  <Link to={`/channel/${channelId}`} style={{ textDecoration: 'none' }}>
                    <Typography variant="subtitle1" color="#fff" sx={{ display: 'flex', alignItems: 'center' }}>
                      {channelTitle}
                      <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
                    </Typography>
                  </Link>
                  <Stack direction="row" gap="20px" alignItems="center">
                    <Typography variant="body1" sx={{ opacity: 0.7 }}>
                      {parseInt(viewCount).toLocaleString()} views
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.7 }}>
                      {parseInt(likeCount).toLocaleString()} likes
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.7 }}>
                      {new Date(publishedAt).toLocaleDateString()}
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Box>

          {/* Top 5 Comments Section */}
          <Box sx={{ marginTop: 4 }}>
            <Typography variant="h6" color="#fff" mb={2}>
              Top Comments
            </Typography>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <Card key={comment.id} sx={{ backgroundColor: "#202020", marginBottom: 2 }}>
                  <CardContent>
                    <Typography variant="body2" color="#fff">
                      {comment.text}
                    </Typography>
                    <Typography variant="caption" color="gray">
                      {comment.author} - {new Date(comment.publishedAt).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography variant="body2" color="gray">
                No comments available.
              </Typography>
            )}
          </Box>
        </Box>

        {/* Related Videos Section */}
        <Box sx={{ width: "300px", px: 2, py: 5, flexShrink: 0 }}>
          <Typography variant="h6" fontWeight="bold" color="#fff" mb={2}>
            Related Videos
          </Typography>
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
