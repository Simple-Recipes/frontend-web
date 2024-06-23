import React, { useState } from 'react';
import { Container, Card, Typography, TextField, Button, Box, Alert } from '@mui/material';
import authService from '../../../services/authService';
import '../../../assets/style/app.scss'

const RequestPasswordReset: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await authService.requestPasswordReset(email);

      if (response.code === 1) {
        setMessage('Password reset link has been sent to your email.');
      } else {
        setError(response.msg);
      }
    } catch (error) {
      console.error('Request password reset error:', error);
      setError('Failed to send password reset link. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs" className="container">
      <Card sx={{ padding: 4, mt: 8 }}>
        <Typography component="h1" variant="h5" align="center" >
          Request Password Reset
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Enter your email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          {message && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{ mt: 3, mb: 2 }}
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </Button>
        </Box>
      </Card>
    </Container>
  );
};

export default RequestPasswordReset;
