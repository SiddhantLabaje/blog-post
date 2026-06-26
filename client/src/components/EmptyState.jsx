import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import { Link } from 'react-router-dom';

const EmptyState = ({ message = 'No posts found', showAction = false }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        gap: 2,
      }}
      role="status"
    >
      <InboxIcon sx={{ fontSize: 64, color: 'text.disabled' }} aria-hidden="true" />
      <Typography variant="h6" color="text.secondary">
        {message}
      </Typography>
      {showAction && (
        <Button
          component={Link}
          to="/add-post"
          variant="contained"
          color="primary"
        >
          Create Your First Post
        </Button>
      )}
    </Box>
  );
};

export default EmptyState;
