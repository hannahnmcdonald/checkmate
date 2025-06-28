import { YStack, XStack, Input, Button, Text, Card, Theme } from 'tamagui';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import { PageContainer } from '../../components/styled';

export default function LoginPage() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)

    const handleLogin = async () => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })

            if (!response.ok) {
                throw new Error('Invalid credentials')
            }

            navigate('/profile')
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError('An unknown error occurred')
            }
        }
    }

    return (
        <PageContainer>
            <Card elevate size="$4" bordered width={350}>
                <YStack gap="$3">
                    <Text fontSize="$6" fontWeight="700">
                        Log In
                    </Text>

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

                    {error && (
                        <Text color="red" fontSize="$2">
                            {error}
                        </Text>
                    )}

                    <Button onPress={handleLogin}>
                        Log In
                    </Button>

                    <XStack jc="center">
                        <Text fontSize="$2">Don't have an account?</Text>
                        <Button
                            variant="outlined"
                            size="$2"
                            ml="$2"
                            onPress={() => navigate('/register')}
                        >
                            Register
                        </Button>
                    </XStack>
                </YStack>
            </Card>
        </PageContainer>
    )
}
