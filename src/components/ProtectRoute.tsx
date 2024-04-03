import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase';

export default function ProtectRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const User = auth.currentUser;
  if (User === null) {
    // auth가 없으면 Login
    return <Navigate to={'/login'} />;
  }
  return children;
}
