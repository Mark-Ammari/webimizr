import React from 'react';
import IconProps from 'types/iconProps';

const ArrowUp: React.FC<IconProps> = ({ size, color, margin }) => {
    return (
        <>
            <svg className='icon' width={size || '24px'} height={size || '24px'} fill={color} focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowUpIcon">
                <path d="M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path>
            </svg>
            <style jsx>
                {`.icon {
                    margin: ${margin || 0}
                }`}
            </style>
        </>
    )
}

export default ArrowUp;