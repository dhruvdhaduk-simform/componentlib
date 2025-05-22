import React from 'react';
import styles from './Badge.module.css';

interface BadgeProps {
    /** Content to show inside Badge */
    badgeContent: React.ReactNode;
    /** Background color of the Badge */
    color?:
        | 'default'
        | 'primary'
        | 'secondary'
        | 'error'
        | 'success'
        | 'warning';
    /** Shape of the Badge */
    overlap?: 'rectangular' | 'circular';
    /** Badge variant */
    variant?: 'standard' | 'dot';
    /** Element on which to show Badge */
    children: React.ReactNode;
    /** Maximum number to display in Badge in case of number content */
    max?: number;
    /** Display Badge when content in 0 or not */
    showZero?: boolean;
    /** Hide the Badge */
    invisible?: boolean;
}

/** Show a Notification Badge on any element. */
export function Badge({
    badgeContent,
    color = 'default',
    overlap = 'rectangular',
    variant = 'standard',
    children,
    max = 99,
    showZero = false,
    invisible = false,
}: BadgeProps) {
    let displayValue: React.ReactNode = badgeContent;

    if (typeof badgeContent === 'number') {
        if (badgeContent > max) {
            displayValue = `${max}+`;
        } else if (badgeContent === 0 && !showZero) {
            displayValue = null;
        }
    }

    if (invisible || displayValue === null || displayValue === undefined) {
        return <>{children}</>;
    }

    const badgeClassNames = [
        styles.badge,
        styles[color],
        styles[overlap],
        styles[variant],
    ].join(' ');

    return (
        <div className={styles.root}>
            {children}
            <span className={badgeClassNames}>
                {variant === 'dot' ? null : displayValue}
            </span>
        </div>
    );
}
