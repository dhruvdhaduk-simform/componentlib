import type { Meta, StoryObj } from '@storybook/react';
import { Popover } from './Popover';
import { useState } from 'react';
import { Button } from './Button';

const meta: Meta<typeof Popover> = {
    title: 'Components/Popover',
    component: Popover,
    tags: ['autodocs'], // Optional: Generate documentation automatically
    parameters: {
        layout: 'centered', // Center the component in the Storybook canvas
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => {
        const [popoverShowing, setPopoverShowing] = useState(false); // eslint-disable-line

        return (
            <>
                <Button
                    label="Open Popover"
                    primary
                    onClick={() => setPopoverShowing(true)}
                />
                <Popover
                    popoverShowing={popoverShowing}
                    setPopoverShowing={setPopoverShowing}
                    style={{
                        border: '1.5px solid black',
                        borderRadius: '1rem',
                        padding: '1rem',
                    }}
                >
                    <h1>This is a Popover.</h1>
                    <Button
                        label="Close Popover"
                        primary
                        onClick={() => setPopoverShowing(false)}
                    />
                </Popover>
            </>
        );
    },
    args: {},
};
