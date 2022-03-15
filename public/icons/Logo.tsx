import React from 'react';
import IconProps from 'types/iconProps';

const SEOLYZER: React.FC<IconProps> = ({ size, margin, color }) => {
    return (
        <>
            <svg className='icon' fill={color} xmlns="http://www.w3.org/2000/svg" height={size || '32px'} width={size || '32px'} viewBox="0 0 512 512">
                <path xmlns="http://www.w3.org/2000/svg" d="M104 496H72a24 24 0 01-24-24V328a24 24 0 0124-24h32a24 24 0 0124 24v144a24 24 0 01-24 24zM328 496h-32a24 24 0 01-24-24V232a24 24 0 0124-24h32a24 24 0 0124 24v240a24 24 0 01-24 24zM440 496h-32a24 24 0 01-24-24V120a24 24 0 0124-24h32a24 24 0 0124 24v352a24 24 0 01-24 24zM216 496h-32a24 24 0 01-24-24V40a24 24 0 0124-24h32a24 24 0 0124 24v432a24 24 0 01-24 24z" />
            </svg>
            <style jsx>
                {`.icon {
                    margin: ${margin || 0}
                }`}
            </style>
        </>
    )
}

export default SEOLYZER;