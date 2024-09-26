import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  let userId = 5;
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: '#A4B3B0' }}>
          <Toolbar>
            {/* Sol kısım: Home ve MenuIcon */}
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{ color: "inherit", textDecoration: 'none' }}
            >
              Home
            </Typography>

            <Box sx={{ flexGrow: 1 }} />

            
            <Button color="inherit" component={Link} to={`/users/${userId}`}>
              User
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default Navbar;
