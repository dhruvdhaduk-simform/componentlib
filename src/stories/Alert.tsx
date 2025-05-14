import { useRef, useState } from 'react';
import '@/index.css';

// Define the variants for the Alert component
type AlertVariant = 'success' | 'danger' | 'info' | 'warning';

// Define the props for the Alert component
interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * The message content of the alert.
     */
    children: React.ReactNode;
    /**
     * The variant of the alert (determines color and icon if used).
     * @default 'info'
     */
    variant?: AlertVariant;
    /**
     * Whether the alert can be dismissed with a close button.
     * @default false
     */
    dismissible?: boolean;
    /**
     * Optional class names to apply to the alert container.
     */
    className?: string;
    /**
     * Callback function when the alert is dismissed.
     */
    onDismiss?: () => void;
}

export function Alert({
    children,
    variant = 'info',
    dismissible = false,
    className,
    onDismiss,
    ...rest
}: AlertProps) {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) {
        return null; // Don't render if dismissed
    }

    // Define base styles using Tailwind classes
    const baseStyles = 'p-4 rounded-md relative';

    // Define variant specific styles
    const variantStyles: Record<AlertVariant, string> = {
        success: 'bg-green-100 border border-green-400 text-green-700',
        danger: 'bg-red-100 border border-red-400 text-red-700',
        info: 'bg-blue-100 border border-blue-400 text-blue-700',
        warning: 'bg-yellow-100 border border-yellow-400 text-yellow-700',
    };

    // Combine styles based on props
    const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${className}`;

    const handleDismiss = () => {
        setIsVisible(false);
        if (onDismiss) {
            onDismiss();
        }
    };

    return (
        <div className={combinedStyles} role="alert" {...rest}>
            <div className="flex items-center gap-2">
                {/* Optional: Add icons based on variant here */}
                {/* For simplicity, we'll just show the text */}
                <div className="flex-grow">{children}</div>
                {dismissible && (
                    <button
                        className="ml-auto text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-md cursor-pointer"
                        onClick={handleDismiss}
                        aria-label="Dismiss"
                    >
                        {/* Simple 'X' icon */}
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            ></path>
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
}

export interface AlertStatus {
    isShowing: boolean;
    varient?: AlertVariant;
    message: string;
}

type AlertContainerProps = {
    status: AlertStatus;
} & React.PropsWithChildren;

export function AlertContainer({ status }: AlertContainerProps) {
    return (
        <div
            className="alert-container"
            style={{ display: status.isShowing ? 'block' : 'none' }}
        >
            <Alert variant={status.varient}>{status.message}</Alert>
        </div>
    );
}

export function useAlert() {
    const [status, setStatus] = useState<AlertStatus>({
        isShowing: false,
        message: '',
    });

    const alertTimeout = useRef(-1);

    const showAlert = (
        varient: AlertVariant,
        message: string,
        duration?: number
    ) => {
        clearTimeout(alertTimeout.current);

        setStatus({
            isShowing: true,
            varient,
            message,
        });

        alertTimeout.current = setTimeout(() => {
            setStatus({ isShowing: false, message: '' });
        }, duration || 1000);
    };

    return [status, showAlert] as const;
}
