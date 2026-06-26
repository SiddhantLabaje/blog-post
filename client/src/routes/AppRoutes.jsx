import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import BlogListingPage from '../pages/BlogListingPage';
import AddPostPage from '../pages/AddPostPage';
import EditPostPage from '../pages/EditPostPage';
import ViewPostPage from '../pages/ViewPostPage';
import NotFoundPage from '../pages/NotFoundPage';

const AppRoutes = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route path="/" element={<BlogListingPage />} />
      <Route path="/add-post" element={<AddPostPage />} />
      <Route path="/edit-post/:id" element={<EditPostPage />} />
      <Route path="/view-post/:id" element={<ViewPostPage />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Route>
  </Routes>
);

export default AppRoutes;
