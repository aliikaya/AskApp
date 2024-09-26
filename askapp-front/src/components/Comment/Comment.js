import {
    Avatar,
    CardContent,
    InputAdornment,
    OutlinedInput,
  } from "@mui/material";
  import { Link } from "react-router-dom"; 
  import React from "react";
  
  function Comment(props) {
    const { text, userId, userName } = props;
  
    return (
      <CardContent >
        
        <OutlinedInput 
          disabled
          id="outlined-adornment-amount"
          multiline
          inputProps={{ maxLength: 25 }}  
          fullWidth
          value= {text} 
          startAdornment={
            <InputAdornment position="start">
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
            </InputAdornment>
          }
          style={{color: "black", backgroundColor:"white"}}
        />
      </CardContent>
    );
  }
  
  export default Comment;
  