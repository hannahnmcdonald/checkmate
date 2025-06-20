import { JSX } from 'react'
import { useAuth } from '../../../packages/auth/AuthProvider'
import { Navigate, useLocation } from 'react-router-dom'

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
