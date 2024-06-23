import React, { useEffect } from "react";
import { Container, Grid, Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

const Image = styled('img')({
  width: '100%',
  height: 'auto',
});

const Home2: React.FC = () => {
  useEffect(() => {}, []);

  return (
    <Container sx={{ mt: 5 }}>
      <Grid container spacing={5} mb={5}>
        <Grid item xs={12} md={6}>
          <Image src={require("./../../../assets/Image/3.png")} alt="Reading" />
        </Grid>
        <Grid item xs={12} md={6} container justifyContent="center" alignItems="center">
          <Box textAlign="center">
            <Typography variant="h4" gutterBottom>
              What have you been cooking?
            </Typography>
            <Typography variant="body1">
              The library team would love to know what you have been reading.
              Whether it is to learn a new skill or grow within one, we will
              be able to provide the top content for you!
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6} container justifyContent="center" alignItems="center">
          <Box textAlign="center">
            <Typography variant="h4" gutterBottom>
              Our collection is changing!
            </Typography>
            <Typography variant="body1">
              Try to cook in daily. We are diligent about our
              recipe selection always going to be our top
              priority.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Image src={require("./../../../assets/Image/1.png")} alt="Library" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home2;
