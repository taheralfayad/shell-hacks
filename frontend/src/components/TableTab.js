import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'

export default function UploadTab() {
  return (
        (
          <div>
              <Button 
              color="inherit"
              component={Link}
              to={'/table'}
              >Rankings</Button>
              
          </div>
      )
  );
}
