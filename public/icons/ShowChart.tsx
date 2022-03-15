import React from 'react';
import IconProps from 'types/iconProps';

const ShowChart: React.FC<IconProps> = ({ size, color, margin }) => {
    return (
        <>
            <svg className='icon' width={size || '24px'} height={size || '24px'} fill={color} focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ShowChartIcon">
                <path d="m3.5 18.49 6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"></path>
            </svg>
            <style jsx>
                {`.icon {
                    margin: ${margin || 0}
                }`}
            </style>
        </>
    )
}

export default ShowChart;