import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
// import TableTab from './TableTab';
import UploadTab from './UploadTab';
import { BsFillPersonFill } from 'react-icons/bs'
import './Navbar.css';
import { Table } from '@mui/material';
import  TableTab from './TableTab';

export default function Navbar() {
const { loginWithRedirect, logout, isAuthenticated, isLoading, error} = useAuth0();


console.log(error)

  return (
    <AppBar position="static" id='navbar'>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <a class="title" href="/">Sustain.io</a>
        </Typography>
        
        {/* <TableTab/> */}
      <UploadTab/>
      <TableTab/>
      {!isAuthenticated ? (<Button 
            color="inherit"
            component={Link}
            onClick={() => loginWithRedirect()}>Login</Button>) 
          : ( <Button color = "inherit" onClick={() => logout({ returnTo: window.location.origin })}>Logout</Button>
          )}
      </Toolbar>
    </AppBar>
  );
}
