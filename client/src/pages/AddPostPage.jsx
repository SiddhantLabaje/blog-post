import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Box } from '@mui/material';
import PostForm from '../components/PostForm';
import PageHeader from '../components/PageHeader';
import { createPost } from '../services/postService';

const AddPostPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      // Normalize tags to array of strings
      const payload = {
        ...data,
        tags: Array.isArray(data.tags) ? data.tags : [],
      };

      await createPost(payload);
      toast.success('Post created successfully!');
      navigate('/');
    } catch (err) {
      toast.error(err.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <PageHeader
        title="Add New Post"
        subtitle="Fill in the details below to create a new blog post"
        breadcrumbs={[
          { label: 'Dashboard', path: '/' },
          { label: 'Posts', path: '/' },
          { label: 'Add Post' },
        ]}
      />
      <PostForm onSubmit={handleSubmit} loading={loading} isEdit={false} />
    </Box>
  );
};

export default AddPostPage;
