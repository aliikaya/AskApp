import {
    Avatar,
    Button,
    CardContent,
    InputAdornment,
    OutlinedInput,
  } from "@mui/material";
  import { Link } from "react-router-dom"; 
  import React, { useState } from "react";
  
  function CommentForm(props) {
    const { userId, userName,postId } = props;
    const [text, setText] = useState("")

    const saveComment = () => {
        fetch("/comments" , {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify({
                postId: postId,
                userId: userId,
                text: text,
            }),
        })
        .then((res) => res.json())
        .catch((err) => console.log(err))
    }

    const handleSubmit = () =>{
        saveComment()
        setText("") 
        
    }

    const handleChange = (value) => {
        setText(value);
    }
  
    return (
      <CardContent >
        
        <OutlinedInput 
          
          id="outlined-adornment-amount"
          multiline
          inputProps={{ maxLength: 250 }}  
          fullWidth
          onChange={(i) => handleChange(i.target.value)}
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
          endAdornment = {
            <InputAdornment position="end">
                <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#E6F0E8", // Arka plan rengi
                      color: "#FFFFFF", // Yazı rengi
                      padding: "8px 16px", // Daha küçük iç boşluk
                      borderRadius: "16px", // Kenarların daha küçük oval olması
                      fontWeight: "bold", // Yazı kalınlığı
                      fontSize: "14px", // Yazı boyutunu küçülttük
                      textTransform: "none", // Yazının büyük harfe dönüşmesini engeller
                      boxShadow: "0 3px 8px rgba(0, 0, 0, 0.2)", // Hafif gölge efekti
                      transition: "all 0.3s ease", // Geçiş efekti
                      "&:hover": {
                        backgroundColor: "#E1CAB3", // Hover durumunda arka plan rengi
                        boxShadow: "0 5px 12px rgba(0, 0, 0, 0.3)", // Hover'da gölge
                      },
                    }}

                    onClick = {handleSubmit}
                  >
                    Comment
                  </Button>
            </InputAdornment>
          }
          value={text}
          
        />
      </CardContent>
    );
  }
  
  export default CommentForm;
  