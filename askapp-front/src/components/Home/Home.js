import React, { useEffect, useState } from "react";
import Post from "../Post/Post";
import { Box } from "@mui/material"; // Box bileşenini ekliyoruz.
import PostForm from "../Post/PostForm";

function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postList, setPostList] = useState([]);

  const refreshPost = () => {
    fetch("/posts")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPostList(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }

  useEffect(() => {
    refreshPost()
  }, []);

  if (error) {
    return <div>Error!!!</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column', // Postları dikey yerleştir
          alignItems: 'center', // Ortalamak için
          justifyContent: 'flex-start', // Yukarıdan başlatmak için
          bgcolor: '#F1F1F1',
          minHeight: '100vh', // Minimum yükseklik, tüm ekranı kaplasın
          padding: 2
           
        }}
      >
        <PostForm userId={1}
            userName={"sdf"}
            refreshPost = {refreshPost}
            />
        {postList.map((post) => (
          <Post
            likes = {post.postLike}
            postId = {post.id}
            userId={post.userId}
            userName={post.userName}
            title={post.title}
            text={post.text}
          />
        ))}
      </Box>
    );
  }
}

export default Home;
