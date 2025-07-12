import { YStack, XStack, Text, Card, Theme } from 'tamagui'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import React from 'react';
import { register } from '@checkmate/api';
import { useAuthStore } from '@checkmate/store';
import {
    PageContainer,
    PrimaryButton,
    FormInput,
    InlineLink
} from '../../components/Styled';

export default function RegisterPage() {
    const setUser = useAuthStore((s) => s.setUser);
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
            setLoading(false)
            return
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match')
            setLoading(false)
            return
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters');
            setLoading(false);
            return;
        }

        try {
            const { user } = await register({ email, password, firstName, lastName, username })
            setUser(user);

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
        <>
            <PageContainer>
                <Card elevate size="$4" bordered width={350}>
                    <YStack gap="$3" p="$4" width="100%">
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
                                <Text color="white" fontSize="$1">
                                    {successMessage}
                                </Text>
                            </YStack>
                        )}

                        {isFormIncomplete && (
                            <Text color="gray" fontSize="$1">
                                Please fill out all fields.
                            </Text>
                        )}

                        <FormInput
                            placeholder="First Name"
                            value={firstName}
                            onChangeText={setFirstName} />

                        <FormInput
                            placeholder="Last Name"
                            value={lastName}
                            onChangeText={setLastName} />

                        <FormInput
                            placeholder="Username"
                            value={username}
                            onChangeText={setUsername} />

                        <FormInput
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail} />

                        <FormInput
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry />

                        <FormInput
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry />

                        <PrimaryButton
                            onPress={handleRegister}
                            disabled={loading || isFormIncomplete}
                        >
                            {loading ? 'Creating...' : 'Create Account'}
                        </PrimaryButton>

                        <XStack jc="center">
                            <Text fontSize="$1">Already have an account?</Text>
                            <InlineLink
                                variant="outlined"
                                size="$2"
                                ml="$2"
                                onPress={() => navigate('/login')}
                            >
                                Log In
                            </InlineLink>
                        </XStack>
                    </YStack>
                </Card>
            </PageContainer>
        </>
    )
}
