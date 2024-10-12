import React from 'react';
import { Link } from "react-router-dom"; 
import { Typography, Card, CardContent, CardMedia, Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { 
  demoThumbnailUrl, 
  demoVideoUrl, 
  demoVideoTitle, 
  demoChannelUrl, 
  demoChannelTitle 
} from "../utils/constants";

const VideoCard = ({ video: { id: { videoId }, snippet } }) => (
  <Card 
    sx={{ 
      width: { xs: '100%', sm: '358px', md: "320px" }, 
      boxShadow: "none", 
      borderRadius: 2, 
      overflow: 'hidden',
      transition: 'transform 0.3s', 
      '&:hover': { transform: 'scale(1.05)' }, // Add scale effect on hover
    }}
  >
    <Link to={videoId ? `/video/${videoId}` : `/video/cV2gBU6hKfY`}>
      <CardMedia 
        component="img"
        image={snippet?.thumbnails?.high?.url || demoThumbnailUrl} 
        alt={snippet?.title} 
        sx={{ 
          width: '100%', 
          height: { xs: 200, sm: 180 }, // Responsive height
          objectFit: 'cover', // Maintain aspect ratio
        }} 
      />
    </Link>
    <CardContent sx={{ backgroundColor: "#1E1E1E", height: '120px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
        <Typography 
          variant="subtitle1" 
          fontWeight="bold" 
          color="#FFF" 
          sx={{ 
            overflow: 'hidden', 
            whiteSpace: 'nowrap', 
            textOverflow: 'ellipsis', // Add ellipsis for overflow
          }}
        >
          {snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}
        </Typography>
      </Link>
      <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 0.5 }}>
          <Typography variant="subtitle2" color="gray">
            {snippet?.channelTitle || demoChannelTitle}
          </Typography>
          <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
        </Box>
      </Link>
    </CardContent>
  </Card>
);

export default VideoCard;
