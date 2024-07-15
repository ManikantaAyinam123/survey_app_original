import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { Icon } from "@iconify/react";

const PrivateRoute = ({ element: Component, allowedRoles }) => {
  const token = localStorage.getItem('token'); 
  const userType = localStorage.getItem('userType');
  const location = useLocation();

  const isAuthenticated = !!token;
  const isAuthorized = allowedRoles.includes(userType);

  useEffect(() => {
    if (isAuthenticated) {
      window.history.pushState(null, null, window.location.href); // Clear history stack
      window.onpopstate = function () {
        window.history.go(1); // Prevent back navigation
      };
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return isAuthorized ? (
    <Component />
  ) : (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Icon icon="ic:outline-do-not-disturb-alt" width="70" height="70" sx={{color: 'black'}} />
      <Typography variant="h5" sx={{fontWeight:'bold',mt:'5px'}}>
        You are not authorized
      </Typography>
      <Typography>It seems like you don't have permission to use this portal.</Typography>
      <Typography>Please sign in with a different account</Typography>
    </Box>
  );
};

export default PrivateRoute;
