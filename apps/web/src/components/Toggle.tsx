import { Tabs } from 'tamagui'
import React from 'react'

type ToggleTabsProps<T extends string> = {
    options: { label: string; value: T }[]
    value: T
    onChange: (val: T) => void
    size?: '$1' | '$2' | '$3'
}

export function ToggleTabs<T extends string>({
    options,
    value,
    onChange,
    size = '$2',
}: ToggleTabsProps<T>) {
    return (
        <Tabs
            value={value}
            onValueChange={(val) => onChange(val as T)}
            orientation="horizontal"
            size={size}
        >
            <Tabs.List>
                {options.map((opt) => (
                    <Tabs.Tab key={opt.value} value={opt.value}>
                        {opt.label}
                    </Tabs.Tab>
                ))}
            </Tabs.List>
        </Tabs>
    )
}
