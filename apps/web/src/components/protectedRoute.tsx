import { JSX } from 'react'
// Update the import path below to the correct relative path for your project structure
import { useAuth } from '@checkmate/state';
import { Navigate, useLocation } from 'react-router-dom'
import React from 'react';

type Props = {
    children: JSX.Element
}

export default function ProtectedRoute({ children }: Props) {
    const { user } = useAuth()
    const location = useLocation()

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return children
}
