import './bar_chart.css';
import React from 'react';

interface BarChartProps<T> {
    data: T[];
    getX: (item: T) => string;
    getY: (item: T) => number;
    labelX: string;
    labelY: string;
}

export function BarChart<T>({
    data,
    getX,
    getY,
    labelX,
    labelY,
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
        <div className="bar-chart-container">
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
