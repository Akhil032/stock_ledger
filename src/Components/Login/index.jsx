import proxima360 from '../../Assets/proxima360.png';
import { useNavigate } from "react-router";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState } from 'react';
import './style.css';

const theme = createTheme({
  palette: {
    background: {
      default: '#FFFEF2',
    },
    primary: {
      main: '#f44336',
    },
    secondary: {
      main: '#3f51b5',
    },
  },
  typography: {
    fontFamily: 'Arial',
  },
});

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = (event) => {
    event.preventDefault(); // Prevent page reload
    if (!username || !password) {
      alert('Please enter both username and password');
      return;
    }
    localStorage.setItem("userData", JSON.stringify({ username }));
    console.log("Username:", JSON.parse(localStorage.getItem("userData")));
    navigate('/dashboard')
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box className="customBox">
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <img className="logoImage" src={proxima360} alt="Profile" />
            <form onSubmit={handleLogin}>
              <TextField
                margin="normal"
                required
                onChange={(e) => setUsername(e.target.value)}
                id="username"
                label="User Name"
                name="username"
                autoComplete="username"
                autoFocus
                sx={{ width: '80%' }}
              />
              <TextField
                margin="normal"
                required
                sx={{ width: '80%' }}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 3 }}
              >
                Sign In
              </Button>
            </form>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
