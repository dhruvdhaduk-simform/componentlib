import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
    title: 'Components/Alert',
    component: Alert,
    tags: ['autodocs'], // Optional: Generate documentation automatically
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: ['success', 'danger', 'info', 'warning'],
        },
        dismissible: {
            control: 'boolean',
        },
        children: {
            control: 'text',
        },
        onDismiss: {
            action: 'dismissed', // Log the event when dismissed
        },
        className: {
            control: 'text',
        },
    },
    parameters: {
        layout: 'centered', // Center the component in the Storybook canvas
    },
};

export default meta;
type Story = StoryObj<typeof Alert>;

// Default story
export const Default: Story = {
    args: {
        children: 'This is an info alert message.',
        variant: 'info',
        dismissible: false,
    },
};

// Different variants
export const Success: Story = {
    args: {
        children: 'Success! Your operation was successful.',
        variant: 'success',
    },
};

export const Danger: Story = {
    args: {
        children: 'Error: Something went wrong.',
        variant: 'danger',
    },
};

export const Warning: Story = {
    args: {
        children: 'Warning: This is a potential issue.',
        variant: 'warning',
    },
};

// Dismissible alerts
export const DismissibleInfo: Story = {
    args: {
        children: 'You can dismiss this information alert.',
        variant: 'info',
        dismissible: true,
    },
};

export const DismissibleSuccess: Story = {
    args: {
        children: 'This success message can be closed.',
        variant: 'success',
        dismissible: true,
    },
};
