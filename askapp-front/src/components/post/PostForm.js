import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Button, InputAdornment, OutlinedInput, Snackbar, SnackbarContent } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';


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

function PostForm(props) {
  const { userName, userId, refreshPost} = props;
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [open, setOpen] = useState(false);

  const savePost = () => {
    fetch("/posts",
        {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title,
                text: text,
                userId: userId,
            }),
        })
  }
  
 
  
  const handleSubmit = () => {
    savePost();
    setIsSent(true);
    setText("")
    setTitle("")
    refreshPost();
  };

  const handleTitle =(value) =>{
    setTitle(value);
    setIsSent(false);
  }
  const handleText =(value) =>{
    setText(value);
    setIsSent(false);
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsSent(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
         <CloseIcon fontSize="small" /> 
      </IconButton>
    </React.Fragment>
  );


  return (
    <div className="postContainer">
         <Snackbar
        open={isSent}
        autoHideDuration={1500}
        onClose={handleClose}
      >
        <SnackbarContent
          style={{ backgroundColor: "#4CAF50" }} // Yeşil renk
          message="Your post is sent"
          action={action}
        />
      </Snackbar>
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
          title={
            <OutlinedInput
              id="outlined-adornment-amount"
              multiline
              placeholder="Title"
              inputProps={{ maxLength: 25 }}
              fullWidth
              value={title}
              onChange={(i) => handleTitle(i.target.value)}
            ></OutlinedInput>
          }
          titleTypographyProps={{ align: "left" }}
        />

        <CardContent>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            <OutlinedInput
              id="outlined-adornment-amount"
              multiline
              placeholder="Title"
              inputProps={{ maxLength: 250 }}
              fullWidth
              value={text}
              onChange={(i) => handleText(i.target.value)}
              endAdornment={
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
                    Post
                  </Button>
                </InputAdornment>
              }
            ></OutlinedInput>
          </Typography>
        </CardContent>
       
      </Card>
      {/* {title}
      {text} */}
    </div>
  );
}

export default PostForm;
