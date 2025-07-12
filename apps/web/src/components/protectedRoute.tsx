import { useAuthStore } from '@checkmate/store';
import { Navigate, useLocation } from 'react-router-dom';
import React, { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
}
