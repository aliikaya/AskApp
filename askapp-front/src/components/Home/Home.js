import React, { useEffect, useState } from "react";
import Post from "../Post/Post";
import { Container } from "@mui/material";

function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postList, setPostList] = useState([]);
  
 

  useEffect(() => {
    fetch("/posts")
      .then(res => res.json())
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
  }, []);

  if (error) {
    return <div>Error!!!</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
        <Container fixed 
        maxWidth="lg" 
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around', // postların daha iyi yerleşmesi için 
          alignItems: 'flex-start', // postlar yukarıdan başlasın
          bgcolor: '#cfe8fc',
          minHeight: '100vh', // container sayfanın tamamını kaplasın
          padding: 2
        }}>
              {postList.map(post => (
                <Post userId = {post.userId} userName = {post.userName} title={post.title} text={post.text}  />
              ))}
            
          
        </Container>
      
    );
  }
}

export default Home;
