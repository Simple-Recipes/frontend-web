import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import authService from '../../../services/authService';
import { Container, Card, Typography, TextField, Button, Box, Alert } from '@mui/material';
import '../../../assets/style/app.scss'; // 确保路径正确

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await authService.register(username, email, password); // 使用 registerService 进行注册

      if (response.code === 1) { // 确保成功的判断条件与后端一致
        history.push('/login'); // 注册成功后重定向到登录页面
      } else {
        setError(response.msg);
      }
    } catch (error) {
      console.error('Register error:', error);
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs" className="container">
      <Card sx={{ padding: 4, mt: 8 }}>
        <Typography component="h1" variant="h5" align="center" >
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />
          {error && <Alert severity="error">{error}</Alert>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isLoading}
            sx={{ mt: 3, mb: 2}}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </Button>
        </Box>
      </Card>
    </Container>
  );
};

export default Register;
