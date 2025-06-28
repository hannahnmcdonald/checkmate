import { YStack, XStack, Input, Button, Text, Card } from 'tamagui'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import React from 'react';

export default function RegisterPage() {
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const isFormIncomplete =
        !firstName ||
        !lastName ||
        !username ||
        !email ||
        !password ||
        !confirmPassword

    const handleRegister = async () => {
        setError(null);
        setSuccessMessage(null);
        setLoading(true);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address')
            return
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    username,
                    email,
                    password,
                }),
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.error || 'Registration failed')
            }

            setSuccessMessage('Account created! Redirecting...')
            setTimeout(() => {
                navigate('/profile')
            }, 1500)

        } catch (err) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError('An unknown error occurred')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <YStack
            f={1}
            ai="center"
            jc="center"
            minHeight="100vh"
            bg="$background"
            p="$4"
        >
            <Card elevate size="$4" bordered width={350}>
                <YStack gap="$3">
                    <Text fontSize="$6" fontWeight="700">
                        Register
                    </Text>

                    {error && (
                        <YStack
                            bg="red"
                            br="$2"
                            p="$2"
                        >
                            <Text color="white" fontSize="$2">
                                {error}
                            </Text>
                        </YStack>
                    )}

                    {successMessage && (
                        <YStack bg="green" br="$2" p="$2">
                            <Text color="white" fontSize="$2">
                                {successMessage}
                            </Text>
                        </YStack>
                    )}

                    {isFormIncomplete && (
                        <Text color="gray" fontSize="$2">
                            Please fill out all fields.
                        </Text>
                    )}

                    <Input
                        placeholder="First Name"
                        value={firstName}
                        onChangeText={setFirstName}
                    />

                    <Input
                        placeholder="Last Name"
                        value={lastName}
                        onChangeText={setLastName}
                    />

                    <Input
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                    />

                    <Input
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <Input
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <Input
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                    />

                    {error && (
                        <Text color="red" fontSize="$2">
                            {error}
                        </Text>
                    )}

                    <Button
                        onPress={handleRegister}
                        disabled={loading || isFormIncomplete}
                    >
                        {loading ? 'Creating...' : 'Create Account'}
                    </Button>

                    <XStack jc="center">
                        <Text fontSize="$2">Already have an account?</Text>
                        <Button
                            variant="outlined"
                            size="$2"
                            ml="$2"
                            onPress={() => navigate('/login')}
                        >
                            Log In
                        </Button>
                    </XStack>
                </YStack>
            </Card>
        </YStack>
    )
}
