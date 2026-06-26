import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  Tooltip,
  Button,
  Typography,
  Stack,
  Chip,
  InputAdornment,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import { toast } from 'react-toastify';
import usePosts from '../hooks/usePosts';
import { deletePost, exportPostsCSV } from '../services/postService';
import StatusChip from '../components/StatusChip';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import ErrorAlert from '../components/ErrorAlert';
import ConfirmDialog from '../components/ConfirmDialog';
import PageHeader from '../components/PageHeader';
import { CATEGORIES, STATUS_OPTIONS, ROWS_PER_PAGE_OPTIONS } from '../constants';
import { formatDate, truncateText } from '../utils/formatDate';
import styles from './BlogListingPage.module.css';

const BlogListingPage = () => {
  const navigate = useNavigate();
  const {
    posts,
    loading,
    error,
    page,
    totalPages,
    totalPosts,
    keyword,
    category,
    status,
    loadPosts,
    handleSearch,
    handleCategoryFilter,
    handleStatusFilter,
    handlePageChange,
  } = usePosts();

  const [searchInput, setSearchInput] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);

  const handleSearchSubmit = useCallback(
    (e) => {
      if (e.key === 'Enter' || e.type === 'click') {
        handleSearch(searchInput.trim());
      }
    },
    [searchInput, handleSearch]
  );

  const handleClearSearch = () => {
    setSearchInput('');
    handleSearch('');
  };

  const openDeleteDialog = (id) => {
    setSelectedPostId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedPostId) return;
    setDeleteLoading(true);
    try {
      await deletePost(selectedPostId);
      toast.success('Post deleted successfully');
      setDeleteDialogOpen(false);
      loadPosts();
    } catch (err) {
      toast.error(err.message || 'Failed to delete post');
    } finally {
      setDeleteLoading(false);
      setSelectedPostId(null);
    }
  };

  const handleExport = async () => {
    setExportLoading(true);
    try {
      await exportPostsCSV({ keyword, category, status });
      toast.success('CSV exported successfully');
    } catch (err) {
      toast.error(err.message || 'Export failed');
    } finally {
      setExportLoading(false);
    }
  };

  return (
    <Box>
      <PageHeader
        title="Blog Posts"
        subtitle={`${totalPosts} post${totalPosts !== 1 ? 's' : ''} total`}
        breadcrumbs={[{ label: 'Dashboard', path: '/' }, { label: 'Posts' }]}
      >
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            startIcon={<FileDownloadIcon />}
            onClick={handleExport}
            disabled={exportLoading || !posts.length}
            size="small"
          >
            {exportLoading ? 'Exporting...' : 'Export CSV'}
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/add-post')}
            size="small"
          >
            Add Post
          </Button>
        </Stack>
      </PageHeader>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems={{ sm: 'center' }}
          flexWrap="wrap"
        >
          <TextField
            placeholder="Search by title, author, category..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleSearchSubmit}
            size="small"
            sx={{ minWidth: 260, flexGrow: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" color="action" />
                </InputAdornment>
              ),
              endAdornment: searchInput && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={handleClearSearch} aria-label="clear search">
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            inputProps={{ 'aria-label': 'search posts' }}
          />

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel id="category-filter-label">Category</InputLabel>
            <Select
              labelId="category-filter-label"
              value={category}
              label="Category"
              onChange={(e) => handleCategoryFilter(e.target.value)}
              inputProps={{ 'aria-label': 'filter by category' }}
            >
              <MenuItem value="">All Categories</MenuItem>
              {CATEGORIES.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 130 }}>
            <InputLabel id="status-filter-label">Status</InputLabel>
            <Select
              labelId="status-filter-label"
              value={status}
              label="Status"
              onChange={(e) => handleStatusFilter(e.target.value)}
              inputProps={{ 'aria-label': 'filter by status' }}
            >
              <MenuItem value="">All Status</MenuItem>
              {STATUS_OPTIONS.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            size="small"
            onClick={handleSearchSubmit}
            startIcon={<SearchIcon />}
          >
            Search
          </Button>
        </Stack>
      </Paper>

      {/* Table */}
      <Paper sx={{ overflow: 'hidden' }}>
        {loading ? (
          <LoadingSpinner message="Loading posts..." />
        ) : error ? (
          <ErrorAlert message={error} onRetry={loadPosts} />
        ) : !posts.length ? (
          <EmptyState
            message={keyword || category || status ? 'No posts match your filters' : 'No posts yet'}
            showAction={!keyword && !category && !status}
          />
        ) : (
          <>
            <TableContainer className={styles.tableContainer}>
              <Table stickyHeader aria-label="blog posts table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ minWidth: 60 }}>#</TableCell>
                    <TableCell sx={{ minWidth: 200 }}>Title</TableCell>
                    <TableCell sx={{ minWidth: 130 }}>Author</TableCell>
                    <TableCell sx={{ minWidth: 120 }}>Category</TableCell>
                    <TableCell sx={{ minWidth: 100 }}>Status</TableCell>
                    <TableCell sx={{ minWidth: 120 }}>Created</TableCell>
                    <TableCell align="center" sx={{ minWidth: 130 }}>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {posts.map((post, index) => (
                    <TableRow
                      key={post._id}
                      hover
                      sx={{ '&:last-child td': { border: 0 } }}
                    >
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {(page - 1) * 10 + index + 1}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          fontWeight={600}
                          sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}
                          onClick={() => navigate(`/view-post/${post._id}`)}
                        >
                          {truncateText(post.title, 50)}
                        </Typography>
                        {post.tags?.length > 0 && (
                          <Box sx={{ mt: 0.5, display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                            {post.tags.slice(0, 2).map((tag) => (
                              <Chip
                                key={tag}
                                label={tag}
                                size="small"
                                variant="outlined"
                                sx={{ fontSize: '0.65rem', height: 18 }}
                              />
                            ))}
                            {post.tags.length > 2 && (
                              <Typography variant="caption" color="text.secondary">
                                +{post.tags.length - 2}
                              </Typography>
                            )}
                          </Box>
                        )}
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{post.author}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {post.email}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip label={post.category} size="small" variant="outlined" color="primary" />
                      </TableCell>
                      <TableCell>
                        <StatusChip status={post.status} />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {formatDate(post.createdAt)}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Stack direction="row" spacing={0.5} justifyContent="center">
                          <Tooltip title="View Post">
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => navigate(`/view-post/${post._id}`)}
                              aria-label={`view post ${post.title}`}
                            >
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit Post">
                            <IconButton
                              size="small"
                              color="warning"
                              onClick={() => navigate(`/edit-post/${post._id}`)}
                              aria-label={`edit post ${post.title}`}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete Post">
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => openDeleteDialog(post._id)}
                              aria-label={`delete post ${post.title}`}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              component="div"
              count={totalPosts}
              page={page - 1}
              onPageChange={(_, newPage) => handlePageChange(newPage + 1)}
              rowsPerPage={10}
              rowsPerPageOptions={[10]}
              labelDisplayedRows={({ from, to, count }) =>
                `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`
              }
            />
          </>
        )}
      </Paper>

      <ConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Post"
        message="Are you sure you want to delete this post? This action cannot be undone."
        confirmLabel="Delete"
        loading={deleteLoading}
      />
    </Box>
  );
};

export default BlogListingPage;
