import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Container, Card, Typography, TextField, Button, Box, Alert, CircularProgress } from '@mui/material';
import authService from '../../services/authService';

const ResetPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const location = useLocation();
  const history = useHistory();

  const getTokenFromUrl = (): string => {
    const params = new URLSearchParams(location.search);
    return params.get('token') || '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      const token = getTokenFromUrl();
      const response = await authService.resetPassword(token, newPassword); // 使用 resetPasswordService 进行密码重置

      if (response.code === 1) {
        setMessage('Password has been reset successfully.');
        setTimeout(() => {
          history.push('/login');
        }, 3000);
      } else {
        setError(response.msg);
      }
    } catch (error) {
      console.error('Reset password error:', error);
      setError('Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <Card sx={{ padding: 4, width: '100%' }}>
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          Reset Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="password"
            label="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {error && <Alert severity="error">{error}</Alert>}
          {message && <Alert severity="success">{message}</Alert>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            disabled={isLoading}
            sx={{ mt: 3, mb: 2 }}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Reset Password'}
          </Button>
        </Box>
      </Card>
    </Container>
  );
};

export default ResetPassword;
