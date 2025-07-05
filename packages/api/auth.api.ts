import { UserProfile } from '@checkmate/types';

type LoginParams = {
    email: string;
    password: string;
};

type RegisterParams = {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
};

export async function login({ email, password }: LoginParams): Promise<void> {
    const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: "include"
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Login failed: ${text}`);
    }
}



export async function register({
    firstName,
    lastName,
    username,
    email,
    password,
}: RegisterParams) {
    const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            firstName,
            lastName,
            username,
            email,
            password,
        }),
    });

    if (!res.ok) {
        throw new Error('Registration failed');
    }

    return res.json();
}