import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import authService from '../../services/authService'; 
import { useAuth } from "../../Utils/AuthContext";
import { Container, Card, Typography, TextField, Button, Box, Alert, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import '../../assets/style/app.scss'; 

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("user"); // 默认是用户
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const history = useHistory();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // 根据选择的角色执行不同的登录请求
      const response = await authService.login(username, password, role); 

      if (response.code === 1) {
        const { token, userId } = response.data;
        login(token);
        history.push("/home");
      } else {
        setError(response.msg);
      }
    } catch (error) {
      setError("Invalid username, password, or role");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs" className="login-container" sx={{ mt: { xs: 4, sm: 8 } }}>
      <Card sx={{ padding: { xs: 2, sm: 4 }, mt: { xs: 4, sm: 8 } }}>
        <Typography component="h1" variant="h5" align="center">
          Login
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {/* 选择登录身份 */}
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="role-label">Login as</InputLabel>
            <Select
              labelId="role-label"
              id="role-select"
              value={role}
              label="Login as"
              onChange={(e) => setRole(e.target.value as string)}
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>

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
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />

          <Box display="flex" justifyContent="space-between" mt={2} mb={2}>
            <Link to="/register" className="link-text">
              Register
            </Link>
            <Link to="/request-password-reset" className="link-text">
              Forgot Password?
            </Link>
          </Box>

          {error && <Alert severity="error">{error}</Alert>}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isLoading}
            sx={{ mt: 3, mb: 2 }}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </Box>
      </Card>
    </Container>
  );
};

export default Login;
