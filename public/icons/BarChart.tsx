import React from 'react';
import IconProps from 'types/iconProps';

const BarChart: React.FC<IconProps> = ({ size, color, margin }) => {
    return (
        <>
            <svg className='icon' width={size || '24px'} height={size || '24px'} fill={color} focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="BarChartIcon">
                <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"></path>            </svg>
            <style jsx>
                {`.icon {
                    margin: ${margin || 0}
                }`}
            </style>
        </>
    )
}

export default BarChart;