import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import GradeIcon from '@mui/icons-material/Grade';
import Collapse from "@mui/material/Collapse";
import CommentIcon from '@mui/icons-material/Comment';
import { Link } from "react-router-dom";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Post(props) {
  const { title, text, userName, userId } = props;
  const [expanded, setExpanded] = useState(false);
  const[ liked, setLiked] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleLike = () => {
    setLiked(!liked);
  }

  return (
    <div className="postContainer">
      <Card sx={{ width: 800 }}>
        <CardHeader
          avatar={

            <Link to={`/users/${userId}`} style={{ textDecoration: 'none' }}>
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {userName.charAt(0).toUpperCase()}
              </Avatar>
            </Link>


          }

          title={title}
          titleTypographyProps={{ align: "left" }}

        />

        <CardContent>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {text}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites"
            onClick={handleLike}
          >
            
            <GradeIcon style={liked ? { color: "#FF4858" } : null} />

          </IconButton>

          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <CommentIcon sx={{ color: '#1B7F79' }} />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent >
            {/* Ekstra içerik buraya gelebilir */}
            Extra content here.
          </CardContent>
        </Collapse>
      </Card>
      {title}
      {text}
    </div>
  );
}

export default Post;
