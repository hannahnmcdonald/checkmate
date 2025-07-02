import { JSX } from 'react'
import { useAuth } from '@checkmate/state';
import { Navigate, useLocation } from 'react-router-dom'
import React from 'react';

type Props = {
    children: JSX.Element
}

export default function ProtectedRoute({ children }: Props) {
    const { state } = useAuth()
    const location = useLocation()

    if (!state.user) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return children
}
