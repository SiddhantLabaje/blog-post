import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  Button,
  Chip,
  Stack,
  Paper,
  Typography,
  Divider,
  CircularProgress,
  Autocomplete,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES, STATUS_OPTIONS } from '../constants';
import styles from './PostForm.module.css';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PostForm = ({ defaultValues, onSubmit, loading = false, isEdit = false }) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      author: '',
      email: '',
      category: '',
      tags: [],
      status: 'Draft',
      thumbnail: '',
      shortDescription: '',
      content: '',
      ...defaultValues,
    },
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label={isEdit ? 'Edit post form' : 'Add post form'}
    >
      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
              Post Information
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Stack spacing={3}>
              {/* Title */}
              <TextField
                label="Post Title"
                fullWidth
                required
                error={!!errors.title}
                helperText={errors.title?.message}
                inputProps={{ 'aria-required': 'true', 'aria-label': 'Post title' }}
                {...register('title', {
                  required: 'Title is required',
                  minLength: { value: 3, message: 'Title must be at least 3 characters' },
                })}
              />

              {/* Short Description */}
              <TextField
                label="Short Description"
                fullWidth
                required
                multiline
                rows={2}
                error={!!errors.shortDescription}
                helperText={errors.shortDescription?.message}
                inputProps={{ 'aria-required': 'true', 'aria-label': 'Short description' }}
                {...register('shortDescription', {
                  required: 'Short description is required',
                })}
              />

              {/* Content */}
              <TextField
                label="Post Content"
                fullWidth
                required
                multiline
                rows={10}
                error={!!errors.content}
                helperText={errors.content?.message}
                inputProps={{ 'aria-required': 'true', 'aria-label': 'Post content' }}
                {...register('content', {
                  required: 'Content is required',
                })}
              />
            </Stack>
          </Paper>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} lg={4}>
          <Stack spacing={3}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                Author Details
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Stack spacing={3}>
                {/* Author */}
                <TextField
                  label="Author Name"
                  fullWidth
                  required
                  error={!!errors.author}
                  helperText={errors.author?.message}
                  inputProps={{ 'aria-required': 'true', 'aria-label': 'Author name' }}
                  {...register('author', { required: 'Author is required' })}
                />

                {/* Email */}
                <TextField
                  label="Email Address"
                  type="email"
                  fullWidth
                  required
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  inputProps={{ 'aria-required': 'true', 'aria-label': 'Email address' }}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: EMAIL_REGEX,
                      message: 'Please enter a valid email address',
                    },
                  })}
                />
              </Stack>
            </Paper>

            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                Post Settings
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Stack spacing={3}>
                {/* Category */}
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: 'Category is required' }}
                  render={({ field }) => (
                    <FormControl fullWidth required error={!!errors.category}>
                      <InputLabel id="category-label">Category</InputLabel>
                      <Select
                        {...field}
                        labelId="category-label"
                        label="Category"
                        inputProps={{ 'aria-label': 'Category' }}
                      >
                        {CATEGORIES.map((cat) => (
                          <MenuItem key={cat} value={cat}>
                            {cat}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.category && (
                        <FormHelperText>{errors.category.message}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                />

                {/* Status */}
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel id="status-label">Status</InputLabel>
                      <Select
                        {...field}
                        labelId="status-label"
                        label="Status"
                        inputProps={{ 'aria-label': 'Status' }}
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <MenuItem key={s} value={s}>
                            {s}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />

                {/* Tags */}
                <Controller
                  name="tags"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      multiple
                      freeSolo
                      options={[]}
                      value={value || []}
                      onChange={(_, newValue) => onChange(newValue)}
                      renderTags={(tagValue, getTagProps) =>
                        tagValue.map((option, index) => (
                          <Chip
                            key={option}
                            label={option}
                            size="small"
                            {...getTagProps({ index })}
                          />
                        ))
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Tags"
                          placeholder="Type and press Enter"
                          helperText="Press Enter to add a tag"
                          inputProps={{ ...params.inputProps, 'aria-label': 'Tags' }}
                        />
                      )}
                    />
                  )}
                />

                {/* Thumbnail */}
                <TextField
                  label="Thumbnail URL"
                  fullWidth
                  placeholder="https://example.com/image.jpg"
                  error={!!errors.thumbnail}
                  helperText={errors.thumbnail?.message || 'Optional: paste an image URL'}
                  inputProps={{ 'aria-label': 'Thumbnail URL' }}
                  {...register('thumbnail')}
                />
              </Stack>
            </Paper>

            {/* Action Buttons */}
            <Box className={styles.actionButtons}>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate(-1)}
                fullWidth
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <SaveIcon />}
                disabled={loading}
                fullWidth
              >
                {loading ? 'Saving...' : isEdit ? 'Update Post' : 'Create Post'}
              </Button>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PostForm;
