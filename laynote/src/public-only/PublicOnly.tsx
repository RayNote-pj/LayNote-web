import React from 'react';
import userAuthStore from '../stores/user.store';
import { Navigate } from 'react-router-dom';
import { JSX } from '@emotion/react/jsx-runtime';

function PublicOnly({ children }: { children: JSX.Element }) {
  const { isAuthenticated, authLoading } = userAuthStore();

  if (authLoading) {
    return null;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PublicOnly;
