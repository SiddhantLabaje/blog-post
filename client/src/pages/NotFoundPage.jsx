import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

const NotFoundPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        textAlign: 'center',
        gap: 2,
      }}
    >
      <Typography
        variant="h1"
        fontWeight={800}
        sx={{ fontSize: { xs: '5rem', sm: '8rem' }, color: 'primary.main', lineHeight: 1 }}
      >
        404
      </Typography>
      <Typography variant="h5" fontWeight={600} color="text.primary">
        Page Not Found
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 400 }}>
        The page you are looking for doesn&apos;t exist or has been moved.
      </Typography>
      <Button
        component={Link}
        to="/"
        variant="contained"
        startIcon={<HomeIcon />}
        sx={{ mt: 2 }}
      >
        Back to Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
