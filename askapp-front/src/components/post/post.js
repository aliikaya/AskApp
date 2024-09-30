import React, { useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import GradeIcon from "@mui/icons-material/Grade";
import Collapse from "@mui/material/Collapse";
import CommentIcon from "@mui/icons-material/Comment";
import { Link } from "react-router-dom";
import { Container } from "@mui/material";
import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentForm";

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
  const { title, text, userId, userName, postId, likes } = props;
  const [expanded, setExpanded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [error, setError] = useState(null);
  const isInitialMount = useRef(true);
  const [isLiked, setIsLiked] = useState(false);
  const [ likeCount, setLikeCount ]= useState(likes.length)
  const [likeId, setLikedId] = useState(null);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    refreshComments();
    console.log(commentList);
  };
  const handleLike = () => {
    setIsLiked(!isLiked);
    if(!isLiked){
      savLike();
      setLikeCount(likeCount + 1)
    }
    else{
      deleteLike();
      setLikeCount(likeCount - 1)
    }

  };

  const refreshComments = () => {
    fetch("/comments?postId=" + postId)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCommentList(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  const savLike = () => {
    fetch("/likes" , {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify({
            postId: postId,
            userId: userId,
        }),
    })
    .then((res) => res.json())
    .catch((err) => console.log(err))
}


const deleteLike = () => {
  fetch("/likes/" +likeId, {
    method:"DELETE",
  })
  .catch((err) => console.log(err))
}


  const checkLikes = () => {
    var likeControl = likes.find((like => like.userId === userId))
    if(likeControl != null){
      setLikedId(likeControl.id)
      setIsLiked(true);
    }
  }

  useEffect(() => {
    if (isInitialMount.current) isInitialMount.current = false;
    else refreshComments();
  }, []);

  useEffect(() => {checkLikes()},[])



  return (
    <div className="postContainer">
      <Card sx={{ width: 800, margin: 3 }}>
        <CardHeader
          avatar={
            <Link to={`/users/${userId}`} style={{ textDecoration: "none" }}>
              <Avatar
                sx={{
                  bgcolor: "#E6F0E8", // Butonun arka plan rengine uyumlu
                  color: "#1B7F79", // Yazı rengini koyu yeşil tonlarına çekelim
                  width: 40, // Avatarın genişliğini ayarladık
                  height: 40, // Avatarın yüksekliğini ayarladık
                  fontWeight: "bold", // Kalın yazı
                  fontSize: "16px", // Yazı boyutunu küçülttük
                  border: "2px solid #E1CAB3", // Butonun hover rengini kenar çizgisi olarak ekledik
                }}
                aria-label="recipe"
              >
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
          <IconButton aria-label="add to favorites" onClick={handleLike}>
            <GradeIcon style={isLiked ? { color: "#FF4858" } : null} />
          </IconButton>
          {likeCount}

          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <CommentIcon sx={{ color: "#1B7F79" }} />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Container fixed>
            {error
              ? "error"
              : isLoaded
              ? commentList.map((comment) => (
                  <Comment userId={1} userName={"USER"} text={comment.text} />
                ))
              : "loading"}
            <CommentForm
              userId={1}
              userName={"USER"}
              postId={postId}
            ></CommentForm>
          </Container>
        </Collapse>
      </Card>
      {/* {title}
      {text} */}
    </div>
  );
}

export default Post;
