import React from 'react';
import IconProps from 'types/iconProps';

const Menu: React.FC<IconProps> = ({ size, color, margin, onClick }) => {
    return (
        <>
            <svg onClick={onClick} className='icon' fill={color} focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="MenuIcon">
                <path d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z"></path>
            </svg>
            <style jsx>
                {`.icon {
                    margin: ${margin || 0};
                    cursor: pointer;
                    transition: ease-in-out 250ms;
                    height: ${size || '24px'};
                    width: ${size || '24px'}
                }
                .icon:hover {
                    opacity: 0.5
                }`}
            </style>
        </>
    )
}

export default Menu;