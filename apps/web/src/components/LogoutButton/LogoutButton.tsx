import { useAuthStore } from "@checkmate/store";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../Styled";
import React from 'react';

export function LogoutButton() {
    const logout = useAuthStore((s) => s.logout);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <PrimaryButton onPress={handleLogout}>
            Log out
        </PrimaryButton>
    );
}
