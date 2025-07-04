import { YStack, XStack, Text, Card, Theme } from 'tamagui';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@checkmate/state'
import React from 'react'
import { PageContainer, PrimaryButton, FormInput, InlineLink } from '../../components/Styled';
import { login } from '@checkmate/api';

export default function LoginPage() {
    const { dispatch } = useAuth()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const isFormIncomplete = !email || !password

    const handleLogin = async () => {
        setLoading(true)
        setError(null)

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address')
            setLoading(false)
            return
        }

        try {
            const { user } = await login({ email, password })
            dispatch({
                type: 'LOGIN', payload: {
                    user
                }
            })

            navigate('/profile')
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
        <>
            <PageContainer>
                <Card elevate size="$4" bordered width={350}>
                    <YStack gap="$3" p="$4">
                        <Text fontSize="$6" fontWeight="700">
                            Log In
                        </Text>

                        {error && (
                            <Text color="red" fontSize="$1">
                                {error}
                            </Text>
                        )}

                        {isFormIncomplete && (
                            <Text color="gray" fontSize="$1">
                                Please fill out all fields.
                            </Text>
                        )}

                        <FormInput
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail} />

                        <FormInput
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry />

                        <PrimaryButton onPress={handleLogin} disabled={loading || isFormIncomplete}>
                            Log In
                        </PrimaryButton>

                        <XStack jc="center">
                            <Text fontSize="$1">Don't have an account?</Text>
                            <InlineLink
                                variant="outlined"
                                size="$2"
                                ml="$2"
                                onPress={() => navigate('/register')}
                            >
                                Register
                            </InlineLink>
                        </XStack>
                    </YStack>
                </Card>
            </PageContainer>
        </>
    )
}
