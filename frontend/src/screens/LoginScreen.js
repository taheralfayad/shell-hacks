import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const LoginScreen = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const handleLogin = () => {
    // Typically, you'd send the username and password to your server here
    alert(`Attempting to login with username: ${username}`);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      <Card variant="outlined" style={{ width: '300px' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            color="primary"
            variant="contained"
            style={{ marginTop: '16px' }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginScreen;