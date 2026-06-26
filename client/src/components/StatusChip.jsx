import React from 'react';
import { Chip } from '@mui/material';

const StatusChip = ({ status }) => {
  const isPublished = status === 'Published';

  return (
    <Chip
      label={status}
      size="small"
      color={isPublished ? 'success' : 'default'}
      variant={isPublished ? 'filled' : 'outlined'}
      sx={{ fontWeight: 600, fontSize: '0.7rem' }}
    />
  );
};

export default StatusChip;
