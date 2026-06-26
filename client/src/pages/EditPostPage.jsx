import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Box } from '@mui/material';
import PostForm from '../components/PostForm';
import PageHeader from '../components/PageHeader';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';
import { fetchPostById, updatePost } from '../services/postService';

const EditPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);

  const loadPost = async () => {
    setFetchLoading(true);
    setFetchError('');
    try {
      const data = await fetchPostById(id);
      setPost(data.post);
    } catch (err) {
      setFetchError(err.message || 'Failed to load post');
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    loadPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSubmit = async (data) => {
    setSubmitLoading(true);
    try {
      const payload = {
        ...data,
        tags: Array.isArray(data.tags) ? data.tags : [],
      };

      await updatePost(id, payload);
      toast.success('Post updated successfully!');
      navigate('/');
    } catch (err) {
      toast.error(err.message || 'Failed to update post');
    } finally {
      setSubmitLoading(false);
    }
  };

  if (fetchLoading) return <LoadingSpinner message="Loading post..." />;
  if (fetchError) return <ErrorAlert message={fetchError} onRetry={loadPost} />;

  return (
    <Box>
      <PageHeader
        title="Edit Post"
        subtitle={`Editing: ${post?.title || ''}`}
        breadcrumbs={[
          { label: 'Dashboard', path: '/' },
          { label: 'Posts', path: '/' },
          { label: 'Edit Post' },
        ]}
      />
      {post && (
        <PostForm
          defaultValues={{
            title: post.title,
            author: post.author,
            email: post.email,
            category: post.category,
            tags: post.tags || [],
            status: post.status,
            thumbnail: post.thumbnail || '',
            shortDescription: post.shortDescription,
            content: post.content,
          }}
          onSubmit={handleSubmit}
          loading={submitLoading}
          isEdit
        />
      )}
    </Box>
  );
};

export default EditPostPage;
