import { useRouter } from 'next/router';
import React from 'react';

interface Props {
    startAdornment?: any | undefined
    endAdornment?: any | undefined
    href?: string | undefined
    onClick?: React.MouseEventHandler<HTMLLIElement> | undefined
    radius?: boolean | undefined
    color?: string | undefined
    activeLink?: boolean | undefined
    maxWidth?: string | number | undefined
    isShadow?: boolean | undefined
}

const ListItem: React.FC<Props> = ({ children, isShadow, activeLink, startAdornment, endAdornment, href, onClick, radius, color, maxWidth }) => {
    let router = useRouter()
    return (
        <>
            <li onClick={href ? () => router.push({ pathname: href }) : onClick} id='list-item'>
                <div id='start-adornment'>
                    {startAdornment}
                    <p className='text'>{children}</p>
                </div>
                {endAdornment}
            </li>
            <style jsx>
                {`#list-item {
                    border-radius: ${radius ? 'var(--radius)' : 0};
                    list-style-type: none;
                    padding: var(--spacing);
                    word-break: break-word;
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    transition: 250ms;
                    z-index: 1;
                    -moz-transition: none;
                    color: ${color || 'var(--secondaryTextColor)'};
                    justify-content: ${endAdornment ? 'space-between' : 'flex-start'};
                    background-color: ${activeLink ? 'rgba(0, 0, 0, 0.12)' : 'transparent'};
                    max-width: ${maxWidth || '100%'};
                    box-shadow: ${isShadow ? 'var(--shadow)' : 'none'}
                }
                #list-item:hover {
                    background-color: rgba(0, 0, 0, 0.06);
                }
                #list-item:active {
                    background-color: rgba(0, 0, 0, 0.12)
                }
                #start-adornment {
                    display: flex;
                    align-items: center;
                    justify-content: flex-start
                }`}
            </style>
        </>

    )
}

export default ListItem;