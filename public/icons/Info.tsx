import React from 'react';
import IconProps from 'types/iconProps';

const Info: React.FC<IconProps> = ({ size, color, margin }) => {
    return (
        <>
            <svg className='icon' width={size || '24px'} height={size || '24px'} fill={color} focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="Email">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>
            </svg>
            <style jsx>
                {`.icon {
                    margin: ${margin || 0}
                }`}
            </style>
        </>
    )
}

export default Info;