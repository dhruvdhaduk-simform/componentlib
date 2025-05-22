import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
    title: 'Components/Badge',
    component: Badge,
    tags: ['autodocs'], // Optional: Generate documentation automatically
    argTypes: {
        badgeContent: { control: 'text' },
        color: {
            control: {
                type: 'select',
                options: [
                    'default',
                    'primary',
                    'secondary',
                    'error',
                    'success',
                    'warning',
                ],
            },
        },
        overlap: {
            control: { type: 'radio' },
            options: ['rectangular', 'circular'],
        },
        variant: {
            control: { type: 'radio' },
            options: ['standard', 'dot'],
        },
        max: { control: { type: 'number', min: 1, max: 999 } },
        showZero: { control: 'boolean' },
        invisible: { control: 'boolean' },
    },
    parameters: {
        layout: 'centered', // Center the component in the Storybook canvas
    },
};

export default meta;

function Template({ rounded = false }: { rounded?: boolean }) {
    return (
        <div
            style={{
                width: 50,
                height: 50,
                backgroundColor: '#333333',
                borderRadius: rounded ? '50%' : '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
            }}
        >
            🔔
        </div>
    );
}

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
    args: {
        badgeContent: 5,
        color: 'default',
        overlap: 'circular',
        variant: 'standard',
        max: 99,
        showZero: false,
        invisible: false,
        children: <Template />,
    },
};

export const PrimaryDot: Story = {
    args: {
        badgeContent: 1,
        color: 'primary',
        overlap: 'circular',
        variant: 'dot',
        children: <Template />,
    },
};

export const ErrorCount: Story = {
    args: {
        badgeContent: 120,
        color: 'error',
        overlap: 'rectangular',
        variant: 'standard',
        max: 99,
        children: <Template />,
    },
};

export const ShowZero: Story = {
    args: {
        badgeContent: 0,
        color: 'secondary',
        overlap: 'rectangular',
        variant: 'standard',
        showZero: true,
        children: <Template />,
    },
};
