import { styled, YStack, Card, Button, Input, Text } from 'tamagui'

// Page container with padding and background
export const PageContainer = styled(YStack, {
    name: 'PageContainer',
    bg: '$background',
    minHeight: '100vh',
    px: '$6',
    py: '$8',
    gap: '$8',
    ai: 'center',
    jc: 'center',
    position: 'relative',
    overflow: 'hidden',
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
    bg: '$color2',
    color: '$background',
    hoverStyle: {
        bg: '$color3',
    },
    variants: {
        disabled: {
            true: {
                opacity: 0.5,
            },
        },
    },
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

export const FormInput = styled(Input, {
    name: 'FormInput',
    size: '$3',
    width: '100%',          // 👈 Fixed width
    paddingRight: '$6',      // 👈 Reserve space for LastPass icon
    borderColor: '$color2',
    br: '$2',
})

export const InlineLink = styled(Text, {
    name: 'InlineLink',
    color: '$color',
    textDecorationLine: 'underline',
    fontWeight: '500',
    hoverStyle: {
        color: '$color2',
    },
    fontFamily: '$body',
})
