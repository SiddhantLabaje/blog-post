import React from 'react';
import { Alert, Button, Box } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

const ErrorAlert = ({ message, onRetry }) => {
  return (
    <Box sx={{ py: 4 }}>
      <Alert
        severity="error"
        action={
          onRetry && (
            <Button
              color="inherit"
              size="small"
              startIcon={<RefreshIcon />}
              onClick={onRetry}
            >
              Retry
            </Button>
          )
        }
      >
        {message || 'Something went wrong. Please try again.'}
      </Alert>
    </Box>
  );
};

export default ErrorAlert;
