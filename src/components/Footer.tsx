import React from 'react';
import { Container, Box, Typography } from '@mui/material';

export const Footer = () => {
  return (
    <Box className="main-color" py={5}>
      <Container className="d-flex flex-wrap justify-content-between align-items-center">
        <Typography variant="body2" color="white" align="center">
          © Recipe App, Inc
        </Typography>
      </Container>
    </Box>
  );
};
