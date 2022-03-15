import React from 'react';
import { PieChart, Pie, ResponsiveContainer, Label } from 'recharts';

// const data = [
//     { name: 'Performance', value: 95, fill: 'var(--successColor)' },
// ];

interface Cell {
    name?: string | undefined
    value?: number | undefined
}

interface Props {
    data: Cell[]
    color?: string | undefined
    accentColor?: string | undefined
    label?: string | number | undefined

}

const PieGraph: React.FC<Props> = ({ data, color, accentColor, label }) => {
    return (
        <>
            <div className='chart-container'>
                <ResponsiveContainer width={150} height={150}>
                    <PieChart margin={{ top: 0, left: 0, right: 0, bottom: 0 }} width={150} height={150}>
                        <circle className='circle' cx='50%' cy='50%' r='75' fill={data[0].value! >= 90 ? 'var(--successAccentColor)' : data[0].value! >= 50 && data[0].value! < 90 ? 'var(--warningAccentColor)' : data[0].value! >= 1 && data[0].value! < 50 ? 'var(--failedAccentColor)' : '#e7e7e7'} />
                        <Pie
                            data={data}
                            cx="50%"
                            isAnimationActive={false}
                            cy="50%"
                            endAngle={(data[0].value! / 100) * 360}
                            innerRadius={60}
                            outerRadius={75}
                            fill={data[0].value! >= 90 ? 'var(--successColor)' : data[0].value! >= 50 && data[0].value! < 90 ? 'var(--warningColor)' : data[0].value! >= 1 && data[0].value! < 50 ? 'var(--failedColor)' : '#888'}
                            dataKey="value"
                            strokeWidth={0}
                            cornerRadius={0}
                        >
                            <Label fill={data[0].value! >= 90 ? 'var(--successColor)' : data[0].value! >= 50 && data[0].value! < 90 ? 'var(--warningColor)' : data[0].value! >= 1 && data[0].value! < 50 ? 'var(--failedColor)' : '#888'} value={data[0].value?.toFixed(0)} fontSize='2.5rem' offset={0} position='center' />
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <style jsx>
                {`.chart-container {
                    width: 192px;
                    padding: var(--spacing);
                    margin: auto;
                }
                .circle {
                    z-index: -1
                }`}
            </style>
        </>
    );
}

export default PieGraph