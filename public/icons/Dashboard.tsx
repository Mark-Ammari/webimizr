import React from 'react';
import IconProps from 'types/iconProps';

const Dashboard: React.FC<IconProps> = ({ size, color, margin }) => {
    return (
        <>
            <svg className='icon' width={size || '24px'} height={size || '24px'} fill={color} focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="DashboardIcon">
                <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"></path>
            </svg>
            <style jsx>
                {`.icon {
                    margin: ${margin || 0}
                }`}
            </style>
        </>
    )
}

export default Dashboard;