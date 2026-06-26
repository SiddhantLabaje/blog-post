import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Chip,
  Button,
  Divider,
  Avatar,
  Stack,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Tooltip,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import CategoryIcon from '@mui/icons-material/Category';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import UpdateIcon from '@mui/icons-material/Update';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';
import StatusChip from '../components/StatusChip';
import ConfirmDialog from '../components/ConfirmDialog';
import PageHeader from '../components/PageHeader';
import { fetchPostById, deletePost } from '../services/postService';
import { formatDate, formatDateTime } from '../utils/formatDate';
import { DEFAULT_THUMBNAIL } from '../constants';
import styles from './ViewPostPage.module.css';

const InfoItem = ({ icon, label, value }) => (
  <Box className={styles.infoItem}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary', mb: 0.5 }}>
      {icon}
      <Typography variant="caption" fontWeight={600} textTransform="uppercase" letterSpacing={0.5}>
        {label}
      </Typography>
    </Box>
    <Typography variant="body2" color="text.primary">
      {value}
    </Typography>
  </Box>
);

const ViewPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const loadPost = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchPostById(id);
      setPost(data.post);
    } catch (err) {
      setError(err.message || 'Failed to load post');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await deletePost(id);
      toast.success('Post deleted successfully');
      navigate('/');
    } catch (err) {
      toast.error(err.message || 'Failed to delete post');
    } finally {
      setDeleteLoading(false);
      setDeleteDialogOpen(false);
    }
  };

  if (loading) return <LoadingSpinner message="Loading post..." />;
  if (error) return <ErrorAlert message={error} onRetry={loadPost} />;
  if (!post) return null;

  const thumbnailSrc = post.thumbnail || DEFAULT_THUMBNAIL;

  return (
    <Box>
      <PageHeader
        title="Post Details"
        breadcrumbs={[
          { label: 'Dashboard', path: '/' },
          { label: 'Posts', path: '/' },
          { label: 'View Post' },
        ]}
      >
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/')}
            size="small"
          >
            Back
          </Button>
          <Button
            variant="outlined"
            color="warning"
            startIcon={<EditIcon />}
            onClick={() => navigate(`/edit-post/${id}`)}
            size="small"
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => setDeleteDialogOpen(true)}
            size="small"
          >
            Delete
          </Button>
        </Stack>
      </PageHeader>

      <Grid container spacing={3}>
        {/* Main Content */}
        <Grid item xs={12} lg={8}>
          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
            <CardMedia
              component="img"
              image={thumbnailSrc}
              alt={`Thumbnail for ${post.title}`}
              className={styles.thumbnail}
              onError={(e) => {
                e.target.src = DEFAULT_THUMBNAIL;
              }}
            />
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                <Chip label={post.category} color="primary" size="small" />
                <StatusChip status={post.status} />
              </Box>

              <Typography variant="h4" fontWeight={700} sx={{ mb: 2, lineHeight: 1.3 }}>
                {post.title}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: '0.85rem' }}>
                    {post.author?.charAt(0)?.toUpperCase()}
                  </Avatar>
                  <Box>
                    <Typography variant="body2" fontWeight={600}>
                      {post.author}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formatDate(post.createdAt)}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {post.tags?.length > 0 && (
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
                  {post.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={`#${tag}`}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: '0.75rem' }}
                    />
                  ))}
                </Box>
              )}

              <Paper
                variant="outlined"
                sx={{ p: 2.5, mb: 3, backgroundColor: 'grey.50', borderRadius: 2 }}
              >
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                  Summary
                </Typography>
                <Typography variant="body1" color="text.secondary" fontStyle="italic">
                  {post.shortDescription}
                </Typography>
              </Paper>

              <Divider sx={{ mb: 3 }} />

              <Typography
                variant="body1"
                className={styles.postContent}
                sx={{ lineHeight: 1.9, color: 'text.primary' }}
              >
                {post.content}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar Meta */}
        <Grid item xs={12} lg={4}>
          <Stack spacing={2}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                Post Details
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Stack spacing={2.5}>
                <InfoItem
                  icon={<PersonIcon fontSize="small" />}
                  label="Author"
                  value={post.author}
                />
                <InfoItem
                  icon={<EmailIcon fontSize="small" />}
                  label="Email"
                  value={post.email}
                />
                <InfoItem
                  icon={<CategoryIcon fontSize="small" />}
                  label="Category"
                  value={post.category}
                />
                <InfoItem
                  icon={<CalendarTodayIcon fontSize="small" />}
                  label="Published"
                  value={formatDateTime(post.createdAt)}
                />
                <InfoItem
                  icon={<UpdateIcon fontSize="small" />}
                  label="Last Updated"
                  value={formatDateTime(post.updatedAt)}
                />
              </Stack>
            </Paper>

            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                Actions
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Stack spacing={1.5}>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<EditIcon />}
                  onClick={() => navigate(`/edit-post/${id}`)}
                >
                  Edit Post
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  fullWidth
                  startIcon={<DeleteIcon />}
                  onClick={() => setDeleteDialogOpen(true)}
                >
                  Delete Post
                </Button>
              </Stack>
            </Paper>
          </Stack>
        </Grid>
      </Grid>

      <ConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Post"
        message={`Are you sure you want to delete "${post?.title}"? This action cannot be undone.`}
        loading={deleteLoading}
      />
    </Box>
  );
};

export default ViewPostPage;
