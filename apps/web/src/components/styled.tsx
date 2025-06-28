import { styled, YStack, Card, Button, Input } from 'tamagui'

// Page container with padding and background
export const PageContainer = styled(YStack, {
    name: 'PageContainer',
    bg: '$background',
    minHeight: '100vh',
    px: '$4',
    py: '$4',
    gap: '$4',
    ai: 'center',
    jc: 'center',
})

// Consistent card style
export const AppCard = styled(Card, {
    name: 'AppCard',
    elevate: true,
    bordered: true,
    p: '$4',
    gap: '$3',
})

// Primary button
export const PrimaryButton = styled(Button, {
    name: 'PrimaryButton',
    size: '$3',
    theme: 'blue',
    br: '$3',
})

// Secondary button
export const SecondaryButton = styled(Button, {
    name: 'SecondaryButton',
    size: '$3',
    theme: 'alt1',
    br: '$3',
})

// Danger button
export const DangerButton = styled(Button, {
    name: 'DangerButton',
    size: '$3',
    theme: 'red',
    br: '$3',
})

// Input field
export const FormInput = styled(Input, {
    name: 'FormInput',
    size: '$3',
})
