import React from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { useAuth } from "../Utils/AuthContext";

const Navbar: React.FC = () => {
  const { isLoggedIn, logout } = useAuth(); // Get state and logout function from context
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push("/login");
  };

  return (
    <AppBar position="static" className="main-color">
      <Container>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Recipe
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button color="inherit" component={NavLink} to="/home">
              Home
            </Button>
            <Button color="inherit" component={NavLink} to="/search">
              Search 
            </Button>
            <Button color="inherit" component={NavLink} to="/publish">
              New
            </Button>
            <Button color="inherit" component={NavLink} to="/plan">
              Plan
            </Button>
            <Button color="inherit" component={NavLink} to="/recommendation">
             Recommendation
            </Button>
            <Button color="inherit" component={NavLink} to="/inventory">
            Inventory 
            </Button>
            <Button color="inherit" component={NavLink} to="/profile">
              Profile
            </Button>
            {isLoggedIn ? (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
