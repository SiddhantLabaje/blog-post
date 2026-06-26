import { useState, useEffect, useCallback } from 'react';
import { fetchPosts, searchPosts } from '../services/postService';

const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');

  const loadPosts = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      let data;
      if (keyword) {
        data = await searchPosts({ keyword, category, status, page, limit });
      } else {
        data = await fetchPosts({ page, limit, category, status });
      }
      setPosts(data.posts || []);
      setTotalPages(data.totalPages || 1);
      setTotalPosts(data.totalPosts || 0);
    } catch (err) {
      setError(err.message || 'Failed to load posts');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [page, limit, keyword, category, status]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const handleSearch = useCallback((value) => {
    setKeyword(value);
    setPage(1);
  }, []);

  const handleCategoryFilter = useCallback((value) => {
    setCategory(value);
    setPage(1);
  }, []);

  const handleStatusFilter = useCallback((value) => {
    setStatus(value);
    setPage(1);
  }, []);

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  return {
    posts,
    loading,
    error,
    page,
    limit,
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
  };
};

export default usePosts;
