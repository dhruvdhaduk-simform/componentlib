import { useEffect, useRef } from 'react';
import './popover.css';

// Define the props for the BarChart component
interface PopoverProps {
    /**
     * State that will hold the open/close status of popover.
     */
    popoverShowing: boolean;
    /**
     * Sets the new state of popover open/close.
     * @param val - New State.
     */
    setPopoverShowing: (val: boolean) => void;
    /**
     * Content to show inside popover.
     */
    children: React.ReactNode;
    /**
     * className to style the popover.
     */
    className?: string;
    /**
     * Inline CSS to style the popover.
     */
    style?: React.CSSProperties;
}

/**
 * This is a popover.
 */
export function Popover({
    popoverShowing,
    setPopoverShowing,
    children,
    className,
    style,
}: PopoverProps) {
    const popoverRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (popoverShowing === true) popoverRef.current?.showPopover();
        else if (popoverShowing === false) popoverRef.current?.hidePopover();
    }, [popoverShowing]);

    useEffect(() => {
        const ctrl = new AbortController();
        if (popoverRef.current) {
            popoverRef.current.addEventListener(
                'toggle',
                (e: Event) => {
                    if ('newState' in e && e.newState === 'open')
                        setPopoverShowing(true);
                    else setPopoverShowing(false);
                },
                { signal: ctrl.signal }
            );
        }

        return () => {
            ctrl.abort();
        };
    }, [setPopoverShowing]);

    return (
        <div
            popover="auto"
            ref={popoverRef}
            className={className}
            style={style}
        >
            {children}
        </div>
    );
}
