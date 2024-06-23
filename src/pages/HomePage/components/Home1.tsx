import React, { useEffect } from "react";
import { Container, Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';

const BackgroundImage = styled('img')({
  objectFit: 'cover',
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: -1,
  width: '100%',
  height: '100%',
});

const Overlay = styled(Box)({
  zIndex: 1,
  color: 'white',
  textAlign: 'center',
  marginTop: '3rem',
});

const Home1: React.FC = () => {
  useEffect(() => {}, []);

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <BackgroundImage
        src={require("./../../../assets/Image/2.jpg")}
        alt="Background"
      />
      <Overlay>
        <Typography variant="h2" component="h1" gutterBottom>
          Recipe for everyone.
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          Welcome to our recipe paradise, where there are a variety of delicious
          <br />
          recipes, from home-cooked meals to exquisite dishes. Whether you are a
          <br />
          novice or a chef, we have prepared detailed steps and thoughtful tips
          <br />
          for you. Discover more surprising recipes and start your food journey!
        </Typography>
        <Button variant="contained" color="success" size="large" href="#">
          Get Recipe
        </Button>
      </Overlay>
    </Container>
  );
};

export default Home1;
