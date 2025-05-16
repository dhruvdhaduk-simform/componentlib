import './bar_chart.css';
import React from 'react';

// Define the props for the BarChart component
interface BarChartProps<T> {
    /**
     * Data to plot on graph.
     */
    data: T[];
    /**
     * Function that will get the X-axis label from a data point.
     * @param - item in the data.
     * @returns - the X-axis label for that data point.
     */
    getX: (item: T) => string;
    /**
     * Function that will get the Y-axis value from a data point.
     * @param - item in the data.
     * @returns - the Y-axis value for that data point.
     */
    getY: (item: T) => number;
    /**
     * Label for X-axis
     */
    labelX: string;
    /**
     * Label for Y-axis
     */
    labelY: string;
    /**
     * Theme of the component.
     * @default 'light'
     */
    theme?: 'light' | 'dark';
}

/**
 * Renders the Bar Chart from a given dataset.
 */
export function BarChart<T>({
    data,
    getX,
    getY,
    labelX,
    labelY,
    theme = 'light',
}: BarChartProps<T>) {
    const chartData = data.map((item) => ({
        x: getX(item),
        y: getY(item),
    }));

    if (!chartData.length) {
        return <div>No data provided</div>;
    }

    let maxY = chartData[0].y;

    chartData.forEach((item) => {
        if (item.y > maxY) maxY = item.y;
    });

    return (
        <div className={`bar-chart-container ${theme === 'dark' && 'dark'}`}>
            <p>{labelY}</p>
            <div className="bar-chart">
                {chartData.map((item) => (
                    <div
                        style={
                            {
                                '--height': `${(item.y / maxY) * 20}rem`,
                            } as React.CSSProperties
                        }
                        className="bar"
                        key={item.x}
                    >
                        <p className="bar-label-y">{item.y}</p>
                        <p className="bar-label-x">{item.x}</p>
                    </div>
                ))}
            </div>
            <p className="bar-title-x">{labelX}</p>
        </div>
    );
}
